import { Message } from "node-telegram-bot-api";
import { Command } from "@telegram-home-assistant/types";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { generateSendMessageOptions } from "../keyboard";
import { createUser } from "../services/user";

export const Start: Command = () => {
  const translations = i18n();

  console.log(translations);
  return {
    command: translations.start.name,
    description: translations.start.description,
  };
};

export const Back: Command = () => {
  const translations = i18n();

  return {
    command: translations.back.name,
    description: translations.back.description,
  };
};

export const replyToStart = async ({ chat, from }: Message) => {
  const success = await createUser(from.id);
  const translations = i18n();

  const text = success ? translations.start.message : translations.start.error;

  return generateSendMessageOptions(from.id)
    .then((options) => bot.sendMessage(chat.id, text, options))
    .catch(() => bot.sendMessage(chat.id, text));
};

export const replyToBack = async ({ chat, from }: Message) => {
  const success = await createUser(from.id);
  const translations = i18n();

  const text = success ? translations.back.success : translations.back.error;

  return generateSendMessageOptions(from.id)
    .then((options) => bot.sendMessage(chat.id, text, options))
    .catch(() => bot.sendMessage(chat.id, text));
};
