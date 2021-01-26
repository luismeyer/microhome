import { Message } from "node-telegram-bot-api";
import { sendDeviceAction } from "../actions/device-action";
import bot from "../bot";
import { CallbackData } from "../telegram/callback-data";

export const replyToReply = async ({
  reply_to_message,
  chat,
  from,
  text,
}: Message) => {
  if (!reply_to_message) {
    console.log("No reply");
    return;
  }

  await bot.deleteMessage(chat.id, reply_to_message.message_id.toString());

  const { pinned_message } = await bot.getChat(chat.id);
  if (!pinned_message) {
    return bot.sendMessage(chat.id, "Keine angepinnte Nachricht");
  }

  await bot.unpinAllChatMessages(chat.id);

  const markup = pinned_message.reply_markup;
  if (
    !markup ||
    markup.inline_keyboard.length == 0 ||
    markup.inline_keyboard[0].length == 0 ||
    !markup.inline_keyboard[0][0]
  ) {
    return bot.sendMessage(
      chat.id,
      "Interner Fehler. Falsches Antworten Format"
    );
  }

  const button = markup.inline_keyboard[0][0];
  const cbData: CallbackData = JSON.parse(button.callback_data);
  return sendDeviceAction(from.id, chat.id, cbData, pinned_message, text);
};
