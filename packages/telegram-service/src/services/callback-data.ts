import { sendDelete, sendGet, sendPut } from "../utils/http";
import { DB_SERVICE_URL } from "../utils/const";
import { CallBackDataDetails } from "@microhome/types";

const basePath = "callbackdata/";

export const createCallbackData = async (
  data: Omit<CallBackDataDetails, "id">
): Promise<CallBackDataDetails> => {
  const url = `${DB_SERVICE_URL}${basePath}`;
  return sendPut(url, JSON.stringify(data)).then((res) => res.ok && res.json());
};

export const getCallbackData = async (
  cbId: string
): Promise<CallBackDataDetails> => {
  const url = `${DB_SERVICE_URL}${basePath}${cbId}`;
  return sendGet(url).then((res) => res.ok && res.json());
};

export const deleteCallbackData = async (cbId: string): Promise<boolean> => {
  const url = `${DB_SERVICE_URL}${basePath}${cbId}`;
  return sendDelete(url).then((res) => res.ok);
};
