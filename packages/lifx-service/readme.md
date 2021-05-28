# Lifx Service

## Input und Output

Payload Structure:

```json
{
  "token": "lifx api token",
  "deviceId": "lifx lamp id",
  "action": "action",
  "data": "actiondata"
}
```

Response:

```json
{
  "success": true,
  "result": "any",
  "version": "string"
}
```

oder

```json
{
  "success": false,
  "error": "Error",
  "version": "string"
}
```

## Commands:

<b>auth</b>: Return token url

<b>list</b>: Return all lamps

<b>on</b>: Turns on lamp

<b>off</b>: Turns off lamp

<b>color</b>: Changes lamp to input color
