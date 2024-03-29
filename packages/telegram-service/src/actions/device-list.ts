import { Device, DeviceListResponse } from "@microhome/types";
import { InlineKeyboardMarkup } from "node-telegram-bot-api";
import { deviceToInlineButton } from "../devices";
import { bot } from "../bot";
import { i18n } from "../i18n";

import { makeServiceRequest } from "../services/service";
import { getUserModule } from "../services/user";

const generateDeviceButtons = async (
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

export const sendDeviceList = async (
  userId: number,
  chatId: number,
  moduleId: number
) => {
  const module = await getUserModule(userId, moduleId);
  const translations = i18n();

  if (module) {
    const { success, result, error } =
      await makeServiceRequest<DeviceListResponse>(module.serviceRequest);

    if (success) {
      const partitionSize = 3;

      // Partition the DeviceList so each row has 3 Buttons max
      const devices = new Array(Math.ceil(result.length / partitionSize))
        .fill([])
        .map(() => result.splice(0, partitionSize));

      return bot.sendMessage(
        chatId,
        translations.deviceList.title(module.name),
        {
          reply_markup: await generateDeviceButtons(devices, moduleId),
        }
      );
    }

    return bot.sendMessage(chatId, `${translations.internalError}: ${error}`);
  }

  return bot.sendMessage(chatId, translations.deviceList.error);
};
