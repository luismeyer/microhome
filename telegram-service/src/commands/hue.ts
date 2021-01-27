import { Message } from "node-telegram-bot-api";
import { sendDeviceList } from "../actions/device-list";
import bot from "../bot";
import { i18n } from "../i18n";
import { findModuleByName } from "../services/module";
import { Command } from "../telegram/command";

export const Hue: Command = {
  name: "hue",
  description: "Öffnet das Hue Gerätemenü",
};

export const replyToHue = async ({ from, chat }: Message) => {
  const translations = await i18n(from.id);

  return findModuleByName(Hue.name)
    .then((module) => sendDeviceList(from.id, chat.id, module.id))
    .catch((e) => bot.sendMessage(chat.id, `${translations.internalError}`));
};
