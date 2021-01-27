import { InlineKeyboardButton } from "node-telegram-bot-api";
import { i18n } from "../i18n";
import { SELECT_DEVICE } from "../telegram/callback-actions";
import { CallbackData, callbackDataId } from "../telegram/callback-data";
import { Device } from "./index";

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

export const lampToString = async ({
  on,
  color,
  name,
}: Device): Promise<string> => {
  const translations = await i18n();

  const state = on ? translations.devices.on : translations.devices.off;
  const stateEmoji = on ? colorToEmoji(color) : "⚫️";

  return `💡 ${translations.devices.lamp}: ${name}\n${stateEmoji} ${translations.devices.status}: ${state}\n🖌 ${translations.devices.color}: ${color}`;
};

export const lampToInlineButton = (
  { id, on, color, name }: Device,
  moduleId: number
): InlineKeyboardButton => {
  const cbData: CallbackData = {
    action: SELECT_DEVICE,
    id: callbackDataId(moduleId, id),
  };

  return {
    text: (on ? colorToEmoji(color) + " " : "⚫️ ") + name,
    callback_data: JSON.stringify(cbData),
  };
};
