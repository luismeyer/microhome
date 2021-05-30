import { InlineKeyboardButton } from "node-telegram-bot-api";
import { Device } from "@microhome/types";
import { lampToInlineButton, lampToString } from "./lamp";
import { thermostatToInlineButton, thermostatToString } from "./thermostat";

export const deviceToString = (device: Device): string => {
  if (device.type === "THERMOSTAT") {
    return thermostatToString(device);
  }

  if (device.type === "LAMP") {
    return lampToString(device);
  }

  return "WRONG DEVICE ID";
};

export const deviceToInlineButton = async (
  device: Device,
  moduleId: number
): Promise<InlineKeyboardButton> => {
  if (device.type === "THERMOSTAT") {
    return thermostatToInlineButton(device, moduleId);
  }

  return lampToInlineButton(device, moduleId);
};
