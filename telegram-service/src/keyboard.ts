import {
  InlineKeyboardButton,
  InlineKeyboardMarkup,
  KeyboardButton,
  ReplyKeyboardMarkup,
  SendMessageOptions,
} from "node-telegram-bot-api";
import { FIXED_COMMANDS } from "./bot";
import { Device, deviceToInlineButton } from "./devices";
import { ModuleResponse } from "./services/typings";
import { getUserModules } from "./services/user";
import { ACTION_DEVICE } from "./telegram/callback-actions";
import { CallbackData, createCallbackData } from "./telegram/callback-data";

export const generateMarkup = (
  moduleResponses: ModuleResponse[]
): ReplyKeyboardMarkup => {
  const row1: KeyboardButton[] =
    moduleResponses && moduleResponses.length
      ? moduleResponses.map((module) => ({ text: module.name }))
      : [];

  const row2: KeyboardButton[] = FIXED_COMMANDS.map(({ name }) => ({
    text: name,
  }));

  return {
    keyboard: [row1, row2],
  };
};

export const generateDeviceButtons = (
  devices: Device[][],
  moduleId: number
): InlineKeyboardMarkup => ({
  inline_keyboard: devices.map((row) =>
    row.map((device) => deviceToInlineButton(device, moduleId))
  ),
});

export const generateFunctionButtons = (
  functions: string[],
  deviceId: string,
  moduleId: number
): InlineKeyboardMarkup => {
  const row: InlineKeyboardButton[] = functions.map((func) => ({
    callback_data: JSON.stringify(
      createCallbackData(moduleId, deviceId, ACTION_DEVICE, func)
    ),
    text: func,
  }));

  return {
    inline_keyboard: [row],
  };
};

export const generateSendMessageOptions = async (
  userId: number
): Promise<SendMessageOptions> =>
  getUserModules(userId).then((modules) => ({
    reply_markup: generateMarkup(modules),
  }));

export const generateSwitch = (
  on: boolean,
  cbData: CallbackData
): InlineKeyboardButton => ({
  text: on ? "deaktivieren" : "aktivieren",
  callback_data: JSON.stringify(cbData),
});
