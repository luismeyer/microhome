import { DB_SERVICE_URL } from "../utils/const";
import { sendDelete, sendGet, sendPost, sendPut } from "../utils/http";
import { ModuleResponse, ServiceRequest } from "./typings";

const basePath = "user/";

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

export const createUser = async (userId: number): Promise<boolean> => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}`;
  return sendPut(url)
    .then((res) => res.ok)
    .catch(() => false);
};

export const getUser = async (userId: number): Promise<User> => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}`;
  return sendGet(url).then((res) => res.ok && res.json());
};

export const updateUser = async (
  userId: number,
  language?: string
): Promise<boolean> => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}`;
  return sendPost(url, JSON.stringify({ language }))
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

export const setToken = async (
  userId: number,
  moduleId: number,
  token: string
): Promise<boolean> => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}/module/${moduleId}/token?token=${token}`;

  return sendPost(url).then((res) => res && res.ok);
};
