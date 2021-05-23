# FRITZ! Service

## Vorbereitung

Die Fritzbox muss mittels MyFRITZ! eine feste Adresse nach außen bekommen. Somit ist sie jederzeit unter der gleichen
Adresse erreichbar. Die MyFRITZ! Adresse kann unter dem Menü **Internet**, **Online-Monitor** eingesehen werden.

Unter <b>System</b> kann ein neuer <b>FRITZ!Box-Benutzer</b> angelegt werden. Der Nutzer muss mit
_Benutzernamen_ und _Kennwort_ ausgestattet werden. Eine E-Mail Adresse ist optional. Die minimalen Rechte sind dabei:

```text
Zugang aus dem Internet erlauben: true
Smart Home: true
```

## Input und Output

Payload Structure:

```json
{
  "token": "user#password#fritzip",
  "deviceId": "Identifier eines Thermostats",
  "action": "auszuführende Aktion",
  "data": "Daten die für die action gebraucht werden"
}
```

Die Response ist wie folgt strukturiert:

```json
{
  "success": true,
  "result": "any"
}
```

oder

```json
{
  "success": false,
  "error": "Error nachricht"
}
```

Beispiel-Response für List-Action:

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

<b>auth</b>: Gibt einen String zurück, der anzeigt wie der Fritz-Service einzubinden ist.

<b>list</b>: Gibt alle Thermostate und den Status zurück

<b>on</b>: Schaltet das Thermostat auf die voreingestellte Solltemperatur/Komforttemperatur

<b>off</b>: Schaltet das Thermostat aus

<b>temperatur</b>: Setzt das Thermostat auf eine gewünschte Temperatur
