# Lambda Function: WebSocketDisconnectHandler

## Purpose
Handles the `$disconnect` route of the WebSocket API.
- When a user disconnects, it deletes their `connectionId` from the `ConnectionsTable`.

## Trigger
- API Gateway WebSocket API → `$disconnect` route.

## Environment Variables
| Key               | Value            |
|-------------------|------------------|
| CONNECTIONS_TABLE | ConnectionsTable |

## Permissions
- Lambda function must have **DynamoDBFullAccess** to delete from `ConnectionsTable`.

## DynamoDB Table
- **ConnectionsTable**
  - Partition Key: `connectionId` (String)

## Main Logic
1. Receive the WebSocket `connectionId` from the event.
2. Delete the item from the `ConnectionsTable`.
3. Return success (HTTP 200) or error (HTTP 500).

---
