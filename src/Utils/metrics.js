const { PutMetricDataCommand } = require("@aws-sdk/client-cloudwatch");
const {cloudwatch} = require("../Config/aws_Config");

const cloudWatchCustomMetrics = async (metricName, value = 1,unit) => {
  try {
    const result = await cloudwatch.send(
      new PutMetricDataCommand({
        Namespace: "aws-task3",
        MetricData: [
          {
            MetricName: metricName,
            Value: value,
            Unit: unit,
          },
        ],
      }),
    );

    // console.log(`Metric sent successfully: ${metricName}`);

    return result;
  } catch (error) {
    // console.log(`CloudWatch metric failed: ${metricName}`);
    console.log(error.message);

    throw error;
  }
};

module.exports = cloudWatchCustomMetrics;