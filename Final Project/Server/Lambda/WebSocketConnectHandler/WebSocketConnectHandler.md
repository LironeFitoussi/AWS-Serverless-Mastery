# Lambda Function: WebSocketConnectHandler

## Purpose
Handles the `$connect` route of the WebSocket API.
- Saves the client's connection ID into DynamoDB ConnectionsTable.
- Ensures the user is connected and ready to send/receive messages.

## Trigger
- API Gateway WebSocket API → `$connect` route.

## Environment Variables
| Key               | Value            |
|-------------------|------------------|
| CONNECTIONS_TABLE | ConnectionsTable |

## Permissions
- The Lambda function must have **DynamoDBFullAccess** (for now) to write into the `ConnectionsTable`.

## DynamoDB Table
- **ConnectionsTable**
  - Partition Key: `connectionId` (String)

## Main Logic
1. Receive the WebSocket `connectionId` from the event.
2. Insert a new item into the `ConnectionsTable` with the `connectionId`.
3. Return success (HTTP 200) or error (HTTP 500).

## Code Summary
- Uses `@aws-sdk/client-dynamodb`.
- Simple `PutItemCommand` to save the connection.
- No user authentication validation at this stage (simple version first).

---
