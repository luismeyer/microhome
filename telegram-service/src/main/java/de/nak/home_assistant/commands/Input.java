package de.nak.home_assistant.commands;

import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.model.Message;
import com.pengrad.telegrambot.model.request.InlineKeyboardButton;
import com.pengrad.telegrambot.model.request.InlineKeyboardMarkup;
import com.pengrad.telegrambot.request.DeleteMessage;
import com.pengrad.telegrambot.request.GetChat;
import com.pengrad.telegrambot.request.SendMessage;
import com.pengrad.telegrambot.request.UnpinChatMessage;
import com.pengrad.telegrambot.response.GetChatResponse;
import de.nak.home_assistant.actions.DeviceAction;
import de.nak.home_assistant.models.telegram.CallbackData;

public class Input {

    private final TelegramBot bot;

    public Input(TelegramBot bot) {
        this.bot = bot;
    }

    private void sendError(long chatId) {
        SendMessage msg = new SendMessage(chatId, "Ich weiß nicht was ich tun soll");
        bot.execute(msg);
    }

    public void replyToReply(Message reply) {
        long chatId = reply.chat().id();

        if (reply.replyToMessage() == null) {
            sendError(chatId);
            return;
        }

        // Delete input hint
        bot.execute(new DeleteMessage(chatId, reply.replyToMessage().messageId()));

        GetChatResponse chatResponse = bot.execute(new GetChat(chatId));
        Message originalMessage = chatResponse.chat().pinnedMessage();

        if (originalMessage == null) {
            sendError(chatId);
            return;
        }

        bot.execute(new UnpinChatMessage(chatId).messageId(originalMessage.messageId()));

        InlineKeyboardMarkup markup = originalMessage.replyMarkup();
        if (markup == null
                || markup.inlineKeyboard() == null
                || markup.inlineKeyboard()[0].length == 0
                || markup.inlineKeyboard()[0][0] == null) {

            sendError(chatId);
            return;
        }

        InlineKeyboardButton button = markup.inlineKeyboard()[0][0];
        String cbString = button.callbackData();
        CallbackData cbData = new CallbackData().fromJson(cbString);

        long userId = reply.from().id();
        DeviceAction.generateMessages(userId, chatId, cbData, originalMessage, reply.text())
                .forEach(bot::execute);
    }
}
