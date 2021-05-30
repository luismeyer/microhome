import TelegramBot from "node-telegram-bot-api";
import { bot } from "../bot";

const { IS_OFFLINE } = process.env;

const telegramLog = (method: string, message: string) => {
  console.log(`TELEGRAM '${method}': ${message}`);
};

export const interceptTelegramMethods = () => {
  if (!IS_OFFLINE) {
    return;
  }

  bot.sendMessage = async (chatId, text, options) => {
    telegramLog(
      "sendMessage",
      `chatId: ${chatId}, text: ${text}, options: ${JSON.stringify(options)}`
    );

    return {
      message_id: 123,
      chat: {
        id: typeof chatId === "number" ? chatId : parseInt(chatId),
        type: "private",
      },
      date: new Date().getTime(),
    };
  };

  bot.answerCallbackQuery = async (
    callbackQueryId:
      | string
      | TelegramBot.AnswerCallbackQueryOptions
      | undefined,
    options?: TelegramBot.AnswerCallbackQueryOptions
  ) => {
    telegramLog("answerCallbackQuery", `args: ${callbackQueryId}, ${options}`);
    return true;
  };

  bot.deleteMessage = async (chatId, messageId) => {
    telegramLog("deleteMessage", `args: ${chatId}, ${messageId}`);
    return true;
  };
};
