import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi";

const ddbClient = new DynamoDBClient({});

export const handler = async (event) => {
  console.log("SendMessage event:", event);

  const domainName = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const callbackUrl = `https://${domainName}/${stage}`;
  const apiGwClient = new ApiGatewayManagementApiClient({ endpoint: callbackUrl });

  const body = JSON.parse(event.body);
  const message = body.message;

  try {
    // Step 1: Get all active connections
    const connectionsData = await ddbClient.send(
      new ScanCommand({
        TableName: process.env.CONNECTIONS_TABLE,
        ProjectionExpression: "connectionId",
      })
    );

    const postCalls = connectionsData.Items.map(async ({ connectionId }) => {
      try {
        await apiGwClient.send(
          new PostToConnectionCommand({
            ConnectionId: connectionId.S,
            Data: JSON.stringify({
              message,
            }),
          })
        );
      } catch (e) {
        console.error(`Failed to send message to ${connectionId.S}:`, e);
      }
    });

    await Promise.all(postCalls);

    return {
      statusCode: 200,
      body: "Message sent to all connections.",
    };
  } catch (err) {
    console.error("Failed to send message:", err);
    return {
      statusCode: 500,
      body: "Failed to send message: " + JSON.stringify(err),
    };
  }
};
