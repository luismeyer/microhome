export type Module = {
  id: number;
  name: string;
  baseAction: string;
  serviceUrl: string;
  functions: string[];
  token?: string;
};

export type User = {
  id: string;
  telegramId: number;
  modules: Module[];
  language: string;
};

export type Device = {
  id: string;
  on: boolean;
  name: string;
  type: "LAMP" | "THERMOSTAT";

  // Lamp Attributes
  color: string;

  // Thermostat Attributes
  temperatur: number;
  istTemperatur: number;
  sollTemperatur: number;
};

export type ServiceResponse<T> = {
  success: boolean;
  version?: string;
  error: string;
  result: T;
};

export type AuthResponse = ServiceResponse<string>;

export type DeviceListResponse = ServiceResponse<Device[]>;

export type SimpleResponse = ServiceResponse<undefined>;

export type DeviceResponse = ServiceResponse<Device>;

export type SericeRequestBody = {
  token: string;
  deviceId: String;
  action: string;
  data: string;
};

export type ServiceRequest = {
  serviceUrl: string;
  body: SericeRequestBody;
};

export type FunctionsResponse = {
  functions: string[];
  serviceRequest: ServiceRequest;
};

export type ModuleResponse = {
  name: string;
  id: number;
  serviceRequest: ServiceRequest;
};

export type Command = () => {
  command: string;
  description: string;
};

export type CallbackData = {
  action: number;
  id?: string;
  data?: string;
};
