import bot from "../bot";
import { deviceToString } from "../devices";
import { i18n } from "../i18n";
import { generateFunctionButtons } from "../keyboard";
import { getDeviceFunctions } from "../services/device";
import { makeServiceRequest } from "../services/service";
import { DeviceResponse } from "../services/typings";
import { CallbackData, getCallbackDataId } from "../telegram/callback-data";

export const sendDeviceSelect = async (
  userId: number,
  chatId: number,
  cbData: CallbackData
) => {
  const translations = await i18n(userId);

  const { deviceId, moduleId } = getCallbackDataId(cbData);
  const { serviceRequest, functions } = await getDeviceFunctions(
    userId,
    moduleId,
    deviceId
  );

  const deviceResponse = await makeServiceRequest<DeviceResponse>(
    serviceRequest
  );

  const keyboardMarkup = generateFunctionButtons(functions, deviceId, moduleId);

  let messageText: string;
  if (deviceResponse.success) {
    messageText = await deviceToString(deviceResponse.result).catch(() => "");
  } else {
    messageText = `${translations.internalError}: ${deviceResponse.error}`;
  }

  return bot.sendMessage(chatId, messageText, { reply_markup: keyboardMarkup });
};
