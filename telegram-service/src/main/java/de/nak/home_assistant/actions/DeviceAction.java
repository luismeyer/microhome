package de.nak.home_assistant.actions;

import de.nak.home_assistant.CustomKeyboard;
import de.nak.home_assistant.models.service.ServiceRequest;
import de.nak.home_assistant.models.service.SimpleResponse;
import de.nak.home_assistant.models.telegram.CallbackData;
import de.nak.home_assistant.services.ServiceService;
import de.nak.home_assistant.services.database.DeviceService;
import org.glassfish.jersey.internal.inject.Custom;
import org.telegram.telegrambots.meta.api.methods.BotApiMethod;
import org.telegram.telegrambots.meta.api.methods.groupadministration.SetChatAdministratorCustomTitle;
import org.telegram.telegrambots.meta.api.methods.groupadministration.SetChatTitle;
import org.telegram.telegrambots.meta.api.methods.pinnedmessages.PinChatMessage;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.EditMessageText;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ForceReplyKeyboard;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DeviceAction {

    public static List<BotApiMethod<?>> generateMessages(long userId, long chatId, CallbackData cbData, Message inMessage, String data) {
        String deviceId = cbData.getDeviceId();
        int moduleId = cbData.getModuleId();

        List<BotApiMethod<?>> messages = new ArrayList<>();

        String function = cbData.getFunction();
        // Ask for data input if required and not given
        if (function.endsWith("*") && data == null) {
            SendMessage msg = CustomKeyboard.generateDefaultMessage(chatId);
            msg.setText("Antworte auf diese Nachricht mit den Eingabe Daten");
            msg.setReplyMarkup(ForceReplyKeyboard.builder().forceReply(true).build());

            PinChatMessage pin = PinChatMessage.builder()
                    .chatId(String.valueOf(chatId))
                    .messageId(inMessage.getMessageId())
                    .disableNotification(true)
                    .build();

            if (inMessage.getReplyMarkup().getKeyboard().get(0).size() > 1) {
                EditMessageText edit = EditMessageText
                        .builder()
                        .chatId(String.valueOf(chatId))
                        .messageId(inMessage.getMessageId())
                        .text(inMessage.getText())
                        .replyMarkup(CustomKeyboard.generateFunctionButtons(Arrays.asList(cbData.getFunction()), deviceId, moduleId))
                        .build();

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

        SendMessage message = CustomKeyboard.generateMessageWithKeyboard(userId, chatId);
        if (response.isSuccess()) {

            SendMessage sendMessage = DeviceSelect.generateMessage(userId, chatId, cbData);

            if (!sendMessage.getText().equals(inMessage.getText()) || sendMessage.getReplyMarkup() != inMessage.getReplyMarkup()) {
                
                messages.add(EditMessageText.builder()
                        .chatId(String.valueOf(chatId))
                        .messageId(inMessage.getMessageId())
                        .text(sendMessage.getText())
                        .replyMarkup((InlineKeyboardMarkup) sendMessage.getReplyMarkup())
                        .build()
                );
            }

            message.setText("Wir hatten erfolg!!");
        } else {
            message.setText("Hat irgendwie nicht geklappt!! " + response.getError());
        }

        messages.add(message);
        return messages;
    }
}
