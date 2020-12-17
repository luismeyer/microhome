package de.nak.home_assistant.commands;

import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.models.database.ModuleResponse;
import de.nak.home_assistant.models.telegram.CallbackActions;
import de.nak.home_assistant.models.telegram.CallbackData;
import de.nak.home_assistant.models.telegram.Command;
import de.nak.home_assistant.services.database.ModuleService;
import de.nak.home_assistant.services.database.UserService;
import org.telegram.abilitybots.api.objects.Ability;
import org.telegram.abilitybots.api.objects.MessageContext;
import org.telegram.abilitybots.api.sender.MessageSender;
import org.telegram.abilitybots.api.util.AbilityExtension;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.telegram.abilitybots.api.objects.Locality.ALL;
import static org.telegram.abilitybots.api.objects.Privacy.PUBLIC;

public class Settings implements AbilityExtension {

    public static Command COMMAND = new Command("einstellungen", "Öffnet das Konfigurationsmenü");

    private final MessageSender sender;

    public Settings(MessageSender sender) {
        this.sender = sender;
    }

    private void replyToSettings(MessageContext ctx) {
        long userId = ctx.user().getId();
        long chatId = ctx.chatId();

        UserService userService = new UserService(userId);

        ModuleService moduleService = new ModuleService();
        List<ModuleResponse> modules = moduleService.getModules();

        List<SendMessage> messages = modules.stream()
                .map(module -> {
                    boolean userHasModule = userService.hasModule(module.getId());

                    int action = userHasModule ? CallbackActions.DEACTIVATE_MODULE : CallbackActions.ACTIVATE_MODULE;
                    CallbackData cb = new CallbackData().setAction(action).setId(module.getId(), null);

                    List<InlineKeyboardButton> buttons = Collections.singletonList(CustomKeyboard.generateSwitch(userHasModule, cb));
                    InlineKeyboardMarkup markup = InlineKeyboardMarkup.builder().keyboard(Collections.singletonList(buttons)).build();

                    SendMessage msg = CustomKeyboard.generateDefaultMessage(chatId);
                    msg.setText("Modul: " + module.getName());
                    msg.setReplyMarkup(markup);
                    return msg;
                })
                .collect(Collectors.toList());

        messages.forEach(m -> {
            try {
                sender.execute(m);
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        });

    }

    // Register the Ability in AbilityBot
    public Ability settings() {
        return Ability.builder()
                .name(COMMAND.getName())
                .info("Starts the bot")
                .privacy(PUBLIC)
                .locality(ALL)
                .input(0)
                .action(this::replyToSettings)
                .build();
    }
}
