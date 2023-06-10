terraform {
  backend "s3" {
    bucket   = "yabbertechfrontendstate"
    key      = "state/terraform.tfstate"
    region     = "ap-southeast-2"
    encrypt        = true
    kms_key_id     = "alias/terraform-bucket-frontend"
    dynamodb_table = "terraform-state-frontend"
  }
}