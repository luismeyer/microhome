package de.nak.home_assistant.commands;

import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.actions.DeviceList;
import de.nak.home_assistant.models.database.ModuleResponse;
import de.nak.home_assistant.services.database.ModuleService;
import org.telegram.abilitybots.api.objects.Ability;
import org.telegram.abilitybots.api.objects.MessageContext;
import org.telegram.abilitybots.api.sender.MessageSender;
import org.telegram.abilitybots.api.util.AbilityExtension;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.Optional;

import static org.telegram.abilitybots.api.objects.Locality.ALL;
import static org.telegram.abilitybots.api.objects.Privacy.PUBLIC;

public class Hue implements AbilityExtension {

    private final String COMMAND_NAME = "hue";
    private final MessageSender sender;

    public Hue(MessageSender sender) {
        this.sender = sender;
    }

    private void sendMessage(SendMessage message) {
        try {
            sender.execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    private void replyToHue(MessageContext ctx) {
        long userId = ctx.user().getId();
        long chatId = ctx.chatId();

        Optional<ModuleResponse> moduleResponse = new ModuleService().findModuleByName(COMMAND_NAME);
        if (!moduleResponse.isPresent()) {
            SendMessage msg = CustomKeyboard.generateDefaultMessage(chatId, "Interner Fehler (es wurde kein Modul mit diesem Name gefunden)");
            sendMessage(msg);
            return;
        }

        int moduleId = moduleResponse.get().getId();
        SendMessage message = DeviceList.generateMessage(userId, chatId, moduleId);
        sendMessage(message);
    }

    // Registers the Ability in the AbilityBot
    public Ability hue() {
        return Ability.builder()
                .name(COMMAND_NAME)
                .info("Hue Overview")
                .privacy(PUBLIC)
                .locality(ALL)
                .input(0)
                .action(this::replyToHue)
                .build();
    }
}
