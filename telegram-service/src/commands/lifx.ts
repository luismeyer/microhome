import { Message } from "node-telegram-bot-api";
import { Command } from "@telegram-home-assistant/types";
import { sendDeviceList } from "../actions/device-list";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { findModuleByName } from "../services/module";
import { setToken } from "../services/user";

export const Lifx: Command = () => {
  const translations = i18n();

  return {
    command: translations.lifx.name,
    description: translations.lifx.description,
  };
};

export const replyToLifx = async (
  { chat, from }: Message,
  match: RegExpExecArray
) => {
  const translations = i18n();

  const module = await findModuleByName(Lifx.name);

  const hasArgs = Boolean(match[1]);
  let tokenSuccess = false;

  if (hasArgs) {
    await setToken(from.id, module.id, match[1])
      .then(() => {
        tokenSuccess = true;
        return bot.sendMessage(chat.id, translations.lifx.tokenUpdate);
      })
      .catch(() => bot.sendMessage(chat.id, translations.lifx.tokenError));
  }

  if (tokenSuccess || !hasArgs) {
    return sendDeviceList(from.id, chat.id, module.id);
  }
};
