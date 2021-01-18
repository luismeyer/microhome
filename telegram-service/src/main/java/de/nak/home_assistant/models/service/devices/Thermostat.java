package de.nak.home_assistant.models.service.devices;

import com.pengrad.telegrambot.model.request.InlineKeyboardButton;
import de.nak.home_assistant.models.telegram.CallbackActions;
import de.nak.home_assistant.models.telegram.CallbackData;

public class Thermostat {

    public static String toString(String name, Boolean on, float temperatur, float istTemperatur, float sollTemperatur) {
        String nameString = "🔥 Heizung: %s\n";
        String statusString = (on ? "⚪️" : "⚫️") + " Status: %s\n";
        String tempString = "🌡 Temperatur: %s°C\n";
        String temp2String = "📊 Ist: %s°C, Soll: %s°C";

        return String.format(nameString + statusString + tempString + temp2String, name, on ? "on" : "off", temperatur, istTemperatur, sollTemperatur);
    }

    public static InlineKeyboardButton toInlineButton(String id, Boolean on, float istTemperatur, int moduleId, String name) {
        CallbackData cbData = new CallbackData()
                .setAction(CallbackActions.SELECT_DEVICE)
                .setId(moduleId, id);

        return new InlineKeyboardButton((on ? "⚪️ " : "⚫️ ") + name + " (" + istTemperatur + "°C)")
                .callbackData(cbData.toJson());
    }
}
