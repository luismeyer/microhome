import { Message } from "node-telegram-bot-api";

import { bot, Command } from "../bot";
import { i18n } from "../i18n";
import { dashboardKeyboardMarkup } from "../keyboard";
import { createUser } from "../services/user";

export const Start: Command = () => {
  const { start } = i18n();

  return {
    command: start.name,
    regex: new RegExp(`/?${start.name}`),
    description: start.description,
    handler: replyToStart,
  };
};

export const Back: Command = () => {
  const { back } = i18n();

  return {
    command: back.name,
    regex: new RegExp(`/?${back.name}`),
    description: back.description,
    handler: replyToBack,
  };
};

export const replyToStart = async ({ chat, from }: Message) => {
  if (!from) {
    return;
  }

  const success = await createUser(from.id);
  const translations = i18n();

  const text = success ? translations.start.message : translations.start.error;

  await dashboardKeyboardMarkup(from.id)
    .then((options) => bot.sendMessage(chat.id, text, options))
    .catch(() => bot.sendMessage(chat.id, text));
};

export const replyToBack = async ({ chat, from }: Message) => {
  if (!from) {
    return;
  }

  const success = await createUser(from.id);
  const translations = i18n();

  const text = success ? translations.back.success : translations.back.error;

  await dashboardKeyboardMarkup(from.id)
    .then((options) => bot.sendMessage(chat.id, text, options))
    .catch(() => bot.sendMessage(chat.id, text));
};
