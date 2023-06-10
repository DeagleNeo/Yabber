output "AWS_ECS_CLUSTER" {
  value = module.ecs_backend.aws_ecs_cluster
}
output "AWS_ECS_SERVICE" {
  value = module.ecs_backend.aws_ecs_service
}