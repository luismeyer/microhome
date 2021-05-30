export type ModuleFunction = {
  name: string;
  requiresInput: boolean;
};

export type Module = {
  id: number;
  name: string;
  serviceUrl: string;
  baseFunction: ModuleFunction;
  functions: ModuleFunction[];
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
  functions: ModuleFunction[];
  serviceRequest: ServiceRequest;
};

export type ModuleResponse = {
  name: string;
  id: number;
  serviceRequest: ServiceRequest;
};

export type SelectDeviceCallBackDataDetails = {
  id: string;
  action: "SELECT_DEVICE";
  deviceId?: string;
  moduleId?: number;
};

export type ActionDeviceCallBackDataDetails = {
  id: string;
  action: "ACTION_DEVICE";
  deviceId?: string;
  moduleId?: number;
  data?: ModuleFunction;
};

export type ActivateModuleCallBackDataDetails = {
  id: string;
  action: "ACTIVATE_MODULE";
  deviceId?: string;
  moduleId?: number;
};

export type DeactivateModuleCallBackDataDetails = {
  id: string;
  action: "DEACTIVATE_MODULE";
  deviceId?: string;
  moduleId?: number;
};

export type SetLanguageModuleCallBackDataDetails = {
  id: string;
  action: "SET_LANGUAGE";
  deviceId?: string;
  moduleId?: number;
  data?: string;
};

export type CallBackDataDetails =
  | SelectDeviceCallBackDataDetails
  | ActionDeviceCallBackDataDetails
  | ActivateModuleCallBackDataDetails
  | DeactivateModuleCallBackDataDetails
  | SelectDeviceCallBackDataDetails
  | SetLanguageModuleCallBackDataDetails;
