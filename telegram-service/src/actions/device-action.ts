import { Message } from "node-telegram-bot-api";
import bot from "../bot";
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
  // Start input dialog
  if (cbData.function.endsWith("*") && !data) {
    await bot.sendMessage(
      chatId,
      "Antworte auf diese Nachricht mit den Eingabe Daten",
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );

    return bot.pinChatMessage(chatId, message_id.toString());
  }

  const { deviceId, moduleId } = getCallbackDataId(cbData);

  const serviceRequest = await getDeviceFunction(
    userId,
    moduleId,
    deviceId,
    cbData.function
  );

  if (!serviceRequest) {
    return bot.sendMessage(chatId, "Fehler beim Abfragen der Datenbank");
  }

  const { body } = serviceRequest;
  if (data) {
    body.action = body.action.replace("*", "");
    body.data = data;
  }

  const res = await makeServiceRequest<SimpleResponse>(serviceRequest);

  const message = res.success
    ? "Wir hatten erfolg!!"
    : "Hat irgendwie nicht geklappt!! " + res.error;

  return bot.sendMessage(
    chatId,
    message,
    await generateSendMessageOptions(userId)
  );
};
