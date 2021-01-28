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

const { BOT_TOKEN } = process.env;

export const FIXED_COMMANDS = [Start, Settings];

export const bot = new TelegramBot(BOT_TOKEN, {
  webHook: false,
  polling: false,
});

export const generateBot = () => {
  bot.clearTextListeners();

  bot.removeAllListeners("callback_query");
  bot.removeAllListeners("pinned_message");

  bot.onText(new RegExp(`/?${Start().command}`), async (msg) => {
    await replyToStart(msg).catch((e) =>
      bot.sendMessage(msg.chat.id, `start: ${e}`)
    );
    callback();
  });

  bot.onText(new RegExp(`/?${Back().command}`), async (msg) => {
    await replyToBack(msg).catch((e) => bot.sendMessage(msg.chat.id, e));
    callback();
  });

  bot.onText(new RegExp(`/?${Settings().command}`), async (msg) => {
    await replyToSettings(msg).catch((e) =>
      bot.sendMessage(msg.chat.id, `einstellungen: ${e}`)
    );
    callback();
  });

  bot.onText(new RegExp(`/?${ModuleSettings().command}`), async (msg) => {
    await replyToModuleSettins(msg).catch((e) =>
      bot.sendMessage(msg.chat.id, `module: ${e}`)
    );
    callback();
  });

  bot.onText(new RegExp(`/?${UserSettings().command}`), async (msg) => {
    await replyToUserSettings(msg).catch((e) =>
      bot.sendMessage(msg.chat.id, `benutzer: ${e}`)
    );
    callback();
  });

  bot.onText(new RegExp(`/?${Lifx().command} ?(.+)?`), async (msg, match) => {
    await replyToLifx(msg, match).catch((e) =>
      bot.sendMessage(msg.chat.id, `lifx: ${e}`)
    );
    callback();
  });

  bot.onText(new RegExp(`/?${Hue().command}`), async (msg) => {
    await replyToHue(msg).catch((e) =>
      bot.sendMessage(msg.chat.id, `hue: ${e}`)
    );
    callback();
  });

  bot.onText(new RegExp(`/?${Fritz().command} ?(.+)?`), async (msg, match) => {
    await replyToFritz(msg, match).catch((e) =>
      bot.sendMessage(msg.chat.id, `fritz: ${e}`)
    );
    callback();
  });

  bot.onText(new RegExp(""), async (msg) => {
    if (!msg.reply_to_message) return;

    await replyToReply(msg).catch((e) =>
      bot.sendMessage(msg.chat.id, `text: ${e}`)
    );
    callback();
  });

  bot.on("callback_query", async (cbQuery) => {
    await replyToButtons(cbQuery).catch((e) =>
      bot.sendMessage(cbQuery.message.chat.id, `callback_query: ${e}`)
    );
    callback();
  });

  bot.on("pinned_message", () => callback());

  return bot;
};
