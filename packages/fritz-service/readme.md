# @telehome/fritz-service

## Setup

The Fritzbox has to have a static IP. This can be configured in MyFRITZ!. The IP can be seen in the menu -> **Internet** -> **Online-Monitor**.

In the System Settings create a new <b>FRITZ!Box-User</b>. The User has to have a _username_ and a _password_. An E-Mail adress is optional.

The minimal rights are:

```text
Zugang aus dem Internet erlauben: true
Smart Home: true
```

## Input and Output

Payload Structure:

```json
{
  "token": "user#password#fritzip",
  "deviceId": "Identifier eines Thermostats",
  "action": "auszuführende Aktion",
  "data": "Daten die für die action gebraucht werden"
}
```

Response;

```json
{
  "success": true,
  "result": "any"
}
```

or

```json
{
  "success": false,
  "error": "Error nachricht"
}
```

Example-Response for List Action:

```json
{
  "success": true,
  "result": [
    {
      "type": "THERMOSTAT",
      "id": "123456",
      "name": "Schlafzimmer",
      "on": true,
      "temperatur": 20, //die gemessene Temperatur mit Offset
      "istTemperatur": 20, //die gemessene Temperatur
      "sollTemperatur": 20 //die Temperatur die erreicht werden soll
    },
    {
      "type": "THERMOSTAT",
      "id": "7891011213",
      "name": "Wohnzimmer",
      "on": false,
      "temperatur": 17,
      "istTemperatur": 17,
      "sollTemperatur": 0 //Solltemperatur = 0 heißt, dass das Thermostat aus ist
    }
  ]
}
```

## Commands:

<b>auth</b>: Returns Auth instruction String

<b>list</b>: Returns all thermostats and the states

<b>on</b>: Sets the thermostat to the default value

<b>off</b>: Turns off the thermostat

<b>temperatur</b>: Sets the thermostat to the input value
