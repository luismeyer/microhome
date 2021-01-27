import { Message } from "node-telegram-bot-api";
import bot from "../bot";
import { i18n } from "../i18n";
import { generateSendMessageOptions } from "../keyboard";
import { getDeviceFunction } from "../services/device";
import { makeServiceRequest } from "../services/service";
import { SimpleResponse } from "../services/typings";
import { CallbackData, getCallbackDataId } from "../telegram/callback-data";

export const sendDeviceAction = async (
  userId: number,
  chatId: number,
  cbData: CallbackData,
  { message_id }: Message,
  data?: string
) => {
  const translations = await i18n(userId);

  // Start input dialog
  if (cbData.data.endsWith("*") && !data) {
    await bot.sendMessage(chatId, translations.deviceAction.inputPrompt, {
      reply_markup: {
        force_reply: true,
      },
    });

    return bot.pinChatMessage(chatId, message_id.toString());
  }

  const { deviceId, moduleId } = getCallbackDataId(cbData);

  const serviceRequest = await getDeviceFunction(
    userId,
    moduleId,
    deviceId,
    cbData.data
  );

  if (!serviceRequest) {
    return bot.sendMessage(chatId, translations.deviceAction.databaseError);
  }

  const { body } = serviceRequest;
  if (data) {
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
