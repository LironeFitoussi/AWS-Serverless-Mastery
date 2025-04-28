# API Gateway: SimpleChatWebSocketAPI

## Purpose
Handles the real-time communication for the chat app using WebSocket.

## Routes
| Route Key    | Connected Lambda                  |
|--------------|------------------------------------|
| $connect     | WebSocketConnectHandler            |
| $disconnect  | WebSocketDisconnectHandler         |
| sendMessage  | WebSocketSendMessageHandler        |

## Route Selection Expression
- `$request.body.action`

## Stage
| Stage Name | Auto Deploy | URL |
|------------|-------------|-----|
| dev        | Yes         | wss://f664cj5m67.execute-api.us-east-1.amazonaws.com/dev/ |

## Permissions
- API Gateway is allowed to invoke the attached Lambda functions.

## Notes
- All clients must send WebSocket messages with a JSON body like:
```json
{
  "action": "sendMessage",
  "message": "Hello world"
}
