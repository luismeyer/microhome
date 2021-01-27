import { Message } from "node-telegram-bot-api";
import { sendDeviceList } from "../actions/device-list";
import bot from "../bot";
import { i18n } from "../i18n";
import { findModuleByName } from "../services/module";
import { setToken } from "../services/user";
import { Command } from "../telegram/command";

export const Fritz: Command = {
  name: "fritz",
  description: "Öffnet das Fritz Gerätemenü",
};

export const replyToFritz = async (
  { from, chat }: Message,
  match: RegExpExecArray
) => {
  const translations = await i18n(from.id);

  const module = await findModuleByName(Fritz.name);

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
          return bot.sendMessage(chat.id, translations.fritz.tokenUpdate);
        })
        .catch(() => bot.sendMessage(chat.id, translations.fritz.tokenError));
    }

    if (tokenSuccess || !hasArgs) {
      return sendDeviceList(from.id, chat.id, module.id);
    }
  }

  return bot.sendMessage(chat.id, translations.fritz.moduleError);
};
