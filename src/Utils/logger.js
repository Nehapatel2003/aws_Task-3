const { PutLogEventsCommand } = require("@aws-sdk/client-cloudwatch-logs");
const { cloudwatchLogs } = require("../Config/aws_Config");

const sendLog = async (logData) => {
    const startTime = Date.now();
    const duration = Date.now() - startTime;
    const logMessage = {
        timestamp: new Date().toISOString(),
        level: logData.level || "INFO",
        message: logData.message,
        requestId: logData.requestId || null,
        userId: logData.userId || null,
        route: logData.route || null,
        statusCode: logData.statusCode || null,
        duration: duration || null
    };

    // console.log(logMessage);

    await cloudwatchLogs.send(
        new PutLogEventsCommand({
            logGroupName: process.env.CLOUDWATCH_LOG_GROUP,
            logStreamName: process.env.CLOUDWATCH_LOG_STREAM,
            logEvents: [
                {
                    message: JSON.stringify(logMessage),
                    timestamp: Date.now()
                }
            ]
        })
    );

    return logMessage;
};

module.exports = sendLog;