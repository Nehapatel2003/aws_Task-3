const { sns } = require('../Config/aws_Config');
const { PublishCommand } = require('@aws-sdk/client-sns');
const { v4: uuid } = require('uuid');
const cloudWatchCustomMetrics = require('../Utils/metrics');

const sendNotification = async (req, documentKey) => {
    try{
        const msg = {
        eventType: "DOCUMENT_UPLOADED",
        eventId: uuid(),
        userId: req.user.id,
        objectKey: documentKey,
        bucket: process.env.AWS_S3_BUCKET,
        fileName: req.file.originalname,
        timestamp: new Date().toISOString()
          };
    await sns.send(
        new PublishCommand({
            TopicArn: process.env.SNS_TOPIC_ARN,
            Subject: "Document Uploaded",
            Message: JSON.stringify(msg)
        })
    );
    }catch{
        cloudWatchCustomMetrics("SNSPublishFailureCount",1,"Count")
    }
    
};

module.exports = sendNotification;