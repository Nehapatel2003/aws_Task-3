const { v4: uuidv4 } = require("uuid");
const sendLog = require("../Utils/logger");
const cloudWatchCustomMetrics = require("../Utils/metrics");

const loggingMiddleware = (req, res, next) => {
const requestId = uuidv4();
const startTime = Date.now();
req.requestId = requestId;

    res.on("finish", async () => {
        const duration = Date.now() - startTime;
        const level = res.statusCode >= 400 ? "ERROR": "INFO";
        await sendLog({
        level: level,
        message: "Request completed",
        requestId: requestId,
        userId: req.user?.id,
        route: req.originalUrl,
        statusCode: res.statusCode,
        duration: duration
});

         // Custom Metrics
        await cloudWatchCustomMetrics("RequestCount", 1,"Count");

        await cloudWatchCustomMetrics("RequestLatency", duration,"Milliseconds");

        if (res.statusCode >= 500) {
            await cloudWatchCustomMetrics("5xxErrorCount", 1,"Count");
        }
    });

    next();
};

module.exports = loggingMiddleware;