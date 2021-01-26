import TelegramBot from "node-telegram-bot-api";
import { replyToButtons } from "./commands/callback";
import { Fritz, replyToFritz } from "./commands/fritz";
import { Hue, replyToHue } from "./commands/hue";
import { replyToReply } from "./commands/input";
import { Lifx, replyToLifx } from "./commands/lifx";
import { replyToSettings, Settings } from "./commands/settings";
import { replyToStart, Start } from "./commands/start";
import { callback } from "./handler";

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
  await replyToStart(msg).catch((e) =>
    bot.sendMessage(msg.chat.id, "Error replying to Start " + e)
  );
  callback();
});

bot.onText(new RegExp(`/?${Settings.name}`), async (msg) => {
  await replyToSettings(msg).catch((e) =>
    bot.sendMessage(msg.chat.id, "Error replying to Settings " + e)
  );
  callback();
});

bot.onText(new RegExp(`/?${Lifx.name} ?(.+)?`), async (msg, match) => {
  await replyToLifx(msg, match).catch((e) =>
    bot.sendMessage(msg.chat.id, "Error replying to Lifx " + e)
  );
  callback();
});

bot.onText(new RegExp(`/?${Hue.name}`), async (msg) => {
  await replyToHue(msg).catch((e) =>
    bot.sendMessage(msg.chat.id, "Error replying to Hue " + e)
  );
  callback();
});

bot.onText(new RegExp(`/?${Fritz.name} ?(.+)?`), async (msg, match) => {
  await replyToFritz(msg, match).catch((e) =>
    bot.sendMessage(msg.chat.id, "Error replying to Fritz " + e)
  );
  callback();
});

bot.on("callback_query", async (cbQuery) => {
  await replyToButtons(cbQuery).catch((e) =>
    bot.sendMessage(
      cbQuery.message.chat.id,
      "Error replying to callback_query " + e
    )
  );
  callback();
});

bot.onText(new RegExp(""), async (msg) => {
  await replyToReply(msg).catch((e) =>
    bot.sendMessage(msg.chat.id, "Error replying to text " + e)
  );
  callback();
});

bot.on("pinned_message", () => callback());

export default bot;
