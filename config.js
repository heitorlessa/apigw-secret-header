module.exports = {
    ssm_parameter: "/demo/hmac-shared-secret" || process.env.SSM_PARAMETER,
    aws_region: "us-east-1" || process.env.AWS_REGION
}