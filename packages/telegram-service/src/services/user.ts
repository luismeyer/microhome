import { ModuleResponse, ServiceRequest, User } from "@microhome/types";
import { DB_SERVICE_URL } from "../utils/const";
import { sendDelete, sendGet, sendPost, sendPut } from "../utils/http";

const basePath = "user";

export const createUser = async (userId: number): Promise<boolean> => {
  const url = `${DB_SERVICE_URL}/${basePath}/${userId}`;
  return sendPut(url)
    .then((res) => res.ok)
    .catch(() => false);
};

export const getUser = async <S>(userId: number): Promise<User<S>> => {
  const url = `${DB_SERVICE_URL}/${basePath}/${userId}`;
  return sendGet(url).then((res) => res.ok && res.json());
};

type UpdateUserInput = {
  language?: string;
  state?: unknown;
};

export const updateUser = async (
  userId: number,
  input: UpdateUserInput
): Promise<boolean> => {
  const url = `${DB_SERVICE_URL}/${basePath}/${userId}`;
  return sendPost(url, JSON.stringify(input))
    .then(async (res) => res.ok)
    .catch(() => false);
};

export const getUserModules = async (
  userId: number
): Promise<ModuleResponse[] | undefined> => {
  const url = `${DB_SERVICE_URL}/${basePath}/${userId}/module`;
  const res = await sendGet(url);

  if (res && res.ok) {
    return res.json();
  }

  return;
};

export const getUserModule = async (
  userId: number,
  moduleId: number
): Promise<ModuleResponse | undefined> => {
  const url = `${DB_SERVICE_URL}/${basePath}/${userId}/module/${moduleId}`;
  const res = await sendGet(url);

  if (res && res.ok) {
    return res.json();
  }

  return;
};

export const hasModule = (userId: number, moduleId: number) =>
  getUserModule(userId, moduleId)
    .then((res) => Boolean(res))
    .catch(() => false);

export const deactivateModule = (userId: number, moduleId: number) => {
  const url = `${DB_SERVICE_URL}/${basePath}/${userId}/module/${moduleId}`;
  return sendDelete(url).then((res) => res && res.ok);
};

export const activateModule = async (
  userId: number,
  moduleId: number
): Promise<ServiceRequest | undefined> => {
  const url = `${DB_SERVICE_URL}/${basePath}/${userId}/module/${moduleId}`;
  const res = await sendPut(url);

  if (res && res.ok) {
    return res.json();
  }

  return;
};

export const setToken = async (
  userId: number,
  moduleId: number,
  token: string
): Promise<boolean> => {
  const url = `${DB_SERVICE_URL}/${basePath}/${userId}/module/${moduleId}/token?token=${token}`;

  return sendPost(url).then((res) => res && res.ok);
};
