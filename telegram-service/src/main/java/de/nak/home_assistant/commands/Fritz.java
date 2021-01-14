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
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import static de.nak.home_assistant.Utils.messageArgs;

public class Fritz extends Command {

    private final TelegramBot bot;

    public Fritz(TelegramBot bot) {
        this.bot = bot;
        this.name = "fritz";
        this.description = "Öffnet das fritz menü";
    }

    public Fritz() {
        this(null);
    }

    public void reply(Update update) {
        long userId = update.message().from().id();
        long chatId = update.message().chat().id();

        Optional<ModuleResponse> moduleResponse = new ModuleService().findModuleByName(this.name);
        if (!moduleResponse.isPresent()) {
            SendMessage msg = new SendMessage(chatId, "Interner Fehler (es wurde kein Modul mit dem Namen " + this.name + " gefunden)");
            bot.execute(msg);
            return;
        }

        int moduleId = moduleResponse.get().getId();
        List<SendMessage> messages = new ArrayList<>();

        String[] args = messageArgs(update.message().text(), this.name);
        boolean hasArgs = args.length > 0;
        boolean tokenSuccess = false;
        UserService userService = new UserService(userId);


        if (hasArgs) {
            byte[] token = args[0].getBytes();
            tokenSuccess = userService.setToken(moduleId, Base64.getEncoder().encodeToString(token));
        }

        // Send success message
        if (tokenSuccess) {
            messages.add(new SendMessage(chatId, "Fritz-Token wurde geupdated 🥳"));
        }

        // Remove module and send error if token couldn't be updated
        if (!tokenSuccess && hasArgs) {
            SendMessage msg = CustomKeyboard.generateMessageWithKeyboard(userId, chatId,"Fehler beim Token update :(");
            messages.add(msg);
        }

        // Generate Message if token was updated or shouldn't be updated
        if (tokenSuccess || !hasArgs) {
            messages.add(DeviceList.generateMessage(userId, chatId, moduleId));
        }

        messages.forEach(bot::execute);
    }
}
