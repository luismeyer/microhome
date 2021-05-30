import TelegramBot from "node-telegram-bot-api";
import { replyToButtons } from "./commands/callback";
import { Fritz } from "./commands/fritz";
import { Hue } from "./commands/hue";
import { replyToReply } from "./commands/input";
import { Lifx } from "./commands/lifx";
import { ModuleSettings, Settings, UserSettings } from "./commands/settings";
import { Back, Start } from "./commands/start";
import { interceptTelegramMethods } from "./utils/local";

const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) {
  throw new Error("Missing Env Variable: 'BOT_TOKEN'");
}

export const FIXED_COMMANDS = [Start, Settings];

export const bot = new TelegramBot(BOT_TOKEN, {
  webHook: false,
  polling: false,
});

// For local development replace api methods
interceptTelegramMethods();

export type Command = () => {
  command: string;
  description: string;
  regex: RegExp;
  handler: (
    msg: TelegramBot.Message,
    match: RegExpMatchArray | null
  ) => Promise<void>;
};

const errorResponse = (chatId: number) => (error: any) =>
  bot.sendMessage(chatId, `Error: ${error}`);

export const generateBot = (callback: () => void) => {
  const commands = [
    Start(),
    Back(),
    Settings(),
    ModuleSettings(),
    UserSettings(),
    Lifx(),
    Hue(),
    Fritz(),
  ];

  bot.clearTextListeners();
  bot.removeAllListeners("sticker");
  bot.removeAllListeners("callback_query");

  bot.onText(new RegExp(""), async (msg, defaultMatch) => {
    const { text } = msg;

    let match: RegExpMatchArray | null = defaultMatch;

    const command = commands.find((cmd) => {
      if (!text) {
        return;
      }

      match = text.match(cmd.regex);

      return Boolean(match);
    });

    if (command) {
      await command.handler(msg, match).catch(errorResponse(msg.chat.id));
      return callback();
    }

    if (msg.reply_to_message) {
      await replyToReply(msg).catch(errorResponse(msg.chat.id));
      return callback();
    }

    await bot.sendMessage(msg.chat.id, "👻");
    callback();
  });

  bot.on("sticker", async ({ chat }) => {
    await bot.sendMessage(chat.id, "😎");
    callback();
  });

  bot.on("callback_query", async (cbQuery) => {
    await replyToButtons(cbQuery).catch((e) => {
      if (!cbQuery.message) {
        return;
      }

      bot.sendMessage(cbQuery.message.chat.id, `callback_query: ${e}`);
    });

    callback();
  });

  return bot;
};
