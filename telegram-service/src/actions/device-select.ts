import bot from "../bot";
import { deviceToString } from "../devices";
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

  let messageText;
  if (deviceResponse.success) {
    messageText = deviceToString(deviceResponse.result);
  } else {
    messageText = "Etwas ist schiefgegangen: " + deviceResponse.error;
  }

  return bot.sendMessage(chatId, messageText, { reply_markup: keyboardMarkup });
};
