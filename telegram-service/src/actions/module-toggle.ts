import bot from "../bot";
import { generateSendMessageOptions } from "../keyboard";
import { makeServiceRequest } from "../services/service";
import { AuthResponse } from "../services/typings";
import { activateModule, deactivateModule } from "../services/user";
import { CallbackData, getCallbackDataId } from "../telegram/callback-data";

export const sendModuleToggle = async (
  userId: number,
  chatId: number,
  cbData: CallbackData,
  activate: boolean
) => {
  const { moduleId } = getCallbackDataId(cbData);
  let text;

  if (activate) {
    const serviceRequest = await activateModule(userId, moduleId);
    const { error, success, result } = await makeServiceRequest<AuthResponse>(
      serviceRequest
    );

    text = success ? result : "Etwas ist schiefgegangen " + error;
  } else {
    const success = await deactivateModule(userId, moduleId);
    text = success ? "Modul deaktiviert" : "Etwas ist schiefgegangen";
  }

  return bot.sendMessage(
    userId,
    text,
    await generateSendMessageOptions(userId)
  );
};
