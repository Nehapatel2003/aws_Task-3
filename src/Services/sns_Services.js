const { sns } = require('../Config/aws_Config');
const { PublishCommand } = require('@aws-sdk/client-sns');
const { v4: uuid } = require('uuid');

const sendNotification = async (req, documentKey) => {

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
};

module.exports = sendNotification;