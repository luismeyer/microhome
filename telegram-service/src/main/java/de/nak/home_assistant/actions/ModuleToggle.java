package de.nak.home_assistant.actions;

import com.pengrad.telegrambot.request.SendMessage;
import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.models.service.AuthResponse;
import de.nak.home_assistant.models.service.ServiceRequest;
import de.nak.home_assistant.models.telegram.CallbackData;
import de.nak.home_assistant.services.ServiceService;
import de.nak.home_assistant.services.database.UserService;

public class ModuleToggle {

    public static SendMessage generateMessage(long userId, long chatId, CallbackData cbData, boolean activate) {
        int moduleId = cbData.getModuleId();
        UserService userService = new UserService(userId);

        String text;
        if (activate) {
            ServiceRequest serviceRequest = userService.activateModule(moduleId);
            ServiceService serviceService = new ServiceService(new AuthResponse());
            AuthResponse authResponse = serviceService.makeRequest(serviceRequest);

            if (authResponse.isSuccess()) {
                text = authResponse.getResult();
            } else {
                text = "Etwas ist schiefgegangen " + authResponse.getError();
            }
        } else {
            if (userService.deactivateModule(moduleId)) {
                text = "Modul deaktiviert";
            } else {
                text = "Etwas ist schiefgegangen";
            }
        }

        return CustomKeyboard.generateMessageWithKeyboard(userId, chatId, text);
    }
}
