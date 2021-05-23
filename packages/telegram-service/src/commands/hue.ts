import { Message } from "node-telegram-bot-api";
import { Command } from "@telegram-home-assistant/types";
import { sendDeviceList } from "../actions/device-list";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { findModuleByName } from "../services/module";

export const Hue: Command = () => {
  const translations = i18n();

  return {
    command: translations.hue.name,
    description: translations.hue.description,
  };
};

export const replyToHue = async ({ from, chat }: Message) => {
  if (!from) {
    return;
  }

  const translations = i18n();

  return findModuleByName(Hue.name)
    .then((module) => module && sendDeviceList(from.id, chat.id, module.id))
    .catch(() => bot.sendMessage(chat.id, `${translations.internalError}`));
};
