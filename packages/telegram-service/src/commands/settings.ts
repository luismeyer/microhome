import {
  InlineKeyboardButton,
  Message,
  ReplyKeyboardMarkup,
  SendMessageOptions,
} from "node-telegram-bot-api";
import { CallbackData } from "@telegram-home-assistant/types";
import { bot, Command } from "../bot";
import { i18n, translations } from "../i18n";
import { generateSwitch } from "../keyboard";
import { getModules } from "../services/module";
import { hasModule } from "../services/user";
import {
  ACTIVATE_MODULE,
  DEACTIVATE_MODULE,
  SET_LANGUAGE,
} from "../telegram/callback-actions";
import { createCallbackData } from "../telegram/callback-data";
import { Back } from "./start";

export const Settings: Command = () => {
  const { settings } = i18n();

  return {
    command: settings.name,
    regex: new RegExp(`/?${settings.name}`),
    description: settings.description,
    handler: replyToSettings,
  };
};

export const UserSettings: Command = () => {
  const { settings } = i18n();

  return {
    command: settings.user.name,
    regex: new RegExp(`/?${settings.user.name}`),
    description: settings.user.description,
    handler: replyToUserSettings,
  };
};

export const ModuleSettings: Command = () => {
  const { settings } = i18n();

  return {
    command: settings.module.name,
    regex: new RegExp(`/?${settings.module.name}`),
    description: settings.module.description,
    handler: replyToModuleSettins,
  };
};

export const replyToSettings = async ({ chat }: Message): Promise<void> => {
  const translations = i18n();

  const keyboard: ReplyKeyboardMarkup = {
    keyboard: [
      [{ text: UserSettings().command }, { text: ModuleSettings().command }],
      [{ text: Back().command }],
    ],
  };

  await bot.sendMessage(chat.id, translations.settings.pickPrompt, {
    reply_markup: keyboard,
  });
};

export const replyToModuleSettins = async ({
  from,
  chat,
}: Message): Promise<void> => {
  if (!from) {
    return;
  }

  const translations = i18n();
  const { id } = from;

  const modules = await getModules().catch((e) => {
    bot.sendMessage(chat.id, `${translations.settings.module.error}: ${e}`);
  });

  if (modules) {
    await Promise.all(
      modules.map(async (module) => {
        const userHasModule = await hasModule(id, module.id);

        const action = userHasModule ? DEACTIVATE_MODULE : ACTIVATE_MODULE;
        const cb = createCallbackData(module.id, "", action);

        const options: SendMessageOptions = {
          reply_markup: {
            inline_keyboard: [[generateSwitch(userHasModule, cb)]],
          },
        };

        return bot.sendMessage(
          chat.id,
          translations.settings.module.module + ": " + module.name,
          options
        );
      })
    );
  }
};

export const replyToUserSettings = async ({ chat }: Message) => {
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

  await bot.sendMessage(chat.id, i18n().settings.user.languagePrompt, {
    reply_markup: { inline_keyboard: [buttons] },
  });
};
