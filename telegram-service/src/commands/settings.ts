import {
  InlineKeyboardButton,
  InlineKeyboardMarkup,
  Message,
  ReplyKeyboardMarkup,
} from "node-telegram-bot-api";
import { bot } from "../bot";
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

export const Settings: Command = () => {
  const translations = i18n();

  return {
    command: translations.settings.name,
    description: translations.settings.description,
  };
};

export const UserSettings: Command = () => {
  const translations = i18n();

  return {
    command: translations.settings.user.name,
    description: translations.settings.user.description,
  };
};

export const ModuleSettings: Command = () => {
  const translations = i18n();

  return {
    command: translations.settings.module.name,
    description: translations.settings.module.description,
  };
};

export const replyToSettings = async ({ chat }: Message) => {
  const translations = i18n();

  const keyboard: ReplyKeyboardMarkup = {
    keyboard: [
      [{ text: UserSettings().command }, { text: ModuleSettings().command }],
      [{ text: Back().command }],
    ],
  };

  return bot.sendMessage(chat.id, translations.settings.pickPrompt, {
    reply_markup: keyboard,
  });
};

export const replyToModuleSettins = async ({ from, chat }: Message) => {
  const translations = i18n();
  const { id } = from;

  const modules = await getModules().catch((e) => {
    bot.sendMessage(chat.id, `${translations.settings.module.error}: ${e}`);
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

  return bot.sendMessage(chat.id, i18n().settings.user.languagePrompt, {
    reply_markup: { inline_keyboard: [buttons] },
  });
};
