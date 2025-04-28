import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({});

export const handler = async (event) => {
  console.log("Disconnect event:", event);

  const connectionId = event.requestContext.connectionId;

  const params = {
    TableName: process.env.CONNECTIONS_TABLE,
    Key: {
      connectionId: { S: connectionId },
    },
  };

  try {
    await ddbClient.send(new DeleteItemCommand(params));
    return {
      statusCode: 200,
      body: "Disconnected.",
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Failed to disconnect: " + JSON.stringify(err),
    };
  }
};
