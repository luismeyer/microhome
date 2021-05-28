import { CallbackData, DeviceResponse } from "@microhome/types";
import { bot } from "../bot";
import { deviceToString } from "../devices";
import { i18n } from "../i18n";
import { generateFunctionButtons } from "../keyboard";
import { getDeviceFunctions } from "../services/device";
import { makeServiceRequest } from "../services/service";
import { getCallbackDataId } from "../telegram/callback-data";

export const sendDeviceSelect = async (
  userId: number,
  chatId: number,
  cbData: CallbackData
) => {
  const translations = i18n();

  const callbackDataId = getCallbackDataId(cbData);

  if (!callbackDataId) {
    return;
  }

  const { deviceId, moduleId } = callbackDataId;

  const deviceFunctions = await getDeviceFunctions(userId, moduleId, deviceId);

  if (!deviceFunctions) {
    return;
  }

  const { serviceRequest, functions } = deviceFunctions;

  const deviceResponse = await makeServiceRequest<DeviceResponse>(
    serviceRequest
  );

  const keyboardMarkup = generateFunctionButtons(functions, deviceId, moduleId);

  let messageText: string;
  if (deviceResponse.success) {
    messageText = deviceToString(deviceResponse.result);
  } else {
    messageText = `${translations.internalError}: ${deviceResponse.error}`;
  }

  return bot.sendMessage(chatId, messageText, { reply_markup: keyboardMarkup });
};
