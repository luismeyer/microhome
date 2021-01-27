import bot from "../bot";
import { updateUser } from "../services/user";
import { CallbackData } from "../telegram/callback-data";

export const sendSetLanguage = async (
  userId: number,
  chatId: number,
  { data }: CallbackData
) => {
  if (!data) {
    return bot.sendMessage(chatId, "Sprache fehlt");
  }

  const success = await updateUser(userId, data);
  if (success) {
    return bot.sendMessage(chatId, "Sprache wurde aktualisiert");
  } else {
    return bot.sendMessage(chatId, "Sprache konnte nicht aktualisiert werden");
  }
};
