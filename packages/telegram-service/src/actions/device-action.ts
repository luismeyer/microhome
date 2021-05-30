import { ActionDeviceData, SimpleResponse } from "@microhome/types";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { dashboardKeyboardMarkup } from "../keyboard";
import { getDeviceFunction } from "../services/device";
import { makeServiceRequest } from "../services/service";
import { updateUser } from "../services/user";

export const sendDeviceAction = async (
  userId: number,
  chatId: number,
  cbData: ActionDeviceData,
  data?: string
) => {
  if (!cbData.data) {
    return;
  }

  const translations = i18n();

  // Start input dialog
  if (cbData.data.requiresInput && !data) {
    const stateSuccess = await updateUser(userId, { state: cbData });

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

  const { deviceId, moduleId } = cbData;

  if (!deviceId || !moduleId) {
    return;
  }

  const serviceRequest = await getDeviceFunction(
    userId,
    moduleId,
    deviceId,
    cbData.data.name
  );

  if (!serviceRequest) {
    return bot.sendMessage(chatId, translations.deviceAction.databaseError);
  }

  const { body } = serviceRequest;
  if (data) {
    body.data = data;
  }

  const res = await makeServiceRequest<SimpleResponse>(serviceRequest);

  const message = res.success
    ? translations.deviceAction.success
    : `${translations.deviceAction.error} ${res.error}`;

  return bot.sendMessage(
    chatId,
    message,
    await dashboardKeyboardMarkup(userId)
  );
};
