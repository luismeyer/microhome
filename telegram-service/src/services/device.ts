import {
  FunctionsResponse,
  ServiceRequest,
} from "telegram-home-assistant-types";
import { DB_SERVICE_URL } from "../utils/const";
import { sendGet } from "../utils/http";

export const getDeviceFunctions = async (
  userId: number,
  moduleId: number,
  deviceId: string
): Promise<FunctionsResponse> => {
  const url = `${DB_SERVICE_URL}user/${userId}/module/${moduleId}/devices/${deviceId}/functions`;
  const res = await sendGet(url);

  if (res && res.ok) {
    return res.json();
  }
};

export const getDeviceFunction = async (
  userId: number,
  moduleId: number,
  deviceId: string,
  func: string
): Promise<ServiceRequest> => {
  const url = `${DB_SERVICE_URL}user/${userId}/module/${moduleId}/devices/${deviceId}/functions/${func}`;
  const res = await sendGet(url);

  if (res && res.ok) {
    return res.json();
  }
};
