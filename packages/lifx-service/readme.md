# Lifx Service

## Input und Output

Payload Structure:

```json
{
  "token": "lifx api token",
  "deviceId": "lifx lampen id",
  "action": "auszuführende aktion",
  "data": "Daten die der command braucht (kann ein atomarer Wert oder weitere JSON Struktur sein)"
}
```

Die Response ist wie folgt strukturiert:

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
  "error": "Error nachricht",
  "version": "string"
}
```

## Commands:

<b>auth</b>: Gibt die Token URL als result zurück

<b>list</b>: Gibt alle LampenId's und den Status (on: true oder false) für den Token zurück

<b>on</b>: Schaltet die Lampe an

<b>off</b>: Schaltet die Lampe aus

<b>color</b>: Ändert die Farbe der Lampe (die Farbe muss als data übergeben werden)
