import { CallbackQuery } from "node-telegram-bot-api";
import { sendDeviceAction } from "../actions/device-action";
import { sendDeviceSelect } from "../actions/device-select";
import { sendModuleToggle } from "../actions/module-toggle";
import { sendSetLanguage } from "../actions/set-language";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { getCallbackData } from "../services/callback-data";

export const replyToButtons = async ({
  from,
  message,
  data,
  id,
}: CallbackQuery) => {
  if (!message || !data) {
    return;
  }

  const { id: userId } = from;
  const { chat } = message;

  const translations = i18n();

  const callbackData = await getCallbackData(data);

  switch (callbackData.action) {
    case "SELECT_DEVICE":
      await sendDeviceSelect(userId, chat.id, callbackData);
      break;
    case "ACTION_DEVICE":
      await sendDeviceAction(from.id, message.chat.id, callbackData);
      break;
    case "ACTIVATE_MODULE":
      await sendModuleToggle(userId, callbackData, true);
      break;
    case "DEACTIVATE_MODULE":
      await sendModuleToggle(userId, callbackData, false);
      break;
    case "SET_LANGUAGE":
      await sendSetLanguage(userId, chat.id, callbackData);
      break;
    default:
      await bot.sendMessage(chat.id, translations.callback.error);
  }

  return bot.answerCallbackQuery(id);
};
