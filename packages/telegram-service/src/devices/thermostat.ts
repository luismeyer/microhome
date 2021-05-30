import { InlineKeyboardButton } from "node-telegram-bot-api";
import { Device } from "@microhome/types";
import { i18n } from "../i18n";
import { createCallbackData } from "../services/callback-data";

export const thermostatToString = ({
  name,
  on,
  temperatur,
  istTemperatur,
  sollTemperatur,
}: Device): string => {
  const translations = i18n();

  const nameString = `🔥 ${translations.devices.thermostat}: ${name}\n`;
  const statusString =
    (on ? "⚪️" : "⚫️") +
    ` ${translations.devices.status}: ${
      on ? translations.devices.on : translations.devices.off
    }\n`;
  const tempString = `🌡 ${translations.devices.temperature}: ${temperatur}°C\n`;
  const temp2String = `📊 ${translations.devices.is}: ${istTemperatur}°C, ${translations.devices.should}: ${sollTemperatur}°C`;

  return nameString + statusString + tempString + temp2String;
};

export const thermostatToInlineButton = async (
  { id, on, istTemperatur, name }: Device,
  moduleId: number
): Promise<InlineKeyboardButton> => {
  const cbData = await createCallbackData({
    action: "SELECT_DEVICE",
    moduleId,
    deviceId: id,
  });

  return {
    text: `${on ? "⚪️" : "⚫️"} ${name} (${istTemperatur}°C)`,
    callback_data: JSON.stringify(cbData.id),
  };
};
