package de.nak.home_assistant;

import de.nak.home_assistant.models.service.devices.Device;
import de.nak.home_assistant.models.database.ModuleResponse;
import de.nak.home_assistant.models.telegram.CallbackActions;
import de.nak.home_assistant.models.telegram.CallbackData;
import de.nak.home_assistant.services.database.UserService;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class CustomKeyboard {

    public static ReplyKeyboardMarkup generateMarkup(List<ModuleResponse> moduleResponses) {
        ReplyKeyboardMarkup markup = new ReplyKeyboardMarkup();

        KeyboardRow row1 = new KeyboardRow();
        if (moduleResponses != null) {
            moduleResponses.forEach(module -> {
                row1.add("/" + module.getName());
            });
        }


        KeyboardRow row2 = new KeyboardRow();
        Bot.FIXED_COMMANDS.forEach(c -> row2.add(c.getCommand()));

        markup.setKeyboard(Arrays.asList(row1, row2));

        return markup;
    };

    public static InlineKeyboardMarkup generateDeviceButtons(List<List<Device>> devices, int moduleId) {
        List<List<InlineKeyboardButton>> buttons = devices
                .stream()
                .map(row -> row
                        .stream()
                        .map(device -> device.toInlineButton(moduleId))
                        .collect(Collectors.toList()))
                .collect(Collectors.toList());

        return InlineKeyboardMarkup.builder()
                .keyboard(buttons)
                .build();
    }

    public static InlineKeyboardMarkup generateFunctionButtons(List<String> functions, String deviceId, int moduleId) {
        List<InlineKeyboardButton> row = functions
                .stream()
                .map(name -> InlineKeyboardButton
                        .builder()
                        .text(name)
                        .callbackData(new CallbackData()
                                .setAction(CallbackActions.ACTION_DEVICE)
                                .setId(moduleId, deviceId)
                                .setFunction(name)
                                .toJson())
                        .build())
                .collect(Collectors.toList());

        return InlineKeyboardMarkup.builder()
                .keyboard(Arrays.asList(row))
                .build();
    }

    public static SendMessage generateMessageWithKeyboard(long userId, long chatId) {
        List<ModuleResponse> userModuleResponses = new UserService(userId).getModules();

        return SendMessage
                .builder()
                .chatId(String.valueOf(chatId))
                .replyMarkup(CustomKeyboard.generateMarkup(userModuleResponses))
                .text("")
                .build();
    }

    public static SendMessage generateDefaultMessage(long chatId, String text) {
        return SendMessage
                .builder()
                .chatId(String.valueOf(chatId))
                .text(text)
                .build();
    }

    public static SendMessage generateDefaultMessage(long chatId) {
        return generateDefaultMessage(chatId, "");
    }

    public static InlineKeyboardButton generateSwitch(boolean on, CallbackData dbData) {
        return InlineKeyboardButton
                .builder()
                .text(on ? "deaktivieren" : "aktivieren")
                .callbackData(dbData.toJson())
                .build();
    }
}
