import { DB_SERVICE_URL } from "../const";
import { ModuleResponse } from "../database";
import { sendDelete, sendGet, sendPost, sendPut } from "../http";
import { ServiceRequest } from "./typings";

const basePath = "user/";

export const createUser = async (userId: number): Promise<boolean> => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}`;
  return sendPost(url)
    .then((res) => res.ok)
    .catch(() => false);
};

export const getUserModules = async (
  userId: number
): Promise<ModuleResponse[]> => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}/module`;
  const res = await sendGet(url);

  if (res && res.ok) {
    return res.json();
  }

  return undefined;
};

export const getUserModule = async (
  userId: number,
  moduleId: number
): Promise<ModuleResponse> => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}/module/${moduleId}`;
  const res = await sendGet(url);

  if (res && res.ok) {
    return res.json();
  }

  return undefined;
};

export const hasModule = (userId: number, moduleId: number) =>
  getUserModule(userId, moduleId)
    .then((res) => Boolean(res))
    .catch(() => false);

export const deactivateModule = (userId: number, moduleId: number) => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}/module/${moduleId}`;
  return sendDelete(url).then((res) => res && res.ok);
};

export const activateModule = async (
  userId: number,
  moduleId: number
): Promise<ServiceRequest> => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}/module/${moduleId}`;
  const res = await sendPut(url);

  if (res && res.ok) {
    return res.json();
  }
};

export const setToken = (
  userId: string,
  moduleId: string,
  token: string
): Promise<boolean> => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}/module/${moduleId}/token?token=${token}`;

  return sendPost(url).then((res) => res && res.ok);
};
