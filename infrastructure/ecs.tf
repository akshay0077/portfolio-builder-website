resource "aws_ecs_task_definition" "payload_cms" {
  family                   = "payload-cms"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512

  container_definitions = jsonencode([
    {
      name  = "payload-cms"
      image = "your-payload-cms-image:latest"

      environment = [
        {
          name  = "PAYLOAD_SECRET",
          value = "your-secret-here"
        },
        {
          name  = "POSTGRES_URI",
          value = "postgresql://${aws_db_instance.portfolio_db.username}:${aws_db_instance.portfolio_db.password}@${aws_db_instance.portfolio_db.endpoint}/${aws_db_instance.portfolio_db.db_name}"
        },
        {
          name  = "S3_BUCKET",
          value = aws_s3_bucket.media_storage.bucket
        },
        {
          name  = "S3_REGION",
          value = "us-east-1"
        }
      ]

      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/payload-cms"
          "awslogs-region"        = "us-east-1"
          "awslogs-stream-prefix" = "payload"
        }
      }
    }
  ])
}

# ECS Service
resource "aws_ecs_service" "payload_cms" {
  name            = "payload-cms"
  cluster         = aws_ecs_cluster.portfolio_cluster.id
  task_definition = aws_ecs_task_definition.payload_cms.arn
  desired_count   = 1
  launch_type     = "FARGATE"



  network_configuration {
    subnets         = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
    security_groups = [aws_security_group.ecs_tasks.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.payload_cms.arn
    container_name   = "payload-cms"
    container_port   = 3000
  }
}

# ALB Target Group
resource "aws_lb_target_group" "payload_cms" {
  name        = "payload-cms-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.portfolio_vpc.id
  target_type = "ip"

  health_check {
    path                = "/api/healthz"
    healthy_threshold   = 2
    unhealthy_threshold = 10
  }
}

# Security Group for ECS Tasks
resource "aws_security_group" "ecs_tasks" {
  name        = "payload-cms-ecs-tasks"
  description = "Allow inbound traffic from ALB"
  vpc_id      = aws_vpc.portfolio_vpc.id

  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Admin Panel Task Definition
resource "aws_ecs_task_definition" "admin" {
  family                   = "portfolio-admin"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512

  container_definitions = jsonencode([
    {
      name  = "portfolio-admin"
      image = "localhost:4510/portfolio-admin:latest"

      environment = [
        {
          name  = "PAYLOAD_SECRET",
          value = "your-secret-here"
        },
        {
          name  = "POSTGRES_URI",
          value = "postgresql://${aws_db_instance.portfolio_db.username}:${aws_db_instance.portfolio_db.password}@${aws_db_instance.portfolio_db.endpoint}/${aws_db_instance.portfolio_db.db_name}"
        },
        {
          name  = "S3_BUCKET",
          value = aws_s3_bucket.media_storage.bucket
        }
      ]

      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/portfolio-admin"
          "awslogs-region"        = "us-east-1"
          "awslogs-stream-prefix" = "admin"
        }
      }
    }
  ])
}

# Website Task Definition
resource "aws_ecs_task_definition" "website" {
  family                   = "portfolio-website"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512

  container_definitions = jsonencode([
    {
      name  = "portfolio-website"
      image = "localhost:4510/portfolio-website:latest"

      environment = [
        {
          name  = "NEXT_PUBLIC_API_URL",
          value = "http://admin.localhost:4566"
        }
      ]

      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/portfolio-website"
          "awslogs-region"        = "us-east-1"
          "awslogs-stream-prefix" = "website"
        }
      }
    }
  ])
}

# Admin Service
resource "aws_ecs_service" "admin" {
  name            = "portfolio-admin"
  cluster         = aws_ecs_cluster.portfolio_cluster.id
  task_definition = aws_ecs_task_definition.admin.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
    security_groups = [aws_security_group.ecs_tasks.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.admin.arn
    container_name   = "portfolio-admin"
    container_port   = 3000
  }
}

# Website Service
resource "aws_ecs_service" "website" {
  name            = "portfolio-website"
  cluster         = aws_ecs_cluster.portfolio_cluster.id
  task_definition = aws_ecs_task_definition.website.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
    security_groups = [aws_security_group.ecs_tasks.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.website.arn
    container_name   = "portfolio-website"
    container_port   = 3000
  }
}

# Target Groups
resource "aws_lb_target_group" "admin" {
  name        = "portfolio-admin-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.portfolio_vpc.id
  target_type = "ip"

  health_check {
    path                = "/admin"
    healthy_threshold   = 2
    unhealthy_threshold = 10
  }
}

resource "aws_lb_target_group" "website" {
  name        = "portfolio-website-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.portfolio_vpc.id
  target_type = "ip"

  health_check {
    path                = "/"
    healthy_threshold   = 2
    unhealthy_threshold = 10
  }
}

# ALB Listener Rules
resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.admin_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.website.arn
  }
}

resource "aws_lb_listener_rule" "admin" {
  listener_arn = aws_lb_listener.front_end.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.admin.arn
  }

  condition {
    host_header {
      values = ["admin.*"]
    }
  }
} 
