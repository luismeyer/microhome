import { bot } from "../bot";
import { i18n } from "../i18n";
import { generateSendMessageOptions } from "../keyboard";
import { updateUser } from "../services/user";
import { CallbackData } from "../telegram/callback-data";
import { setState, state } from "../utils/state";

export const sendSetLanguage = async (
  userId: number,
  chatId: number,
  { data }: CallbackData
) => {
  let language = i18n();

  if (!data) {
    return bot.sendMessage(chatId, language.setLanguage.missingData);
  }

  const success = await updateUser(userId, data);
  if (success) {
    setState({
      ...state,
      language: data,
    });

    language = i18n();

    return bot.sendMessage(
      chatId,
      language.setLanguage.success,
      await generateSendMessageOptions(userId)
    );
  } else {
    return bot.sendMessage(chatId, language.setLanguage.error);
  }
};
