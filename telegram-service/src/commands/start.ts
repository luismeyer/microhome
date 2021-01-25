import { Message } from "node-telegram-bot-api";
import bot from "../bot";
import { generateMessageWithKeyboard } from "../keyboard";
import { createUser } from "../services/user";
import { Command } from "../telegram/command";
import { Settings } from "./settings";

export const Start: Command = {
  name: "start",
  description: "Startet den Bot",
};

export const replyToStart = async ({ chat, from }: Message) => {
  const success = await createUser(from.id);

  const text = success
    ? "🚀 Willkommen beim Home Assistant Bot" +
      "\n\n⚙️ Als nächstes kannst du mit dem '" +
      Settings.name +
      "' Kommando deine Module verwalten." +
      "\n🏁 Wenn du schon Module hinzugfügt hast kannst du auch direkt loslegen in dem du diese im Menü auswählst"
    : "Fehler beim Anmelden. Versuch es später erneut. :)";

  return generateMessageWithKeyboard(from.id)
    .then((options) => bot.sendMessage(chat.id, text, options))
    .catch(() => bot.sendMessage(chat.id, text));
};
