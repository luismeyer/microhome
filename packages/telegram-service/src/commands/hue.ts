import { Message } from "node-telegram-bot-api";
import { sendDeviceList } from "../actions/device-list";
import { bot, Command } from "../bot";
import { i18n } from "../i18n";
import { findModuleByName } from "../services/module";

export const Hue: Command = () => {
  const { hue } = i18n();

  return {
    command: hue.name,
    regex: new RegExp(`/?${hue.name}`),
    description: hue.description,
    handler: replyToHue,
  };
};

export const replyToHue = async ({ from, chat }: Message) => {
  if (!from) {
    return;
  }

  const translations = i18n();

  await findModuleByName(Hue.name)
    .then((module) => module && sendDeviceList(from.id, chat.id, module.id))
    .catch(() => bot.sendMessage(chat.id, `${translations.internalError}`));
};
