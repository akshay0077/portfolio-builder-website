terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  access_key                  = "test"
  secret_key                  = "test"
  region                      = "us-east-1"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  # LocalStack settings
  endpoints {
    s3                       = "http://localhost:4566"
    rds                      = "http://localhost:4566"
    ecs                      = "http://localhost:4566"
    cloudfront               = "http://localhost:4566"
    route53                  = "http://localhost:4566"
    elasticloadbalancingv2   = "http://localhost:4566"
    iam                      = "http://localhost:4566"
    ec2                      = "http://localhost:4566"
  }

  # Force S3 to use path-style addressing
  s3_use_path_style = true
}

# VPC Configuration
resource "aws_vpc" "portfolio_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "portfolio-vpc"
  }
}

# RDS Instance for Multi-tenant Database
resource "aws_db_instance" "portfolio_db" {
  identifier           = "portfolio-db"
  allocated_storage    = 20
  storage_type        = "gp2"
  engine              = "postgres"
  engine_version      = "13.7"
  instance_class      = "db.t3.micro"
  username            = "portfolio_admin"
  password            = "your_password_here"
  skip_final_snapshot = true

  tags = {
    Name = "portfolio-database"
  }
}

# S3 Bucket for Media Storage
resource "aws_s3_bucket" "media_storage" {
  bucket = "portfolio-media-storage"
}

resource "aws_s3_bucket_public_access_block" "media_storage_public_access" {
  bucket = aws_s3_bucket.media_storage.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ECS Cluster
resource "aws_ecs_cluster" "portfolio_cluster" {
  name = "portfolio-cluster"
}

# ALB for Admin Panels
resource "aws_lb" "admin_alb" {
  name               = "portfolio-admin-alb"
  internal           = false
  load_balancer_type = "application"
  subnets           = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
  security_groups    = [aws_security_group.alb_sg.id]
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "portfolio_cdn" {
  enabled = true

  origin {
    domain_name = aws_s3_bucket.media_storage.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.media_storage.bucket}"
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.media_storage.bucket}"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Security Group for ALB
resource "aws_security_group" "alb_sg" {
  name        = "portfolio-alb-sg"
  description = "Security group for admin panel ALB"
  vpc_id      = aws_vpc.portfolio_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Subnets
resource "aws_subnet" "public_subnet_1" {
  vpc_id     = aws_vpc.portfolio_vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "portfolio-public-subnet-1"
  }
}

resource "aws_subnet" "public_subnet_2" {
  vpc_id     = aws_vpc.portfolio_vpc.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "us-east-1b"

  tags = {
    Name = "portfolio-public-subnet-2"
  }
} 
