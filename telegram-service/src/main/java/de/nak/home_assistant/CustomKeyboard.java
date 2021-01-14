package de.nak.home_assistant;

import com.pengrad.telegrambot.model.request.InlineKeyboardButton;
import com.pengrad.telegrambot.model.request.InlineKeyboardMarkup;
import com.pengrad.telegrambot.model.request.ReplyKeyboardMarkup;
import com.pengrad.telegrambot.request.SendMessage;
import de.nak.home_assistant.models.service.devices.Device;
import de.nak.home_assistant.models.database.ModuleResponse;
import de.nak.home_assistant.models.telegram.CallbackActions;
import de.nak.home_assistant.models.telegram.CallbackData;
import de.nak.home_assistant.models.telegram.Command;
import de.nak.home_assistant.services.database.UserService;

import java.util.List;

public class CustomKeyboard {

    public static ReplyKeyboardMarkup generateMarkup(List<ModuleResponse> moduleResponses) {


        String[] row1;
        if (moduleResponses != null) {
            row1 = moduleResponses
                    .stream()
                    .map(module -> "/" + module.getName())
                    .toArray(String[]::new);
        } else {
            row1 = new String[]{};
        }

        String[] row2 = Bot.FIXED_COMMANDS
                .stream()
                .map(Command::getCommand)
                .toArray(String[]::new);

        return new ReplyKeyboardMarkup(row1, row2);
    };

    public static InlineKeyboardMarkup generateDeviceButtons(List<List<Device>> devices, int moduleId) {
        InlineKeyboardButton[][] buttons = devices
                .stream()
                .map(row -> row
                        .stream()
                        .map(device -> device.toInlineButton(moduleId))
                        .toArray(InlineKeyboardButton[]::new))
                .toArray(InlineKeyboardButton[][]::new);

        return new InlineKeyboardMarkup(buttons);
    }

    public static InlineKeyboardMarkup generateFunctionButtons(List<String> functions, String deviceId, int moduleId) {
        InlineKeyboardButton[] row = functions
                .stream()
                .map(name -> new InlineKeyboardButton(name)
                        .callbackData(new CallbackData()
                                .setAction(CallbackActions.ACTION_DEVICE)
                                .setId(moduleId, deviceId)
                                .setFunction(name)
                                .toJson()))
                .toArray(InlineKeyboardButton[]::new);

        return new InlineKeyboardMarkup().addRow(row);
    }

    public static SendMessage generateMessageWithKeyboard(long userId, long chatId, String text) {
        List<ModuleResponse> userModuleResponses = new UserService(userId).getModules();

        return new SendMessage(chatId, text)
                .replyMarkup(CustomKeyboard.generateMarkup(userModuleResponses));
    }

    public static InlineKeyboardButton generateSwitch(boolean on, CallbackData dbData) {
        return new InlineKeyboardButton(on ? "deaktivieren" : "aktivieren").callbackData(dbData.toJson());
    }
}
