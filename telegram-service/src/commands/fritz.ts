import { Message } from "node-telegram-bot-api";
import { Command } from "telegram-home-assistant-types";
import { sendDeviceList } from "../actions/device-list";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { findModuleByName } from "../services/module";
import { setToken } from "../services/user";

export const Fritz: Command = () => {
  const translations = i18n();

  return {
    command: translations.fritz.name,
    description: translations.fritz.description,
  };
};

export const replyToFritz = async (
  { from, chat }: Message,
  match: RegExpExecArray
) => {
  const translations = i18n();

  const module = await findModuleByName(Fritz.name);

  if (module) {
    const hasArgs = Boolean(match[1]);
    let tokenSuccess = false;

    if (hasArgs) {
      await setToken(
        from.id,
        module.id,
        Buffer.from(match[1]).toString("base64")
      )
        .then(() => {
          tokenSuccess = true;
          return bot.sendMessage(chat.id, translations.fritz.tokenUpdate);
        })
        .catch(() => bot.sendMessage(chat.id, translations.fritz.tokenError));
    }

    if (tokenSuccess || !hasArgs) {
      return sendDeviceList(from.id, chat.id, module.id);
    }
  }

  return bot.sendMessage(chat.id, translations.fritz.moduleError);
};
