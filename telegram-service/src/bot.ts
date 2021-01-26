import TelegramBot from "node-telegram-bot-api";
import { replyToButtons } from "./commands/callback";
import { Fritz, replyToFritz } from "./commands/fritz";
import { Hue, replyToHue } from "./commands/hue";
import { replyToReply } from "./commands/input";
import { Lifx, replyToLifx } from "./commands/lifx";
import { replyToSettings, Settings } from "./commands/settings";
import { replyToStart, Start } from "./commands/start";

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

bot.onText(new RegExp(`/?${Start.name}`), replyToStart);
bot.onText(new RegExp(`/?${Settings.name}`), replyToSettings);

bot.onText(new RegExp(`/?${Lifx.name} ?(.+)?`), replyToLifx);
bot.onText(new RegExp(`/?${Hue.name} ?(.+)?`), replyToHue);
bot.onText(new RegExp(`/?${Fritz.name} ?(.+)?`), replyToFritz);

bot.on("callback_query", replyToButtons);
bot.onText(new RegExp(""), replyToReply);

export default bot;
