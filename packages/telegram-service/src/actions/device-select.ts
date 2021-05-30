import { CallBackDataDetails, DeviceResponse } from "@microhome/types";
import { bot } from "../bot";
import { deviceToString } from "../devices";
import { i18n } from "../i18n";
import { generateFunctionButtons } from "../keyboard";
import { getDeviceFunctions } from "../services/device";
import { makeServiceRequest } from "../services/service";

export const sendDeviceSelect = async (
  userId: number,
  chatId: number,
  cbData: CallBackDataDetails
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
