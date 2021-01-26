import { Message } from "node-telegram-bot-api";
import { sendDeviceList } from "../actions/device-list";
import bot from "../bot";
import { findModuleByName } from "../services/module";
import { setToken } from "../services/user";
import { Command } from "../telegram/command";

export const Settings: Command = {
  name: "lifx",
  description: "Öffnet das Lifx  Gerätemenü",
};

export const replyToLifx = async (
  { chat, from }: Message,
  match: RegExpExecArray
) =>
  findModuleByName(Settings.name)
    .then(async (module) => {
      const hasArgs = Boolean(match[1]);
      let tokenSuccess = false;

      if (hasArgs) {
        await setToken(from.id, module.id, match[1])
          .then(() => {
            tokenSuccess = true;
            return bot.sendMessage(chat.id, "Lifx-Token wurde geupdated 🥳");
          })
          .catch(() => bot.sendMessage(chat.id, "Fehler beim Tokenupdate"));
      }

      if (tokenSuccess || hasArgs) {
        return sendDeviceList(from.id, chat.id, module.id);
      }
    })
    .catch((e) => bot.sendMessage(chat.id, "Interner Fehler " + e));
