import { InlineKeyboardButton } from "node-telegram-bot-api";
import { Device } from "@microhome/types";
import { i18n } from "../i18n";
import { createCallbackData } from "../services/callback-data";

const colorToEmoji = (color: string): string => {
  if (!color) {
    return "⚪️";
  }

  switch (color.toLowerCase()) {
    case "red":
      return "🔴";
    case "orange":
      return "🟠";
    case "yellow":
    case "gold":
      return "🟡";
    case "green":
    case "lime":
      return "🟢";
    case "blue":
    case "blueviolet":
      return "🔵";
    case "purple":
    case "darkviolet":
      return "🟣";
    case "brown":
      return "🟤";
    default:
      return "⚪️";
  }
};

export const lampToString = ({ on, color, name }: Device): string => {
  const translations = i18n();

  const state = on ? translations.devices.on : translations.devices.off;
  const stateEmoji = on ? colorToEmoji(color) : "⚫️";

  return `💡 ${translations.devices.lamp}: ${name}\n${stateEmoji} ${translations.devices.status}: ${state}\n🖌 ${translations.devices.color}: ${color}`;
};

export const lampToInlineButton = async (
  { id, on, color, name }: Device,
  moduleId: number
): Promise<InlineKeyboardButton> => {
  const cbData = await createCallbackData({
    action: "SELECT_DEVICE",
    deviceId: id,
    moduleId,
  });

  return {
    text: (on ? colorToEmoji(color) + " " : "⚫️ ") + name,
    callback_data: cbData.id,
  };
};
