output "id" {
  value = aws_vpc.main.id
}

output "public_subnets" {
  value = aws_subnet.public
}

output "alb" {
  value = aws_security_group.alb.id
}
output "ecs_tasks" {
  value = aws_security_group.ecs_tasks.id
}
output "aws_alb_target_group_arn" {
  value = aws_alb_target_group.main.arn
}

output "aws_ecs_cluster" {
  value = aws_ecs_cluster.main.name
}

output "aws_ecs_service" {
  value = aws_ecs_service.main.name
}
