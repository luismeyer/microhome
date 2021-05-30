export type Module = {
  id: number;
  name: string;
  baseAction: string;
  serviceUrl: string;
  functions: string[];
};

export type ModuleInput = Module & {
  token?: string;
};

export type User<S = unknown> = {
  id: string;
  telegramId: number;
  modules: ModuleInput[];
  language: string;
  state?: S;
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
  token?: string;
  action?: string;
  deviceId?: string;
  data?: string;
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

export type CallbackData = {
  action: number;
  id?: string;
  data?: string;
};
