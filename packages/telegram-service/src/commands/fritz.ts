import { Message } from "node-telegram-bot-api";
import { sendDeviceList } from "../actions/device-list";
import { bot, Command } from "../bot";
import { i18n } from "../i18n";
import { findModuleByName } from "../services/module";
import { setToken } from "../services/user";

export const Fritz: Command = () => {
  const { fritz } = i18n();

  return {
    command: fritz.name,
    regex: new RegExp(`/?${fritz.name} ?(.+)?`),
    description: fritz.description,
    handler: async (msg, match) => {
      if (!match) {
        return;
      }

      return replyToFritz(msg, match);
    },
  };
};

export const replyToFritz = async (
  { from, chat }: Message,
  match: RegExpMatchArray
): Promise<void> => {
  if (!from) {
    return;
  }

  const translations = i18n();

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
      await sendDeviceList(from.id, chat.id, module.id);
      return;
    }
  }

  await bot.sendMessage(chat.id, translations.fritz.moduleError);
};
