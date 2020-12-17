package de.nak.home_assistant.actions;

import com.google.common.collect.Lists;
import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.models.service.devices.Device;
import de.nak.home_assistant.models.service.DeviceListResponse;
import de.nak.home_assistant.models.database.ModuleResponse;
import de.nak.home_assistant.services.ServiceService;
import de.nak.home_assistant.services.database.UserService;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;

import java.util.List;

public class DeviceList {

    public static SendMessage generateMessage(long userId, long chatId, int moduleId) {
        // Make initial User requests
        UserService userService = new UserService(userId);
        ModuleResponse moduleResponse = userService.getUserModule(moduleId);

        // Request DeviceList from Service
        ServiceService service = new ServiceService(new DeviceListResponse());
        DeviceListResponse deviceListResponse = service.makeRequest(moduleResponse.getServiceRequest());

        SendMessage message = CustomKeyboard.generateMessageWithKeyboard(userId, chatId);

        if (deviceListResponse.isSuccess()) {

            // Partition the DeviceList so each row has 3 Buttons max
            List<List<Device>> devices = Lists.partition(deviceListResponse.getResult(), 3);

            message.setReplyMarkup(CustomKeyboard.generateDeviceButtons(devices, moduleId));
            message.setText("Deine " + moduleResponse.getName() + " Geräte:");

        } else {
            message.setText("Etwas hat nicht funktioniert: " + deviceListResponse.getError());
        }

        return message;
    }

}
