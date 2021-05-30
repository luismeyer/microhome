import { SetLanguageData } from "@microhome/types";
import { bot } from "../bot";
import { i18n } from "../i18n";
import { settingsKeyboardMarkup } from "../keyboard";
import { updateUser } from "../services/user";
import { setState, state } from "../utils/state";

export const sendSetLanguage = async (
  userId: number,
  chatId: number,
  { data }: SetLanguageData
) => {
  let language = i18n();

  if (!data) {
    return bot.sendMessage(chatId, language.setLanguage.missingData);
  }

  const success = await updateUser(userId, { language: data });
  if (success) {
    setState({
      ...state,
      language: data,
    });

    language = i18n();

    return bot.sendMessage(
      chatId,
      language.setLanguage.success,
      settingsKeyboardMarkup()
    );
  } else {
    return bot.sendMessage(chatId, language.setLanguage.error);
  }
};
