import { Message } from "node-telegram-bot-api";
import { sendDeviceList } from "../actions/device-list";
import { bot, Command } from "../bot";
import { i18n } from "../i18n";
import { findModuleByName } from "../services/module";
import { setToken } from "../services/user";

export const Lifx: Command = () => {
  const { lifx } = i18n();

  return {
    command: lifx.name,
    regex: new RegExp(`/?${lifx.name} ?(.+)?`),
    description: lifx.description,
    handler: async (msg, match) => {
      if (!match) {
        return;
      }

      return replyToLifx(msg, match);
    },
  };
};

export const replyToLifx = async (
  { chat, from }: Message,
  match: RegExpMatchArray
): Promise<void> => {
  if (!from) {
    return;
  }

  const translations = i18n();

  const module = await findModuleByName(Lifx.name);
  if (!module) {
    return;
  }

  const hasArgs = Boolean(match[1]);
  let tokenSuccess = false;

  if (hasArgs) {
    await setToken(from.id, module.id, match[1])
      .then(() => {
        tokenSuccess = true;
        return bot.sendMessage(chat.id, translations.lifx.tokenUpdate);
      })
      .catch(() => bot.sendMessage(chat.id, translations.lifx.tokenError));
  }

  if (tokenSuccess || !hasArgs) {
    await sendDeviceList(from.id, chat.id, module.id);
  }
};
