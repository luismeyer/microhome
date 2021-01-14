package de.nak.home_assistant.commands;

import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.model.CallbackQuery;
import com.pengrad.telegrambot.request.AnswerCallbackQuery;
import com.pengrad.telegrambot.request.BaseRequest;
import com.pengrad.telegrambot.request.SendMessage;
import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.actions.DeviceAction;
import de.nak.home_assistant.actions.DeviceSelect;
import de.nak.home_assistant.actions.ModuleToggle;
import de.nak.home_assistant.models.telegram.CallbackActions;
import de.nak.home_assistant.models.telegram.CallbackData;
import java.util.ArrayList;
import java.util.List;

public class Callback {

    private final TelegramBot bot;

    public Callback(TelegramBot bot) {
        this.bot = bot;
    }

    public void replyToButtons(CallbackQuery callbackQuery) {
        long chatId = callbackQuery.message().chat().id();
        long userId = callbackQuery.from().id();
        CallbackData cbData = new CallbackData().fromJson(callbackQuery.data());
        List<BaseRequest<?, ?>> messages = new ArrayList<>();

        switch (cbData.getAction()) {
            case CallbackActions.SELECT_DEVICE:
                messages.add(DeviceSelect.generateMessage(userId, chatId, cbData));
                break;
            case CallbackActions.ACTION_DEVICE:
                messages.addAll(DeviceAction.generateMessages(userId, chatId, cbData, callbackQuery.message(), null));
                break;
            case CallbackActions.ACTIVATE_MODULE:
                messages.add(ModuleToggle.generateMessage(userId, chatId, cbData, true));
                break;
            case CallbackActions.DEACTIVATE_MODULE:
                messages.add(ModuleToggle.generateMessage(userId, chatId, cbData, false));
                break;
            default:
                SendMessage message = CustomKeyboard.generateMessageWithKeyboard(userId, chatId, "Etwas fehlt");
                messages.add(message);
        }

        messages.forEach(bot::execute);

        bot.execute(new AnswerCallbackQuery(callbackQuery.id()));
    }
}
