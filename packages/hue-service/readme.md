# Hue Service

## Input and Output

Payload Structure:

```json
{
  "token": "hue refresh api token",
  "deviceId": "hue lamp id",
  "action": "action",
  "data": "action data"
}
```

Response:

```json
{
  "success": true,
  "result": {
    "name": "Device Name",
    "id": "Device ID",
    "state": {
      "on": "Boolean"
    },
    "color": "blue"
  }
}
```

or

```json
{
  "success": true,
  "result": true
}
```

oder

```json
{
  "success": false,
  "error": "Error nachricht"
}
```

## Commands

Every Command returns a refresh-token. The refresh token is needed to regenerate a new acdess-token.

<b>auth</b>: Return URL to generate an access-token

<b>list</b>: Returns all lamps

<b>on</b>: Turns on lamp

<b>off</b>: Turns off lamp

<b>color</b>: Changes lamp to input color

<b>get</b>: Return state of lamp
