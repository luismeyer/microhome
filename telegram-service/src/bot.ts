import TelegramBot from "node-telegram-bot-api";
import { replyToButtons } from "./commands/callback";
import { Fritz, replyToFritz } from "./commands/fritz";
import { Hue, replyToHue } from "./commands/hue";
import { replyToReply } from "./commands/input";
import { Lifx, replyToLifx } from "./commands/lifx";
import {
  ModuleSettings,
  replyToModuleSettins,
  replyToSettings,
  replyToUserSettings,
  Settings,
  UserSettings,
} from "./commands/settings";
import { Back, replyToBack, replyToStart, Start } from "./commands/start";
import { callback } from "./handler";
import { i18n } from "./i18n";

const { BOT_TOKEN } = process.env;

export const FIXED_COMMANDS = [Start, Settings];

const bot = new TelegramBot(BOT_TOKEN, {
  webHook: false,
  polling: false,
});

export const setDefaultCommands = () => {
  const myCommands = FIXED_COMMANDS.map((c) => ({
    command: "/" + c.name,
    description: c.description,
  }));

  bot.setMyCommands(myCommands);
};

bot.onText(new RegExp(`/?${Start.name}`), async (msg) => {
  const translations = await i18n(msg.from.id);

  await replyToStart(msg).catch((e) =>
    bot.sendMessage(msg.chat.id, `${translations.replyError} start: ${e}`)
  );
  callback();
});

bot.onText(new RegExp(`/?${Back.name}`), async (msg) => {
  const translations = await i18n(msg.from.id);

  await replyToBack(msg).catch((e) =>
    bot.sendMessage(msg.chat.id, `${translations.replyError} zurück: ${e}`)
  );
  callback();
});

bot.onText(new RegExp(`/?${Settings.name}`), async (msg) => {
  const translations = await i18n(msg.from.id);

  await replyToSettings(msg).catch((e) =>
    bot.sendMessage(
      msg.chat.id,
      `${translations.replyError} einstellungen: ${e}`
    )
  );
  callback();
});

bot.onText(new RegExp(`/?${ModuleSettings.name}`), async (msg) => {
  const translations = await i18n(msg.from.id);

  await replyToModuleSettins(msg).catch((e) =>
    bot.sendMessage(msg.chat.id, `${translations.replyError} module: ${e}`)
  );
  callback();
});

bot.onText(new RegExp(`/?${UserSettings.name}`), async (msg) => {
  const translations = await i18n(msg.from.id);

  await replyToUserSettings(msg).catch((e) =>
    bot.sendMessage(msg.chat.id, `${translations.replyError} benutzer: ${e}`)
  );
  callback();
});

bot.onText(new RegExp(`/?${Lifx.name} ?(.+)?`), async (msg, match) => {
  const translations = await i18n(msg.from.id);

  await replyToLifx(msg, match).catch((e) =>
    bot.sendMessage(msg.chat.id, `${translations.replyError} lifx: ${e}`)
  );
  callback();
});

bot.onText(new RegExp(`/?${Hue.name}`), async (msg) => {
  const translations = await i18n(msg.from.id);

  await replyToHue(msg).catch((e) =>
    bot.sendMessage(msg.chat.id, `${translations.replyError} hue: ${e}`)
  );
  callback();
});

bot.onText(new RegExp(`/?${Fritz.name} ?(.+)?`), async (msg, match) => {
  const translations = await i18n(msg.from.id);

  await replyToFritz(msg, match).catch((e) =>
    bot.sendMessage(msg.chat.id, `${translations.replyError} fritz: ${e}`)
  );
  callback();
});

bot.on("callback_query", async (cbQuery) => {
  const translations = await i18n(cbQuery.message.from.id);

  await replyToButtons(cbQuery).catch((e) =>
    bot.sendMessage(
      cbQuery.message.chat.id,
      `${translations.replyError} callback_query: ${e}`
    )
  );
  callback();
});

bot.onText(new RegExp(""), async (msg) => {
  const translations = await i18n(msg.from.id);

  await replyToReply(msg).catch((e) =>
    bot.sendMessage(msg.chat.id, `${translations.replyError} text: ${e}`)
  );
  callback();
});

bot.on("pinned_message", () => callback());

export default bot;
