# Hue Service

## Input und Output

Payload Structure:

```json
{
  "token": "hue refresh api token",
  "deviceId": "hue lampen id",
  "action": "auszuführende aktion",
  "data": "Daten die der command braucht (kann ein atomarer Wert oder weitere JSON Struktur sein)"
}
```

Die Response ist wie folgt strukturiert:

```json
{
  "success": true,
  "result": {
    "name": "Device Name",
    "id": "Device ID",
    "state": {
      "on": "Status als Boolean"
    },
    "color": "blue"
  }
}
```

oder

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

## Commands:

Jeder Command gibt einen neuen Refreshtoken zurück. Aus diesem wird der Accesstoken erneuert, bzw. erneut gelesen.

<b>auth</b>: Gibt die URL als result zurück, über die der Refresh und Accesstoken erzeugt werden kann (data = editToken)

<b>list</b>: Gibt alle LampenId's und den Status (on: true oder false) für den Token zurück

<b>on</b>: Schaltet die Lampe an

<b>off</b>: Schaltet die Lampe aus

<b>color</b>: Ändert die Farbe der Lampe (die Farbe muss als data übergeben werden)

<b>get</b>: Gibt den Status einer einzelnen Lampe zurück
