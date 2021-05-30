import { sendDelete, sendGet, sendPut } from "../utils/http";
import { DB_SERVICE_URL } from "../utils/const";

const basePath = "state/";

export const createState = async <T>(
  userId: number,
  data: T
): Promise<boolean> => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}`;
  return sendPut(url, JSON.stringify(data)).then((res) => res.ok);
};

export const getState = async <T>(
  userId: number
): Promise<{ id: number; data: T } | undefined> => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}`;
  return sendGet(url).then((res) => res.ok && res.json());
};

export const deleteState = async (userId: number): Promise<boolean> => {
  const url = `${DB_SERVICE_URL}${basePath}${userId}`;
  return sendDelete(url).then((res) => res.ok);
};
