import {
  InlineKeyboardButton,
  InlineKeyboardMarkup,
  Message,
  ReplyKeyboardMarkup,
} from "node-telegram-bot-api";
import bot from "../bot";
import { i18n, translations } from "../i18n";
import { generateSwitch } from "../keyboard";
import { getModules } from "../services/module";
import { hasModule } from "../services/user";
import {
  ACTIVATE_MODULE,
  DEACTIVATE_MODULE,
  SET_LANGUAGE,
} from "../telegram/callback-actions";
import { CallbackData, createCallbackData } from "../telegram/callback-data";
import { Command } from "../telegram/command";
import { Back } from "./start";

export const Settings: Command = {
  name: "einstellungen",
  description: "Öffnet das Konfigurationsmenü",
};

export const UserSettings: Command = {
  name: "benutzer",
  description: "Öffnet das Nutzermenü",
};

export const ModuleSettings: Command = {
  name: "module",
  description: "Öffnet das Modulemenü",
};

export const replyToSettings = async ({ chat, from }: Message) => {
  const translations = await i18n(from.id);

  const keyboard: ReplyKeyboardMarkup = {
    keyboard: [
      [{ text: UserSettings.name }, { text: ModuleSettings.name }],
      [{ text: Back.name }],
    ],
  };

  return bot.sendMessage(chat.id, translations.settings.pickPrompt, {
    reply_markup: keyboard,
  });
};

export const replyToModuleSettins = async ({ from, chat }: Message) => {
  const translations = await i18n(from.id);
  const { id } = from;

  const modules = await getModules().catch((e) => {
    bot.sendMessage(chat.id, `${translations.settings.moduleError}: ${e}`);
  });

  if (modules) {
    return Promise.all(
      modules.map(async (module) => {
        const userHasModule = await hasModule(id, module.id);

        const action = userHasModule ? DEACTIVATE_MODULE : ACTIVATE_MODULE;
        const cb = createCallbackData(module.id, "", action);

        const markup: InlineKeyboardMarkup = {
          inline_keyboard: [[generateSwitch(userHasModule, cb)]],
        };

        return bot.sendMessage(
          chat.id,
          translations.settings.module + ": " + module.name,
          {
            reply_markup: markup,
          }
        );
      })
    );
  }
};

export const replyToUserSettings = async ({ chat, from }: Message) => {
  const t = await i18n(from.id);

  const buttons: InlineKeyboardButton[] = translations.map((t) => {
    const cbData: CallbackData = {
      action: SET_LANGUAGE,
      data: t().languageName,
    };

    return {
      text: t().languageName,
      callback_data: JSON.stringify(cbData),
    };
  });

  return bot.sendMessage(chat.id, t.settings.languagePrompt, {
    reply_markup: { inline_keyboard: [buttons] },
  });
};
