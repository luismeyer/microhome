package de.nak.home_assistant.models.service.devices;

import de.nak.home_assistant.models.telegram.CallbackActions;
import de.nak.home_assistant.models.telegram.CallbackData;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;

public class Lamp {

    private static String colorToEmoji(String color) {
        if (color == null) {
            return "⚪️";
        }

        System.out.println(color);

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

        return InlineKeyboardButton.builder()
                .text( (on ? colorToEmoji(color) + " " : "⚫️ ") + name)
                .callbackData(cbData.toJson())
                .build();
    }
}
