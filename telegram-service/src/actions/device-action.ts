import { Message } from "node-telegram-bot-api";
import bot from "../bot";
import { generateSendMessageOptions } from "../keyboard";
import { getDeviceFunction } from "../services/device";
import { makeServiceRequest } from "../services/service";
import { SimpleResponse } from "../services/typings";
import { CallbackData, getCallbackDataId } from "../telegram/callback-data";

export const sendDeviceAction = async (
  { chat, message_id, from }: Message,
  cbData: CallbackData,
  data?: string
) => {
  // Start input dialog
  if (cbData.function.endsWith("*") && !data) {
    await bot.sendMessage(
      chat.id,
      "Antworte auf diese Nachricht mit den Eingabe Daten",
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );

    return bot.pinChatMessage(chat.id, message_id.toString());
  }

  const { deviceId, moduleId } = getCallbackDataId(cbData);
  getDeviceFunction(from.id, moduleId, deviceId, cbData.function).then(
    async (serviceRequest) => {
      if (!serviceRequest) {
        bot.sendMessage(chat.id, "Fehle beim Abfragen der Datenbank");
      }

      const { body } = serviceRequest;
      if (data) {
        body.action = body.action.replace("*", "");
        body.data = data;
      }

      return makeServiceRequest<SimpleResponse>(serviceRequest).then(
        async (res) => {
          const message = res.success
            ? "Wir hatten erfolg!!"
            : "Hat irgendwie nicht geklappt!! " + res.error;

          return bot.sendMessage(
            chat.id,
            message,
            await generateSendMessageOptions(from.id)
          );
        }
      );
    }
  );
};
