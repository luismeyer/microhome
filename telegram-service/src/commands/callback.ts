import { CallbackQuery } from "node-telegram-bot-api";
import { sendDeviceAction } from "../actions/device-action";
import { sendDeviceSelect } from "../actions/device-select";
import { sendModuleToggle } from "../actions/module-toggle";
import bot from "../bot";
import {
  ACTION_DEVICE,
  ACTIVATE_MODULE,
  DEACTIVATE_MODULE,
  SELECT_DEVICE,
} from "../telegram/callback-actions";
import { CallbackData } from "../telegram/callback-data";

export const replyToButtons = async ({
  from,
  message,
  data,
  id,
}: CallbackQuery) => {
  const { id: userId } = from;
  const { chat } = message;

  const callbackData: CallbackData = JSON.parse(data);

  switch (callbackData.action) {
    case SELECT_DEVICE:
      await sendDeviceSelect(userId, chat.id, callbackData);
      break;
    case ACTION_DEVICE:
      await sendDeviceAction(message, callbackData);
      break;
    case ACTIVATE_MODULE:
      await sendModuleToggle(userId, chat.id, callbackData, true);
      break;
    case DEACTIVATE_MODULE:
      await sendModuleToggle(userId, chat.id, callbackData, false);
      break;
    default:
      await bot.sendMessage(chat.id, "Falsche Action");
  }

  return bot.answerCallbackQuery(id);
};
