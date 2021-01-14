package de.nak.home_assistant.commands;

import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.model.Update;
import com.pengrad.telegrambot.request.SendMessage;
import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.actions.DeviceList;
import de.nak.home_assistant.models.database.ModuleResponse;
import de.nak.home_assistant.models.telegram.Command;
import de.nak.home_assistant.services.database.ModuleService;
import de.nak.home_assistant.services.database.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Lifx extends Command {

    private final TelegramBot bot;

    public Lifx(TelegramBot bot) {
        this.bot = bot;
        this.name = "lifx";
        this.description = "Öffnet das Lifx Gerätemenü";
    }

    public Lifx() {
        this(null);
    }

    @Override
    public void reply(Update update) {
        long userId = update.message().from().id();
        long chatId = update.message().chat().id();

        Optional<ModuleResponse> moduleResponse = new ModuleService().findModuleByName(this.name);
        if (!moduleResponse.isPresent()) {
            SendMessage msg = new SendMessage(chatId, "Interner Fehler (es wurde kein Modul mit dem Name " + this.name + " gefunden)");
            bot.execute(msg);
            return;
        }

        int moduleId = moduleResponse.get().getId();
        List<SendMessage> messages = new ArrayList<>();

        String[] args = update.message().text()
                .replace(this.getCommand(), "")
                .split(" ");

        boolean hasArgs = args.length > 0;
        boolean tokenSuccess = false;
        UserService userService = new UserService(userId);


        if (hasArgs) {
            String token = args[0];
            tokenSuccess = userService.setToken(moduleId, token);
        }

        // Send success message
        if (tokenSuccess) {
            messages.add(new SendMessage(chatId,"Lifx-Token wurde geupdated 🥳"));
        }

        // Remove module and send error if token couldn't be updated
        if (!tokenSuccess && hasArgs) {
            SendMessage msg = CustomKeyboard.generateMessageWithKeyboard(userId, chatId, "Fehler beim Lifx-Token update :(");
            messages.add(msg);
        }

        // Generate Message if token was updated or shouldn't be updated
        if (tokenSuccess || !hasArgs) {
            messages.add(DeviceList.generateMessage(userId, chatId, moduleId));
        }

        messages.forEach(bot::execute);
    }

}
