# Lambda Function: WebSocketSendMessageHandler

## Purpose
Handles the `sendMessage` route of the WebSocket API.
- When a user sends a message, this function broadcasts it to all connected clients.

## Trigger
- API Gateway WebSocket API → `sendMessage` route.

## Environment Variables
| Key               | Value            |
|-------------------|------------------|
| CONNECTIONS_TABLE | ConnectionsTable |

## Permissions
- Lambda function must have **DynamoDBFullAccess**.
- Needs permission to call **ApiGatewayManagementApi** to send messages (allowed by default if in WebSocket context).

## DynamoDB Table
- **ConnectionsTable**
  - Partition Key: `connectionId` (String)

## Main Logic
1. Parse the incoming message from the event body.
2. Query DynamoDB to get all active `connectionId`s.
3. Use `ApiGatewayManagementApi` to send the message to each connected client.
4. Return success (HTTP 200) or error (HTTP 500).

---
