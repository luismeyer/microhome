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

const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) {
  throw new Error("Missing Env Variable: 'BOT_TOKEN'");
}

export const FIXED_COMMANDS = [Start, Settings];

export const bot = new TelegramBot(BOT_TOKEN, {
  webHook: false,
  polling: false,
});

const generateCommandRegex = () => ({
  start: new RegExp(`/?${Start().command}`),
  back: new RegExp(`/?${Back().command}`),
  settings: new RegExp(`/?${Settings().command}`),
  moduleSettings: new RegExp(`/?${ModuleSettings().command}`),
  userSettings: new RegExp(`/?${UserSettings().command}`),
  lifx: new RegExp(`/?${Lifx().command} ?(.+)?`),
  hue: new RegExp(`/?${Hue().command}`),
  fritz: new RegExp(`/?${Fritz().command} ?(.+)?`),
});

const errorResponse = (chatId: number) => (error: any) =>
  bot.sendMessage(chatId, `Error: ${error}`);

export const generateBot = (callback: () => void) => {
  const commmands = generateCommandRegex();

  bot.clearTextListeners();

  bot.onText(commmands.start, async (msg) => {
    await replyToStart(msg).catch(errorResponse(msg.chat.id));
    callback();
  });

  bot.onText(commmands.back, async (msg) => {
    await replyToBack(msg).catch(errorResponse(msg.chat.id));
    callback();
  });

  bot.onText(commmands.settings, async (msg) => {
    await replyToSettings(msg).catch(errorResponse(msg.chat.id));
    callback();
  });

  bot.onText(commmands.moduleSettings, async (msg) => {
    await replyToModuleSettins(msg).catch(errorResponse(msg.chat.id));
    callback();
  });

  bot.onText(commmands.userSettings, async (msg) => {
    await replyToUserSettings(msg).catch(errorResponse(msg.chat.id));
    callback();
  });

  bot.onText(commmands.lifx, async (msg, match) => {
    if (!match) {
      return;
    }

    await replyToLifx(msg, match).catch(errorResponse(msg.chat.id));
    callback();
  });

  bot.onText(commmands.hue, async (msg) => {
    await replyToHue(msg).catch(errorResponse(msg.chat.id));
    callback();
  });

  bot.onText(commmands.fritz, async (msg, match) => {
    if (!match) {
      return;
    }

    await replyToFritz(msg, match).catch(errorResponse(msg.chat.id));
    callback();
  });

  bot.onText(new RegExp(""), async (msg) => {
    // return if other command matches the input text
    if (
      Object.values(commmands).some(
        (regex) => msg.text && msg.text.match(regex)
      )
    ) {
      return;
    }

    if (!msg.reply_to_message) {
      await bot.sendMessage(msg.chat.id, "👻");
      callback();
      return;
    }

    await replyToReply(msg).catch(errorResponse(msg.chat.id));
    callback();
  });

  bot.removeAllListeners("sticker");
  bot.on("sticker", async ({ chat }) => {
    await bot.sendMessage(chat.id, "😎");
    callback();
  });

  bot.removeAllListeners("callback_query");
  bot.on("callback_query", async (cbQuery) => {
    await replyToButtons(cbQuery).catch((e) => {
      if (!cbQuery.message) {
        return;
      }

      bot.sendMessage(cbQuery.message.chat.id, `callback_query: ${e}`);
    });
    callback();
  });

  bot.removeAllListeners("pinned_message");
  bot.on("pinned_message", () => callback());

  return bot;
};
