package de.nak.home_assistant.commands;

import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.actions.DeviceAction;
import de.nak.home_assistant.models.telegram.CallbackData;
import org.telegram.abilitybots.api.sender.MessageSender;
import org.telegram.telegrambots.meta.api.methods.groupadministration.GetChat;
import org.telegram.telegrambots.meta.api.methods.pinnedmessages.UnpinChatMessage;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.DeleteMessage;
import org.telegram.telegrambots.meta.api.objects.Chat;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

public class Input {

    private final MessageSender sender;

    public Input(MessageSender sender) {
        this.sender = sender;
    }

    private void sendError(long chatId) throws TelegramApiException {
        SendMessage msg = CustomKeyboard.generateDefaultMessage(chatId);
        msg.setText("Ich weiß nicht was ich tun soll");
        sender.execute(msg);
    }

    public void replyToReply(Message reply) throws TelegramApiException {
        long chatId = reply.getChatId();
        sender.execute(DeleteMessage
                .builder()
                .chatId(String.valueOf(chatId))
                .messageId(reply.getReplyToMessage().getMessageId())
                .build());

        if (!reply.isReply()) {
            sendError(chatId);
            return;
        }

        Chat chat = sender.execute(GetChat.builder().chatId(String.valueOf(chatId)).build());
        Message originalMessage = chat.getPinnedMessage();

        if (originalMessage == null) {
            sendError(chatId);
            return;
        }

        sender.execute(UnpinChatMessage
                .builder()
                .chatId(String.valueOf(chatId))
                .messageId(originalMessage.getMessageId())
                .build());

        InlineKeyboardMarkup markup = originalMessage.getReplyMarkup();
        if (markup == null
                || markup.getKeyboard() == null
                || markup.getKeyboard().get(0).size() == 0
                || markup.getKeyboard().get(0).get(0) == null) {

            sendError(chatId);
            return;
        }

        InlineKeyboardButton button = originalMessage.getReplyMarkup().getKeyboard().get(0).get(0);
        String cbString = button.getCallbackData();
        CallbackData cbData = new CallbackData().fromJson(cbString);

        long userId = reply.getFrom().getId();
        DeviceAction.generateMessages(userId, chatId, cbData, originalMessage, reply.getText())
                .forEach(m -> {
                    try {
                        sender.execute(m);
                    } catch (TelegramApiException e) {
                        e.printStackTrace();
                    }
                });
    }
}
