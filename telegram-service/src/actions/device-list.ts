import bot from "../bot";
import { generateDeviceButtons } from "../keyboard";
import { makeServiceRequest } from "../services/service";
import { DeviceListResponse } from "../services/typings";
import { getUserModule } from "../services/user";

export const sendDeviceList = (
  userId: number,
  chatId: number,
  moduleId: number
) =>
  getUserModule(userId, moduleId).then((module) => {
    if (module) {
      return makeServiceRequest<DeviceListResponse>(module.serviceRequest)
        .then(({ success, result, error }) => {
          if (success) {
            const partitionSize = 3;

            // Partition the DeviceList so each row has 3 Buttons max
            const devices = new Array(Math.ceil(result.length / partitionSize))
              .fill([])
              .map(() => result.splice(0, partitionSize));

            return bot.sendMessage(
              chatId,
              "Deine " + module.name + " Geräte:",
              {
                reply_markup: generateDeviceButtons(devices, moduleId),
              }
            );
          }

          return bot.sendMessage(
            chatId,
            "Etwas hat nicht funktioniert: " + error
          );
        })
        .catch((e) =>
          bot.sendMessage(chatId, "Couldn't generate Devicelist " + e)
        );
    }

    return bot.sendMessage(chatId, "Du hast dieses Modul nicht abonniert");
  });
