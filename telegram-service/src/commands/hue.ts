import { Message } from "node-telegram-bot-api";
import { sendDeviceList } from "../actions/device-list";
import bot from "../bot";
import { findModuleByName } from "../services/module";
import { Command } from "../telegram/command";

export const Hue: Command = {
  name: "hue",
  description: "Öffnet das Hue Gerätemenü",
};

export const replyToHue = ({ from, chat }: Message) =>
  findModuleByName(Hue.name)
    .then((module) => sendDeviceList(from.id, chat.id, module.id))
    .catch((e) => bot.sendMessage(chat.id, "Interner Fehler " + e));
