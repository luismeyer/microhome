import { Device } from "../devices";

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
