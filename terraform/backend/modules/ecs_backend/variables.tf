variable "name" {
  description = "the name of your stack, e.g. \"demo\""
  default = "yabber"
}

variable "environment" {
  description = "the name of your environment, e.g. \"prod\""
  default     = "pro"
}

variable "aws-region" {
  type        = string
  description = "AWS region to launch servers."
  default     = "ap-southeast-2"
}

variable "region" {
  description = "the AWS region in which resources are created, you must set the availability_zones variable as well if you define this value to something other than the default"
  default     = "ap-southeast-2"
}


variable "availability_zones" {
  description = "a comma-separated list of availability zones, defaults to all AZ of the region, if set to something other than the defaults, both private_subnets and public_subnets have to be defined as well"
  default     = ["ap-southeast-2a", "ap-southeast-2b"]
}

variable "cidr" {
  description = "The CIDR block for the VPC."
  default     = "172.16.0.0/16"
}

variable "private_subnets" {
  description = "a list of CIDRs for private subnets in your VPC, must be set if the cidr variable is defined, needs to have as many elements as there are availability zones"
  default     = ["172.16.3.0/24", "172.16.4.0/24"]
}

variable "public_subnets" {
  description = "a list of CIDRs for public subnets in your VPC, must be set if the cidr variable is defined, needs to have as many elements as there are availability zones"
  default     = ["172.16.1.0/24", "172.16.2.0/24"]
}

variable "service_desired_count" {
  description = "Number of tasks running in parallel"
  default     = 1
}

variable "container_port" {
  description = "The port where the Docker is exposed"
  default     = 3000
}

variable "container_cpu" {
  description = "The number of cpu units used by the task"
  default     = 256
}

variable "container_memory" {
  description = "The amount (in MiB) of memory used by the task"
  default     = 512
}

variable "health_check_path" {
  description = "Http path for task health check"
  default     = "/healthcheckupcostsmoney"
}

variable "tsl_certificate_arn" {
  description = "The ARN of the certificate that the ALB uses for https"
  default = "arn:aws:acm:ap-southeast-2:077304981113:certificate/2ca5242b-5fdb-4df2-8386-f0d693211c84"
}

variable "container_environment" {
  
}
variable "container_image" {
    default = "077304981113.dkr.ecr.ap-southeast-2.amazonaws.com/yabber-uat"
  
}