import { Message } from "node-telegram-bot-api";
import { CallbackData } from "@microhome/types";
import { sendDeviceAction } from "../actions/device-action";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { getUser } from "../services/user";

export const replyToReply = async ({
  reply_to_message,
  chat,
  from,
  text,
}: Message) => {
  if (!reply_to_message || !from) {
    return;
  }
  const translations = i18n();

  await bot.deleteMessage(chat.id, reply_to_message.message_id.toString());

  const { state } = await getUser<CallbackData>(from.id);

  if (!state) {
    return bot.sendMessage(chat.id, translations.input.dbError);
  }

  return sendDeviceAction(from.id, chat.id, state, text);
};
