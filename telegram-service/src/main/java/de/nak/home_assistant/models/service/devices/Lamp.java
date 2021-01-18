package de.nak.home_assistant.models.service.devices;

import com.pengrad.telegrambot.model.request.InlineKeyboardButton;
import de.nak.home_assistant.models.telegram.CallbackActions;
import de.nak.home_assistant.models.telegram.CallbackData;

public class Lamp {

    private static String colorToEmoji(String color) {
        if (color == null) {
            return "⚪️";
        }

        switch(color.toLowerCase()) {
            case "red":
                return "🔴";
            case "orange":
                return "🟠";
            case "yellow":
            case "gold":
                return "🟡";
            case "green":
            case "lime":
                return "🟢";
            case "blue":
            case "blueviolet":
                return "🔵";
            case "purple":
            case "darkviolet":
                return "🟣";
            case "brown":
                return "🟤";
            default:
                return "⚪️";
        }
    }

    public static String toString(Boolean on, String name, String color) {
        String stateString = on ? "on" : "off";

        return String.format("💡 Lampe: %s\n"
                + (on ? colorToEmoji(color) : "⚫️") + " Status: %s\n"
                + "🖌 Farbe: %s",
                name, stateString, color);
    }

    public static InlineKeyboardButton toInlineButton(String id, int moduleId, Boolean on, String name, String color) {
        CallbackData cbData = new CallbackData()
                .setAction(CallbackActions.SELECT_DEVICE)
                .setId(moduleId, id);

        return new InlineKeyboardButton((on ? colorToEmoji(color) + " " : "⚫️ ") + name)
                .callbackData(cbData.toJson());
    }
}
