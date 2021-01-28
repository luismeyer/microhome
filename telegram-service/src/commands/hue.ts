import { Message } from "node-telegram-bot-api";
import { sendDeviceList } from "../actions/device-list";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { findModuleByName } from "../services/module";
import { Command } from "../telegram/command";

export const Hue: Command = () => {
  const translations = i18n();

  return {
    command: translations.hue.name,
    description: translations.hue.description,
  };
};

export const replyToHue = async ({ from, chat }: Message) => {
  const translations = i18n();

  return findModuleByName(Hue.name)
    .then((module) => sendDeviceList(from.id, chat.id, module.id))
    .catch((e) => bot.sendMessage(chat.id, `${translations.internalError}`));
};
