import { AuthResponse, CallBackData } from "@microhome/types";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { dashboardKeyboardMarkup } from "../keyboard";
import { makeServiceRequest } from "../services/service";
import { activateModule, deactivateModule } from "../services/user";

export const sendModuleToggle = async (
  userId: number,
  cbData: CallBackData,
  activate: boolean
) => {
  const translations = i18n();

  const { moduleId } = cbData;

  if (!moduleId) {
    return;
  }

  let text;

  if (activate) {
    const serviceRequest = await activateModule(userId, moduleId);

    if (!serviceRequest) {
      return;
    }

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

  return bot.sendMessage(userId, text, await dashboardKeyboardMarkup(userId));
};
