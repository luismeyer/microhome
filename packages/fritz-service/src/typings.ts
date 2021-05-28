export type ApiThermostat = {
  identifier: string;
  name: string;
  hkr: {
    tist: number;
    tsoll: number;
  };
  temperature: {
    celsius: number;
    offset: number;
  };
};

export type Thermostat = {
  type: "THERMOSTAT";
  id: string;
  name: string;
  on: boolean;
  temperatur: number;
  istTemperatur: number;
  sollTemperatur: number;
};

export type LambdaEvent = {
  body?: string;
};

export type LambdaBody = {
  token?: string;
  deviceId?: string;
  action?: "on" | "off" | "list" | "temperatur" | "get" | "auth";
  data?: any;
};

export type TokenInput = {
  success: true;
  user: string;
  password: string;
  fritzIp: string;
};

export type Maybe<T> = T | void;

export type SuccessResponse = {
  success: true;
};

export type FailResponse = {
  success: false;
};

export type ErrorResponse = FailResponse & {
  error: string;
};

export type ThermostatResponse = SuccessResponse & {
  result: Thermostat;
};

export type ThermostatsResponse = SuccessResponse & {
  result: Array<Thermostat>;
};

export type AuthResponse = SuccessResponse & {
  result: string;
};
