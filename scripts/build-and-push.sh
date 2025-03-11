#!/bin/bash

# Set variables
LOCALSTACK_HOSTNAME=localhost
REGISTRY_PORT=4510
ADMIN_IMAGE="portfolio-admin:latest"
WEBSITE_IMAGE="portfolio-website:latest"

# Create local registry if it doesn't exist
docker run -d \
  --name registry \
  --network portfolio-network \
  -p ${REGISTRY_PORT}:5000 \
  registry:2

# Build images
echo "Building admin panel image..."
docker build -t ${ADMIN_IMAGE} -f Dockerfile.admin .

echo "Building website image..."
docker build -t ${WEBSITE_IMAGE} -f Dockerfile.website .

# Tag images for local registry
docker tag ${ADMIN_IMAGE} ${LOCALSTACK_HOSTNAME}:${REGISTRY_PORT}/${ADMIN_IMAGE}
docker tag ${WEBSITE_IMAGE} ${LOCALSTACK_HOSTNAME}:${REGISTRY_PORT}/${WEBSITE_IMAGE}

# Push images to local registry
echo "Pushing images to local registry..."
docker push ${LOCALSTACK_HOSTNAME}:${REGISTRY_PORT}/${ADMIN_IMAGE}
docker push ${LOCALSTACK_HOSTNAME}:${REGISTRY_PORT}/${WEBSITE_IMAGE}

echo "Images built and pushed successfully!" 
