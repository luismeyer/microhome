import { Message } from "node-telegram-bot-api";
import bot from "../bot";
import { i18n } from "../i18n";
import { generateSendMessageOptions } from "../keyboard";
import { createUser } from "../services/user";
import { Command } from "../telegram/command";

export const Start: Command = {
  name: "start",
  description: "Startet den Bot",
};

export const Back: Command = {
  name: "zurück",
  description: "Setzt das Keyboard Menü zurück",
};

export const replyToStart = async ({ chat, from }: Message) => {
  const success = await createUser(from.id);
  const translations = await i18n(from.id);

  const text = success ? translations.start.message : translations.start.error;

  return generateSendMessageOptions(from.id)
    .then((options) => bot.sendMessage(chat.id, text, options))
    .catch(() => bot.sendMessage(chat.id, text));
};

export const replyToBack = async ({ chat, from }: Message) => {
  const success = await createUser(from.id);
  const translations = await i18n(from.id);

  const text = success ? translations.back.success : translations.back.error;

  return generateSendMessageOptions(from.id)
    .then((options) => bot.sendMessage(chat.id, text, options))
    .catch(() => bot.sendMessage(chat.id, text));
};
