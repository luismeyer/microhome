import { Array, Null, Number, Record, String, Undefined } from "runtypes";

export const ModuleObject = Record({
  id: Number,
  name: String,
  baseAction: String,
  serviceUrl: String,
  functions: Array(String),
  token: String.Or(Undefined).Or(Null),
});

export type Module = {
  id: number;
  name: string;
  baseAction: string;
  serviceUrl: string;
  functions: string[];
  token?: string;
};

export type ModuleResponse = {
  id: number;
  name: string;
  serviceRequest: ServiceRequest;
};

export type ServiceRequest = {
  serviceUrl: string;
  serviceBody?: {
    token: string;
    deviceId: string;
    action: string;
    data?: string;
  };
};

export type FunctionsResponse = {
  functions: string[];
  serviceRequest: ServiceRequest;
};
