package de.nak.home_assistant.actions;

import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.models.service.DeviceResponse;
import de.nak.home_assistant.models.telegram.CallbackData;
import de.nak.home_assistant.models.database.FunctionsResponse;
import de.nak.home_assistant.services.database.DeviceService;
import de.nak.home_assistant.services.ServiceService;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;

public class DeviceSelect {

    public static SendMessage generateMessage(long userId, long chatId, CallbackData cbData) {
        String deviceId = cbData.getDeviceId();
        int moduleId = cbData.getModuleId();

        DeviceService deviceService = new DeviceService();
        FunctionsResponse functionsResponse = deviceService.getFunctions(userId, moduleId, deviceId);

        ServiceService service = new ServiceService(new DeviceResponse());
        DeviceResponse deviceResponse = service.makeRequest(functionsResponse.getServiceRequest());

        SendMessage message = CustomKeyboard.generateMessageWithKeyboard(userId, chatId);
        if (deviceResponse.isSuccess()) {

            message.setText(deviceResponse.getResult().toString());

            InlineKeyboardMarkup keyboardMarkup = CustomKeyboard.generateFunctionButtons(functionsResponse.getFunctions(), deviceId, moduleId);
            message.setReplyMarkup(keyboardMarkup);

        } else {
            message.setText("Etwas ist schiefgegangen: " + deviceResponse.getError());
        }

        return message;
    }
}
