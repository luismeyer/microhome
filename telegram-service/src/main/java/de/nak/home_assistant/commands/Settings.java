package de.nak.home_assistant.commands;

import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.model.Update;
import com.pengrad.telegrambot.model.request.InlineKeyboardMarkup;
import com.pengrad.telegrambot.request.SendMessage;
import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.models.database.ModuleResponse;
import de.nak.home_assistant.models.telegram.CallbackActions;
import de.nak.home_assistant.models.telegram.CallbackData;
import de.nak.home_assistant.models.telegram.Command;
import de.nak.home_assistant.services.database.ModuleService;
import de.nak.home_assistant.services.database.UserService;

import java.util.List;
import java.util.stream.Collectors;

public class Settings extends Command {

    private final TelegramBot bot;

    public Settings(TelegramBot bot) {
        this.bot = bot;
        this.name = "einstellungen";
        this.description = "Öffnet das Konfigurationsmenü";
    }

    public Settings() {
        this(null);
    }

    public void reply(Update update) {
        long userId = update.message().from().id();
        long chatId = update.message().chat().id();

        UserService userService = new UserService(userId);

        ModuleService moduleService = new ModuleService();
        List<ModuleResponse> modules = moduleService.getModules();

        List<SendMessage> messages = modules.stream()
                .map(module -> {
                    boolean userHasModule = userService.hasModule(module.getId());

                    int action = userHasModule ? CallbackActions.DEACTIVATE_MODULE : CallbackActions.ACTIVATE_MODULE;
                    CallbackData cb = new CallbackData().setAction(action).setId(module.getId(), null);

                    InlineKeyboardMarkup markup = new InlineKeyboardMarkup(CustomKeyboard.generateSwitch(userHasModule, cb));

                    return new SendMessage(chatId, "Modul: " + module.getName()).replyMarkup(markup);
                })
                .collect(Collectors.toList());

        messages.forEach(bot::execute);

    }
}
