#!/bin/bash

# Create a docker network if it doesn't exist
docker network create portfolio-network 2>/dev/null || true

# Stop any existing LocalStack container
docker stop localstack 2>/dev/null || true
docker rm localstack 2>/dev/null || true

# Start LocalStack with required services
docker run -d \
  --name localstack \
  --network portfolio-network \
  -p 4566:4566 \
  -p 4571:4571 \
  -e "SERVICES=s3,rds,ecs,cloudfront,route53,ec2,iam,elasticloadbalancingv2" \
  -e "DEFAULT_REGION=us-east-1" \
  -e "DOCKER_HOST=unix:///var/run/docker.sock" \
  -e "AWS_ACCESS_KEY_ID=test" \
  -e "AWS_SECRET_ACCESS_KEY=test" \
  -e "DEBUG=1" \
  -e "PERSISTENCE=1" \
  -v "/var/run/docker.sock:/var/run/docker.sock" \
  -v "${PWD}/localstack:/var/lib/localstack" \
  localstack/localstack:latest

# Wait for LocalStack to be ready
echo "Waiting for LocalStack to be ready..."
while ! curl -s http://localhost:4566/_localstack/health | grep -q '"s3":"running"'; do
  sleep 2
done

echo "LocalStack is ready!"

# Initialize AWS resources
echo "Initializing AWS resources..."
aws --endpoint-url=http://localhost:4566 s3 mb s3://portfolio-media-storage || true

# Create VPC and other network resources
echo "Creating VPC and network resources..."
aws --endpoint-url=http://localhost:4566 ec2 create-vpc --cidr-block 10.0.0.0/16 || true

echo "Setup complete!" 
