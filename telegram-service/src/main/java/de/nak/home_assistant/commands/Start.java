package de.nak.home_assistant.commands;

import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.models.telegram.Command;
import de.nak.home_assistant.services.database.UserService;
import org.telegram.abilitybots.api.objects.Ability;
import org.telegram.abilitybots.api.objects.MessageContext;
import org.telegram.abilitybots.api.sender.MessageSender;
import org.telegram.abilitybots.api.util.AbilityExtension;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import static org.telegram.abilitybots.api.objects.Locality.ALL;
import static org.telegram.abilitybots.api.objects.Privacy.PUBLIC;

public class Start implements AbilityExtension {

    public static Command COMMAND = new Command("start", "Startet den Bot");

    private final MessageSender sender;

    public Start(MessageSender sender) {
        this.sender = sender;
    }

    private void replyToStart(MessageContext messageContext) {
        long userId = messageContext.user().getId();
        long chatId = messageContext.chatId();

        UserService userService = new UserService(userId);
        boolean success = userService.createUser();

        SendMessage message = CustomKeyboard.generateMessageWithKeyboard(userId, chatId);
        if (success){
            message.setText("🚀 Willkommen beim Home Assistant Bot" +
                "\n\n⚙️ Als nächstes kannst du mit dem " + Settings.COMMAND.getCommand() + " Kommando deine Module verwalten." +
                "\n🏁 Wenn du schon Module hinzugfügt hast kannst du auch direkt loslegen in dem du diese im Menü auswählst");
        } else {
            message.setText("Fehler beim Anmelden. Versuch es später erneut. :)");
        }

        try {
            sender.execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    // Register start Ability in AbilityBot
    public Ability start() {
        return Ability.builder()
                .name(COMMAND.getName())
                .info("Starts the bot")
                .privacy(PUBLIC)
                .locality(ALL)
                .input(0)
                .action(this::replyToStart)
                .build();
    }
}
