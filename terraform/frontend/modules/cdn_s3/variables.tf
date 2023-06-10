variable "domain_name" {
  description = "domain name (or application name if no domain name available)"
  default = "yabbertech.com"
}
variable "fqdn" {
  description = "fqdn"
  default = "www.yabbertech.com"
}

variable "tags" {
  type        = map(string)
  default     = {
    Name = "yabber"
  }
  description = "tags for all the resources, if any"
}

variable "hosted_zone" {
  default     = "yabbertech.com"
  description = "Route53 hosted zone"
}

variable "acm_certificate_domain" {
  default     = "yabbertech.com"
  description = "Domain of the ACM certificate"
}

variable "price_class" {
  default     = "PriceClass_100" // Only US,Canada,Europe
  description = "CloudFront distribution price class"
}

variable "use_default_domain" {
  default     = false
  description = "Use CloudFront website address without Route53 and ACM certificate"
}

variable "upload_sample_file" {
  default     = false
  description = "Upload sample html file to s3 bucket"
}

variable "cloudfront_min_ttl" {
  default     = 0
  description = "The minimum TTL for the cloudfront cache"
}

variable "cloudfront_default_ttl" {
  default     = 86400
  description = "The default TTL for the cloudfront cache"
}

variable "cloudfront_max_ttl" {
  default     = 31536000
  description = "The maximum TTL for the cloudfront cache"
}

variable "zone_id" {
  default = "Z0513682DQH71HA0A3O4"
}
