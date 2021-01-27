import bot from "../bot";
import { i18n } from "../i18n";
import { generateDeviceButtons } from "../keyboard";
import { makeServiceRequest } from "../services/service";
import { DeviceListResponse } from "../services/typings";
import { getUserModule } from "../services/user";

export const sendDeviceList = async (
  userId: number,
  chatId: number,
  moduleId: number
) => {
  const module = await getUserModule(userId, moduleId);
  const translations = await i18n(userId);

  if (module) {
    const {
      success,
      result,
      error,
    } = await makeServiceRequest<DeviceListResponse>(module.serviceRequest);

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
          reply_markup: generateDeviceButtons(devices, moduleId),
        }
      );
    }

    return bot.sendMessage(chatId, `${translations.internalError}: ${error}`);
  }

  return bot.sendMessage(chatId, translations.deviceList.error);
};
