import { InlineKeyboardButton } from "node-telegram-bot-api";
import { lampToInlineButton, lampToString } from "./lamp";
import { thermostatToInlineButton, thermostatToString } from "./thermostat";

export type Device = {
  id: string;
  on: boolean;
  name: string;
  type: "LAMP" | "THERMOSTAT";

  // Lamp Attributes
  color: string;

  // Thermostat Attributes
  temperatur: number;
  istTemperatur: number;
  sollTemperatur: number;
};

export const deviceToString = (device: Device): Promise<string> => {
  if (device.type === "THERMOSTAT") {
    return thermostatToString(device);
  }

  if (device.type === "LAMP") {
    return lampToString(device);
  }

  return Promise.resolve("WRONG DEVICE ID");
};

export const deviceToInlineButton = (
  device: Device,
  moduleId: number
): InlineKeyboardButton => {
  if (device.type === "THERMOSTAT") {
    return thermostatToInlineButton(device, moduleId);
  }

  if (device.type === "LAMP") {
    return lampToInlineButton(device, moduleId);
  }

  return undefined;
};
