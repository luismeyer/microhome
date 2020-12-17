package de.nak.home_assistant.commands;

import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.actions.DeviceList;
import de.nak.home_assistant.models.database.ModuleResponse;
import de.nak.home_assistant.services.database.ModuleService;
import de.nak.home_assistant.services.database.UserService;
import org.telegram.abilitybots.api.objects.Ability;
import org.telegram.abilitybots.api.objects.MessageContext;
import org.telegram.abilitybots.api.sender.MessageSender;
import org.telegram.abilitybots.api.util.AbilityExtension;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import static org.telegram.abilitybots.api.objects.Locality.ALL;
import static org.telegram.abilitybots.api.objects.Privacy.PUBLIC;

public class Fritz implements AbilityExtension {

    private static final String COMMAND_NAME = "fritz";
    private final MessageSender sender;

    public Fritz(MessageSender sender) {
        this.sender = sender;
    }

    private void sendMessage(SendMessage message) {
        try {
            sender.execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    private void replyToFritz(MessageContext ctx) {
        long userId = ctx.user().getId();
        long chatId = ctx.chatId();

        Optional<ModuleResponse> moduleResponse = new ModuleService().findModuleByName(COMMAND_NAME);
        if (!moduleResponse.isPresent()) {
            SendMessage msg = CustomKeyboard.generateDefaultMessage(chatId, "Interner Fehler (es wurde kein Modul mit dem Namen " + COMMAND_NAME + " gefunden)");
            sendMessage(msg);
            return;
        }

        int moduleId = moduleResponse.get().getId();
        List<SendMessage> messages = new ArrayList<>();

        boolean hasArgs = ctx.arguments().length > 0;
        boolean tokenSuccess = false;
        UserService userService = new UserService(userId);


        if (hasArgs) {
            byte[] token = ctx.arguments()[0].getBytes();
            tokenSuccess = userService.setToken(moduleId, Base64.getEncoder().encodeToString(token));
        }

        // Send success message
        if (tokenSuccess) {
            messages.add(CustomKeyboard.generateDefaultMessage(chatId, "Fritz-Token wurde geupdated 🥳"));
        }

        // Remove module and send error if token couldn't be updated
        if (!tokenSuccess && hasArgs) {
            SendMessage msg = CustomKeyboard.generateMessageWithKeyboard(userId, chatId);
            msg.setText("Fehler beim Token update :(");

            messages.add(msg);
        }

        // Generate Message if token was updated or shouldn't be updated
        if (tokenSuccess || !hasArgs) {
            messages.add(DeviceList.generateMessage(userId, chatId, moduleId));
        }

        messages.forEach(this::sendMessage);
    }

    // Registers the Ability in the AbilityBot
    public Ability fritz() {
        return Ability.builder()
                .name(COMMAND_NAME)
                .info("Fritz Overview")
                .privacy(PUBLIC)
                .locality(ALL)
                .input(0)
                .action(this::replyToFritz)
                .build();
    }
}
