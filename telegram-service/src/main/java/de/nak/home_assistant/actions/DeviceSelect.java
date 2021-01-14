package de.nak.home_assistant.actions;

import com.pengrad.telegrambot.model.request.InlineKeyboardMarkup;
import com.pengrad.telegrambot.request.SendMessage;
import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.models.service.DeviceResponse;
import de.nak.home_assistant.models.telegram.CallbackData;
import de.nak.home_assistant.models.database.FunctionsResponse;
import de.nak.home_assistant.services.database.DeviceService;
import de.nak.home_assistant.services.ServiceService;

public class DeviceSelect {

    public static SendMessage generateMessage(long userId, long chatId, CallbackData cbData) {
        String deviceId = cbData.getDeviceId();
        int moduleId = cbData.getModuleId();

        DeviceService deviceService = new DeviceService();
        FunctionsResponse functionsResponse = deviceService.getFunctions(userId, moduleId, deviceId);

        ServiceService service = new ServiceService(new DeviceResponse());
        DeviceResponse deviceResponse = service.makeRequest(functionsResponse.getServiceRequest());

        SendMessage message;
        if (deviceResponse.isSuccess()) {

            InlineKeyboardMarkup keyboardMarkup = CustomKeyboard.generateFunctionButtons(functionsResponse.getFunctions(), deviceId, moduleId);
            message = new SendMessage(chatId, deviceResponse.getResult().toString()).replyMarkup(keyboardMarkup);

        } else {
            message = new SendMessage(chatId, "Etwas ist schiefgegangen: " + deviceResponse.getError());
        }

        return message;
    }
}
