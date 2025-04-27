export const handler = async (event, context) => {
    // Event Object
    console.log("Event Object", JSON.stringify(event));
    
    console.log("Event Sourse", event.source);
    console.log("Event Region", event.region);
    
    // Context Object
    console.log("Lambda Request ID", context.awsRequestId);
    console.log("Lambda function ARN", context.functionArn);
    console.log("Lambda function ARN", context.invokedFunctionArn);
    console.log("Lambda Memory Limit", context.memoryLimitInMB);
    console.log("Lambda Log Stream Name", context.logStreamName);
    console.log("Lambda Log Group Name", context.logGroupName);

    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
  };
  
