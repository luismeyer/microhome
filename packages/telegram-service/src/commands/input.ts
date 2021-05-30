import { Message } from "node-telegram-bot-api";
import { CallbackData } from "@microhome/types";
import { sendDeviceAction } from "../actions/device-action";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { deleteState, getState } from "../services/state";

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

  const stateData = await getState<CallbackData>(from.id);

  if (!stateData?.data) {
    return bot.sendMessage(chat.id, translations.input.dbError);
  }

  await deleteState(from.id);

  return sendDeviceAction(from.id, chat.id, stateData.data, text);
};
