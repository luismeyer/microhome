import { AuthResponse, CallbackData } from "telegram-home-assistant-types";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { generateSendMessageOptions } from "../keyboard";
import { makeServiceRequest } from "../services/service";
import { activateModule, deactivateModule } from "../services/user";
import { getCallbackDataId } from "../telegram/callback-data";

export const sendModuleToggle = async (
  userId: number,
  chatId: number,
  cbData: CallbackData,
  activate: boolean
) => {
  const translations = i18n();

  const { moduleId } = getCallbackDataId(cbData);
  let text;

  if (activate) {
    const serviceRequest = await activateModule(userId, moduleId);
    const { error, success, result } = await makeServiceRequest<AuthResponse>(
      serviceRequest
    );

    text = success ? result : `${translations.moduleToggle.error} ${error}`;
  } else {
    const success = await deactivateModule(userId, moduleId);
    text = success
      ? translations.moduleToggle.success
      : translations.moduleToggle.error;
  }

  return bot.sendMessage(
    userId,
    text,
    await generateSendMessageOptions(userId)
  );
};
