import {
  InlineKeyboardButton,
  InlineKeyboardMarkup,
  KeyboardButton,
  ReplyKeyboardMarkup,
  SendMessageOptions,
} from "node-telegram-bot-api";
import {
  ActionDeviceCallBackDataDetails,
  Device,
  ModuleFunction,
  ModuleResponse,
} from "@microhome/types";
import { FIXED_COMMANDS } from "./bot";
import { deviceToInlineButton } from "./devices";
import { getUserModules } from "./services/user";
import { createCallbackData } from "./services/callback-data";

export const generateMarkup = (
  moduleResponses: ModuleResponse[]
): ReplyKeyboardMarkup => {
  const row1: KeyboardButton[] =
    moduleResponses && moduleResponses.length
      ? moduleResponses.map((module) => ({ text: module.name }))
      : [];

  const row2: KeyboardButton[] = FIXED_COMMANDS.map((command) => ({
    text: command().command,
  }));

  return {
    keyboard: [row1, row2],
  };
};

export const generateDeviceButtons = async (
  devices: Device[][],
  moduleId: number
): Promise<InlineKeyboardMarkup> => {
  const inlineKeyboard = await Promise.all(
    devices.map((row) =>
      Promise.all(row.map((device) => deviceToInlineButton(device, moduleId)))
    )
  );

  return {
    inline_keyboard: inlineKeyboard,
  };
};

export const generateFunctionButtons = async (
  functions: ModuleFunction[],
  deviceId: string,
  moduleId: number
): Promise<InlineKeyboardMarkup> => {
  const row: InlineKeyboardButton[] = await Promise.all(
    functions.map(async (func) => {
      const data: Omit<ActionDeviceCallBackDataDetails, "id"> = {
        action: "ACTION_DEVICE",
        moduleId,
        deviceId,
        data: func,
      };

      const cbData = await createCallbackData(data);

      return {
        callback_data: cbData.id,
        text: func.name,
      };
    })
  );

  return {
    inline_keyboard: [row],
  };
};

export const generateSendMessageOptions = async (
  userId: number
): Promise<SendMessageOptions> =>
  getUserModules(userId).then((modules) => ({
    reply_markup: modules && generateMarkup(modules),
  }));

export const generateSwitch = (
  on: boolean,
  cbDataId: string
): InlineKeyboardButton => ({
  text: on ? "deaktivieren" : "aktivieren",
  callback_data: cbDataId,
});
