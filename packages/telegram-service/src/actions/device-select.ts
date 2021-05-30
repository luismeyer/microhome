import {
  ActionDeviceData,
  CallBackData,
  DeviceResponse,
  ModuleFunction,
} from "@microhome/types";
import { InlineKeyboardMarkup } from "node-telegram-bot-api";
import { createCallbackData } from "../services/callback-data";
import { bot } from "../bot";
import { deviceToString } from "../devices";
import { i18n } from "../i18n";
import { getDeviceFunctions } from "../services/device";
import { makeServiceRequest } from "../services/service";

const generateFunctionButtons = async (
  functions: ModuleFunction[],
  deviceId: string,
  moduleId: number
): Promise<InlineKeyboardMarkup> => {
  const row = await Promise.all(
    functions.map(async (func) => {
      const data: Omit<ActionDeviceData, "id"> = {
        action: "ACTION_DEVICE",
        moduleId,
        deviceId,
        data: func,
      };

      const cbData = await createCallbackData(data);

      return {
        callback_data: cbData.id,
        text: func.name,
      };
    })
  );

  return {
    inline_keyboard: [row],
  };
};

export const sendDeviceSelect = async (
  userId: number,
  chatId: number,
  cbData: CallBackData
) => {
  const translations = i18n();

  const { deviceId, moduleId } = cbData;
  if (!deviceId || !moduleId) {
    return;
  }

  const deviceFunctions = await getDeviceFunctions(userId, moduleId, deviceId);

  if (!deviceFunctions) {
    return;
  }

  const { serviceRequest, functions } = deviceFunctions;

  const deviceResponse = await makeServiceRequest<DeviceResponse>(
    serviceRequest
  );

  const keyboardMarkup = await generateFunctionButtons(
    functions,
    deviceId,
    moduleId
  );

  const messageText = deviceResponse.success
    ? deviceToString(deviceResponse.result)
    : `${translations.internalError}: ${deviceResponse.error}`;

  return bot.sendMessage(chatId, messageText, { reply_markup: keyboardMarkup });
};
