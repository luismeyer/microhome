import { Message } from "node-telegram-bot-api";
import { sendDeviceList } from "../actions/device-list";
import bot from "../bot";
import { findModuleByName } from "../services/module";
import { setToken } from "../services/user";
import { Command } from "../telegram/command";

export const Fritz: Command = {
  name: "fritz",
  description: "Öffnet das Fritz Gerätemenü",
};

export const replyToFritz = ({ from, chat }: Message, match: RegExpExecArray) =>
  findModuleByName(Fritz.name)
    .then(async (module) => {
      if (module) {
        const hasArgs = Boolean(match[1]);
        let tokenSuccess = false;

        if (hasArgs) {
          await setToken(
            from.id,
            module.id,
            Buffer.from(match[1]).toString("base64")
          )
            .then(() => {
              tokenSuccess = true;
              return bot.sendMessage(chat.id, "Lifx-Token wurde geupdated 🥳");
            })
            .catch(() => bot.sendMessage(chat.id, "Fehler beim Tokenupdate"));
        }

        if (tokenSuccess || !hasArgs) {
          return sendDeviceList(from.id, chat.id, module.id);
        }
      }

      return bot.sendMessage(chat.id, "Falche Modul Id");
    })
    .catch((e) => bot.sendMessage(chat.id, "Interner Fehler " + e));
