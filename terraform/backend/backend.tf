terraform {
  backend "s3" {
    bucket   = "yabbertechbackendstate"
    key      = "terraform-state-backend"
    region     = "ap-southeast-2"
    encrypt        = true
    kms_key_id     = "alias/terraform-bucket-key-backend"
    dynamodb_table = "terraform-state-backend"
  }
}