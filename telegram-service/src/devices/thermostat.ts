import { InlineKeyboardButton } from "node-telegram-bot-api";
import { Device } from ".";
import { SELECT_DEVICE } from "../telegram/callback-actions";
import { CallbackData, callbackDataId } from "../telegram/callback-data";

export const thermostatToString = ({
  name,
  on,
  temperatur,
  istTemperatur,
  sollTemperatur,
}: Device): string => {
  const nameString = `🔥 Heizung: ${name}\n`;
  const statusString = (on ? "⚪️" : "⚫️") + ` Status: ${on ? "on" : "off"}\n`;
  const tempString = `🌡 Temperatur: ${temperatur}°C\n`;
  const temp2String = `📊 Ist: ${istTemperatur}°C, Soll: ${sollTemperatur}°C`;

  return nameString + statusString + tempString + temp2String;
};

export const thermostatToInlineButton = (
  { id, on, istTemperatur, name }: Device,
  moduleId: number
): InlineKeyboardButton => {
  const cbData: CallbackData = {
    action: SELECT_DEVICE,
    id: callbackDataId(moduleId, id),
  };

  return {
    text: `${on ? "⚪️" : "⚫️"} ${name} (${istTemperatur}°C)`,
    callback_data: JSON.stringify(cbData),
  };
};
