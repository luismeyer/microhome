import { LambdaBody } from "./handler";

export type Maybe<T> = T | undefined;

type ValidBody = LambdaBody & {
  token: string;
  deviceId: string;
};

export type ErrorValidation = {
  valid: false;
  body: ErrorResult;
};

export type SuccessValidation = {
  valid: true;
  body: ValidBody;
};

export type ErrorResult = {
  success: false;
  error: string;
};

export type SuccessResult<T> = {
  success: true;
  result: T;
};

export type ApiLamp = {
  color: {
    hue: number;
    saturation: number;
  };
  brightness: number;
  connected: boolean;
  id: string;
  power: "on" | "off";
  label: string;
  status?: boolean;
};

export type Lamp = {
  type: "LAMP";
  id: string;
  on: boolean;
  name: string;
  color: string;
};

export type SetLampParams = {
  token: string;
  lampId: string;
  on: boolean;
  color?: string;
};
