variable "aws_region" {
    type = string
    description = "the actual region of the account"
    default = "sa-east-1"
}

variable "s3_bucket_name" {
    type = string
    default = "audioscript-s3-bucket"
}

variable "user_name" {
    type = string
    default = "audioscript-iam-user"
}
