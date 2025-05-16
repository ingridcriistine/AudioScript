provider "aws" {
    region = var.aws_region
}

resource "aws_iam_policy" "s3_bucket_crud_policy" {
  name        = "${var.s3_bucket_name}-crud-policy"
  description = "Allow full CRUD access to the ${var.s3_bucket_name} bucket"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket",
          "s3:GetBucketLocation",
          "s3:ListBucketMultipartUploads",
          "s3:AbortMultipartUpload",
          "s3:PutObjectAcl"
        ],
        Resource = [
          "arn:aws:s3:::${var.s3_bucket_name}",
          "arn:aws:s3:::${var.s3_bucket_name}/*"
        ]
      }
    ]
  })
}


resource "aws_iam_user_policy_attachment" "attach_s3_policy" {
  user = var.user_name
  policy_arn = aws_iam_policy.s3_bucket_crud_policy.arn
}