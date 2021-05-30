import { sendDelete, sendGet, sendPut } from "../utils/http";
import { DB_SERVICE_URL } from "../utils/const";
import { CallBackData } from "@microhome/types";

const basePath = "callbackdata/";

export const createCallbackData = async (
  data: Omit<CallBackData, "id">
): Promise<CallBackData> => {
  const url = `${DB_SERVICE_URL}${basePath}`;
  return sendPut(url, JSON.stringify(data)).then((res) => res.ok && res.json());
};

export const getCallbackData = async (cbId: string): Promise<CallBackData> => {
  const url = `${DB_SERVICE_URL}${basePath}${cbId}`;
  return sendGet(url).then((res) => res.ok && res.json());
};

export const deleteCallbackData = async (cbId: string): Promise<boolean> => {
  const url = `${DB_SERVICE_URL}${basePath}${cbId}`;
  return sendDelete(url).then((res) => res.ok);
};
