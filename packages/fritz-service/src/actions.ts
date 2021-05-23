import {
  LambdaBody,
  Thermostat,
  ApiThermostat,
  ThermostatResponse,
  ErrorResponse,
  ThermostatsResponse,
  AuthResponse,
  TokenInput,
} from "./typings";

import { Fritz } from "fritzapi";

const parseToken = (body: LambdaBody): ErrorResponse | TokenInput => {
  if (!body.token) {
    return createErrorResponse("Kein token");
  }

  let buff = Buffer.from(body.token, "base64");
  let token = buff.toString("ascii");

  const [user, password, fritzIp] = token.split("#");

  if (!user) {
    return createErrorResponse("Kein User");
  }
  if (!password) {
    return createErrorResponse("Kein Passwort");
  }
  if (!fritzIp) {
    return createErrorResponse("Keine externe FritzBox IP");
  }

  return {
    success: true,
    user,
    password,
    fritzIp,
  };
};

export const handleListAction = async (
  body: LambdaBody
): Promise<ThermostatsResponse | ErrorResponse> => {
  const token = parseToken(body);
  if (!token.success) {
    return token;
  }

  const f = new Fritz(token.user, token.password, token.fritzIp);
  const result = await f
    .getThermostatList()
    .then((res: Array<string>) =>
      Promise.all(res.map((id: string) => f.getDevice(id)))
    )
    .catch(() => createErrorResponse("Fehler beim Abrufen der Daten"));

  if (result.success) {
    return result;
  }

  return {
    success: true,
    result: result.map(formatThermostat),
  };
};

export const handleTemperaturAction = async (
  body: LambdaBody
): Promise<ThermostatResponse | ErrorResponse> => {
  const token = parseToken(body);
  if (!token.success) {
    return token;
  }

  if (!body.deviceId) {
    return createErrorResponse("Kein Thermostat-Identifier");
  }

  if (!body.data) {
    return createErrorResponse("Keine Temperatur");
  }

  const f = new Fritz(token.user, token.password, token.fritzIp);
  const result = await f
    .setTempTarget(body.deviceId, body.data)
    .catch(() => createErrorResponse("Fehler beim Abrufen der Daten"));

  if (!result.success) {
    return result;
  }

  return {
    success: true,
    result: result,
  };
};

export const handleSwitchAction = async (
  body: LambdaBody
): Promise<ThermostatResponse | ErrorResponse> => {
  const token = parseToken(body);
  if (!token.success) {
    return token;
  }

  if (!body.deviceId) {
    return createErrorResponse("Kein Thermostat-Identifier");
  }

  const f = new Fritz(token.user, token.password, token.fritzIp);
  const targetTemp =
    body.action === "on"
      ? await f
          .getTempComfort(body.deviceId)
          .catch(() => createErrorResponse("Fehler beim Abrufen der Daten"))
      : "off";

  const result = await f
    .setTempTarget(body.deviceId, targetTemp)
    .catch(() => createErrorResponse("Fehler beim Abrufen der Daten"));

  if (result.success === false) {
    return result;
  }

  return {
    success: true,
    result: result,
  };
};

export const handleGetAction = async (
  body: LambdaBody
): Promise<ThermostatResponse | ErrorResponse> => {
  const token = parseToken(body);
  if (!token.success) {
    return token;
  }

  if (!body.deviceId) {
    return createErrorResponse("Kein Thermostat-Identifier");
  }

  const f = new Fritz(token.user, token.password, token.fritzIp);
  const result = await f
    .getDevice(body.deviceId)
    .then(formatThermostat)
    .catch(() => createErrorResponse("Fehler beim Abrufen der Daten"));

  if (result.success === false) {
    return result;
  }

  return {
    success: true,
    result: result,
  };
};

export const handleAuthAction = (): AuthResponse => ({
  success: true,
  result:
    "Bitte melde dich für den Fritz service an:" +
    "\n" +
    "\nLege dazu einen Benutzer mit Passwort und Benutzernamen an und lege eine externe FRITZ Adresse an." +
    "\nDer Nutzer braucht Zugang aus dem Internet und Smart Home Berechtigungen." +
    "\nBestätige anschließend deine Eingaben mit diesem Command /fritz <username#password#fritzip>",
});

const formatTemperatur = (celsius: number, offset: number): number => {
  const temp = celsius - offset;
  const conv = temp.toString();
  const string = conv.slice(0, conv.length - 1) + "." + conv[conv.length - 1];
  return parseFloat(string);
};

const formatThermostat = (thermostat: ApiThermostat): Thermostat => {
  const sollTemperatur =
    thermostat.hkr.tsoll == 253 ? 0 : thermostat.hkr.tsoll / 2;
  const istTemperatur = thermostat.hkr.tist / 2;
  const status = thermostat.hkr.tsoll == 253 ? false : true;
  const temperatur = formatTemperatur(
    thermostat.temperature.celsius,
    thermostat.temperature.offset
  );
  return {
    type: "THERMOSTAT",
    id: thermostat.identifier,
    name: thermostat.name,
    on: status,
    temperatur: temperatur,
    istTemperatur: istTemperatur,
    sollTemperatur: sollTemperatur,
  };
};

const createErrorResponse = (error: string): ErrorResponse => ({
  success: false,
  error: error,
});
