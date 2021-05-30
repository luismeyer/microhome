import {
  InlineKeyboardButton,
  Message,
  ReplyKeyboardMarkup,
  SendMessageOptions,
} from "node-telegram-bot-api";
import { bot, Command } from "../bot";
import { i18n, translations } from "../i18n";
import { generateSwitch } from "../keyboard";
import { getModules } from "../services/module";
import { hasModule } from "../services/user";
import { createCallbackData } from "../services/callback-data";
import { Back } from "./start";
import { SetLanguageModuleCallBackDataDetails } from "@microhome/types/src";

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

        const callbackData = await createCallbackData({
          moduleId: module.id,
          action: userHasModule ? "DEACTIVATE_MODULE" : "ACTIVATE_MODULE",
        });

        const options: SendMessageOptions = {
          reply_markup: {
            inline_keyboard: [[generateSwitch(userHasModule, callbackData.id)]],
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
  const buttons: InlineKeyboardButton[] = await Promise.all(
    translations.map(async (t) => {
      const data: Omit<SetLanguageModuleCallBackDataDetails, "id"> = {
        action: "SET_LANGUAGE",
        data: t().languageName,
      };

      const callbackData = await createCallbackData(data);

      return {
        text: t().languageName,
        callback_data: callbackData.id,
      };
    })
  );

  await bot.sendMessage(chat.id, i18n().settings.user.languagePrompt, {
    reply_markup: { inline_keyboard: [buttons] },
  });
};
