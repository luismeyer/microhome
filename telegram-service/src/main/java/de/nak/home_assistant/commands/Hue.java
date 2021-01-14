package de.nak.home_assistant.commands;

import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.model.Update;
import com.pengrad.telegrambot.request.SendMessage;
import de.nak.home_assistant.actions.DeviceList;
import de.nak.home_assistant.models.database.ModuleResponse;
import de.nak.home_assistant.models.telegram.Command;
import de.nak.home_assistant.services.database.ModuleService;

import java.util.Optional;

public class Hue extends Command {

    private final TelegramBot bot;

    public Hue(TelegramBot bot) {
        this.bot = bot;
        this.name = "hue";
        this.description = "Öffnet das Hue Service Menü";
    }

    public Hue() {
        this(null);
    }

    public void reply(Update update) {
        long userId = update.message().from().id();
        long chatId = update.message().chat().id();

        Optional<ModuleResponse> moduleResponse = new ModuleService().findModuleByName(this.name);
        if (!moduleResponse.isPresent()) {
            SendMessage msg = new SendMessage(chatId, "Interner Fehler (es wurde kein Modul mit diesem Name gefunden)");
            bot.execute(msg);
            return;
        }

        int moduleId = moduleResponse.get().getId();
        SendMessage message = DeviceList.generateMessage(userId, chatId, moduleId);
        bot.execute(message);
    }
}
