import { CallbackData, SimpleResponse } from "@microhome/types";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { generateSendMessageOptions } from "../keyboard";
import { getDeviceFunction } from "../services/device";
import { makeServiceRequest } from "../services/service";
import { getCallbackDataId } from "../telegram/callback-data";
import { createState } from "../services/state";

export const sendDeviceAction = async (
  userId: number,
  chatId: number,
  cbData: CallbackData,
  data?: string
) => {
  if (!cbData.data) {
    return;
  }

  const translations = i18n();

  // Start input dialog
  if (cbData.data.endsWith("*") && !data) {
    const stateSuccess = await createState(userId, cbData);

    if (!stateSuccess) {
      return bot.sendMessage(chatId, translations.deviceAction.databaseError);
    }

    return await bot.sendMessage(
      chatId,
      translations.deviceAction.inputPrompt,
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );
  }

  const callbackDataId = getCallbackDataId(cbData);

  if (!callbackDataId) {
    return;
  }

  const { deviceId, moduleId } = callbackDataId;

  const serviceRequest = await getDeviceFunction(
    userId,
    moduleId,
    deviceId,
    cbData.data
  );

  if (!serviceRequest) {
    return bot.sendMessage(chatId, translations.deviceAction.databaseError);
  }

  // Remove 'input-required' symbol
  const { body } = serviceRequest;
  if (data && body.action) {
    body.action = body.action.replace("*", "");
    body.data = data;
  }

  const res = await makeServiceRequest<SimpleResponse>(serviceRequest);

  const message = res.success
    ? translations.deviceAction.success
    : `${translations.deviceAction.error} ${res.error}`;

  return bot.sendMessage(
    chatId,
    message,
    await generateSendMessageOptions(userId)
  );
};
