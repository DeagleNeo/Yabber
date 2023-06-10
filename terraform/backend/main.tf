module "ecs_backend" {
  source = "./modules/ecs_backend"
  container_environment = [
    { name = "LOG_LEVEL",
    value = "DEBUG" },
  ]
}
