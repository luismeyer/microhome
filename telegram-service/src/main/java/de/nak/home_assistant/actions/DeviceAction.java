package de.nak.home_assistant.actions;

import com.pengrad.telegrambot.model.Message;
import com.pengrad.telegrambot.model.request.ForceReply;
import com.pengrad.telegrambot.request.BaseRequest;
import com.pengrad.telegrambot.request.EditMessageText;
import com.pengrad.telegrambot.request.PinChatMessage;
import com.pengrad.telegrambot.request.SendMessage;
import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.models.service.ServiceRequest;
import de.nak.home_assistant.models.service.SimpleResponse;
import de.nak.home_assistant.models.telegram.CallbackData;
import de.nak.home_assistant.services.ServiceService;
import de.nak.home_assistant.services.database.DeviceService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DeviceAction {

    public static List<BaseRequest<?, ?>> generateMessages(long userId, long chatId, CallbackData cbData, Message inMessage, String data) {
        String deviceId = cbData.getDeviceId();
        int moduleId = cbData.getModuleId();

        List<BaseRequest<?, ?>> messages = new ArrayList<>();
        String function = cbData.getFunction();

        // Ask for data input if required and not given
        if (function.endsWith("*") && data == null) {
            SendMessage msg = new SendMessage(chatId, "Antworte auf diese Nachricht mit den Eingabe Daten")
                    .replyMarkup(new ForceReply());

            PinChatMessage pin = new PinChatMessage(chatId, inMessage.messageId()).disableNotification(true);

            if (inMessage.replyMarkup().inlineKeyboard()[0].length > 1) {
                EditMessageText edit = new EditMessageText(chatId, inMessage.messageId(), inMessage.text())
                        .replyMarkup(CustomKeyboard.generateFunctionButtons(Arrays.asList(cbData.getFunction()), deviceId, moduleId));

                messages.add(edit);
            }

            messages.add(pin);
            messages.add(msg);

            return messages;
        }

        DeviceService deviceService = new DeviceService();
        ServiceRequest serviceRequest = deviceService.getFunction(userId, moduleId, deviceId, cbData.getFunction());
        if (data != null) {
            serviceRequest.getBody().setAction(cbData.getFunction().replace("*", ""));
            serviceRequest.getBody().setData(data);
        }

        ServiceService service = new ServiceService(new SimpleResponse());
        SimpleResponse response = service.makeRequest(serviceRequest);

        String statusMessage = "";
        if (response.isSuccess()) {

            /* TODO: update edit message logic
            SendMessage sendMessage = DeviceSelect.generateMessage(userId, chatId, cbData);

            if (!sendMessage.getText().equals(inMessage.getText()) || sendMessage.getReplyMarkup() != inMessage.getReplyMarkup()) {

                messages.add(EditMessageText.builder()
                        .chatId(String.valueOf(chatId))
                        .messageId(inMessage.getMessageId())
                        .text(sendMessage.getText())
                        .replyMarkup((InlineKeyboardMarkup) sendMessage.getReplyMarkup())
                        .build()
                );
            }*/

            statusMessage = "Wir hatten erfolg!!";
        } else {
            statusMessage = "Hat irgendwie nicht geklappt!! " + response.getError();
        }

        messages.add(CustomKeyboard.generateMessageWithKeyboard(userId, chatId, statusMessage));
        return messages;
    }
}
