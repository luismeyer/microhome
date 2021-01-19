package de.nak.home_assistant.commands;

import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.model.Update;
import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.models.telegram.Command;
import de.nak.home_assistant.services.database.UserService;

public class Start extends Command {

    private final TelegramBot bot;

    public Start(TelegramBot bot) {
        this.bot = bot;
        this.name = "start";
        this.description = "Startet den Bot";
    }

    public Start() {
        this(null);
    }

    public void reply(Update update) {
        long userId = update.message().from().id();
        long chatId = update.message().chat().id();

        UserService userService = new UserService(userId);
        boolean success = userService.createUser();

        String text;
        if (success){
            text = "🚀 Willkommen beim Home Assistant Bot" +
                    "\n\n⚙️ Als nächstes kannst du mit dem '" + new Settings().getName() + "' Kommando deine Module verwalten." +
                    "\n🏁 Wenn du schon Module hinzugfügt hast kannst du auch direkt loslegen in dem du diese im Menü auswählst";
        } else {
            text = "Fehler beim Anmelden. Versuch es später erneut. :)";
        }

        bot.execute(CustomKeyboard.generateMessageWithKeyboard(userId, chatId, text));
    }
}
