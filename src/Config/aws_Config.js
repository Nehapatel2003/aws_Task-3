const { S3Client } = require("@aws-sdk/client-s3");
const { SNSClient } = require("@aws-sdk/client-sns");
const { CloudWatchClient } = require("@aws-sdk/client-cloudwatch");
const { CloudWatchLogsClient } = require("@aws-sdk/client-cloudwatch-logs");


const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETKEY
    },
    region: process.env.AWS_REGION
});


const sns = new SNSClient({
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETKEY
    },
    region: process.env.AWS_REGION
});


// For CloudWatch Metrics
const cloudwatch = new CloudWatchClient({
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETKEY
    },
    region: process.env.AWS_REGION
});


// For CloudWatch Logs
const cloudwatchLogs = new CloudWatchLogsClient({
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETKEY
    },
    region: process.env.AWS_REGION
});


module.exports = {
    s3,
    sns,
    cloudwatch,
    cloudwatchLogs
};