import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({});

export const handler = async (event) => {
  console.log("Connect event:", event);

  const connectionId = event.requestContext.connectionId;

  const params = {
    TableName: process.env.CONNECTIONS_TABLE,
    Item: {
      connectionId: { S: connectionId },
      // We can add user info later after validating Firebase
    },
  };

  try {
    await ddbClient.send(new PutItemCommand(params));
    return {
      statusCode: 200,
      body: "Connected.",
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: "Failed to connect: " + JSON.stringify(err),
    };
  }
};
