package de.nak.home_assistant.commands;

import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.actions.DeviceAction;
import de.nak.home_assistant.actions.DeviceSelect;
import de.nak.home_assistant.actions.ModuleToggle;
import de.nak.home_assistant.models.telegram.CallbackActions;
import de.nak.home_assistant.models.telegram.CallbackData;
import org.telegram.abilitybots.api.sender.MessageSender;
import org.telegram.telegrambots.meta.api.methods.AnswerCallbackQuery;
import org.telegram.telegrambots.meta.api.methods.BotApiMethod;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.CallbackQuery;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.ArrayList;
import java.util.List;

public class Callback {

    private final MessageSender sender;

    public Callback(MessageSender sender) {
        this.sender = sender;
    }

    public void replyToButtons(long chatId, CallbackQuery callbackQuery) {
        long userId = callbackQuery.getFrom().getId();
        CallbackData cbData = new CallbackData().fromJson(callbackQuery.getData());
        List<BotApiMethod<?>> messages = new ArrayList<>();

        SendMessage message = CustomKeyboard.generateMessageWithKeyboard(userId, chatId);

        switch (cbData.getAction()) {
            case CallbackActions.SELECT_DEVICE:
                messages.add(DeviceSelect.generateMessage(userId, chatId, cbData));
                break;
            case CallbackActions.ACTION_DEVICE:
                messages.addAll(DeviceAction.generateMessages(userId, chatId, cbData, callbackQuery.getMessage(), null));
                break;
            case CallbackActions.ACTIVATE_MODULE:
                messages.add(ModuleToggle.generateMessage(userId, chatId, cbData, true));
                break;
            case CallbackActions.DEACTIVATE_MODULE:
                messages.add(ModuleToggle.generateMessage(userId, chatId, cbData, false));
                break;
            default:
                message.setText("Etwas fehlt");
                messages.add(message);
        }

        messages.forEach(botApiMethod -> {
            try {
                sender.execute(botApiMethod);
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        });

        try {
            sender.execute(AnswerCallbackQuery
                    .builder()
                    .callbackQueryId(callbackQuery.getId())
                    .build());

        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }
}
