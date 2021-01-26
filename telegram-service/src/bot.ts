import TelegramBot from "node-telegram-bot-api";
import { replyToLifx } from "./commands/lifx";
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

bot.onText(/\/?start/, replyToStart);

bot.onText(/\/?einstellungen/, replyToSettings);

bot.onText(/\/?lifx ?(.+)?/, replyToLifx);

export default bot;
