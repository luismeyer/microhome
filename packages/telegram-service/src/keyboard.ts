import {
  KeyboardButton,
  ReplyKeyboardMarkup,
  SendMessageOptions,
} from "node-telegram-bot-api";
import { FIXED_COMMANDS } from "./bot";
import { UserSettings, ModuleSettings } from "./commands/settings";
import { Back } from "./commands/start";
import { getUserModules } from "./services/user";

export const settingsKeyboardMarkup = () => {
  const keyboard: ReplyKeyboardMarkup = {
    keyboard: [
      [{ text: UserSettings().command }, { text: ModuleSettings().command }],
      [{ text: Back().command }],
    ],
  };

  return {
    reply_markup: keyboard,
  };
};

export const dashboardKeyboardMarkup = async (
  userId: number
): Promise<SendMessageOptions | undefined> => {
  const userModules = await getUserModules(userId);

  if (!userModules) {
    return;
  }

  const row1: KeyboardButton[] = userModules.length
    ? userModules.map((module) => ({ text: module.name }))
    : [];

  const row2: KeyboardButton[] = FIXED_COMMANDS.map((command) => ({
    text: command().command,
  }));

  return {
    reply_markup: {
      keyboard: [row1, row2],
    },
  };
};
