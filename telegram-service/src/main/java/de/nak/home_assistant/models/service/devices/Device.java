package de.nak.home_assistant.models.service.devices;

import com.google.gson.Gson;
import de.nak.home_assistant.models.ISerializable;
import de.nak.home_assistant.models.telegram.CallbackActions;
import de.nak.home_assistant.models.telegram.CallbackData;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;

import java.util.Optional;

public class Device implements ISerializable {

    private String id;
    private Boolean on;
    private String name;
    private String type;

    // Lamp Attributes
    private String color;

    // Thermostat Attributes
    private float temperatur;
    private float istTemperatur;
    private float sollTemperatur;


    public Device() {
    }

    public Device(String id, Boolean on, String name) {
        this.id = id;
        this.on = on;
        this.name = name;
    }

    public Device(String id, Boolean on, String name, String color) {
        this.id = id;
        this.on = on;
        this.name = name;
        this.color = color;
    }

    public Device(String id, Boolean on, String name, String type, float temperatur, float istTemperatur, float sollTemperatur) {
        this.id = id;
        this.on = on;
        this.name = name;
        this.type = type;
        this.temperatur = temperatur;
        this.istTemperatur = istTemperatur;
        this.sollTemperatur = sollTemperatur;
    }

    private Boolean isLamp() {
        return type.equals("LAMP");
    }

    private Boolean isThermostat() {
        return type.equals("THERMOSTAT");
    }

    public String getId() {
        return id;
    }

    public Boolean getOn() {
        return on;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        if (isThermostat()) {
            return Thermostat.toString(name, on, temperatur, istTemperatur, sollTemperatur);
        }

        if (isLamp()) {
            return Lamp.toString(on, name, color);
        }

        return "WRONG DEVICE TYPE";
    }

    public InlineKeyboardButton toInlineButton(int moduleId) {
        if (isThermostat()) {
            return Thermostat.toInlineButton(id, on, istTemperatur, moduleId, name);
        }

        if (isLamp()) {
            return Lamp.toInlineButton(id, moduleId, on, name, color);
        }

        return null;
    }

    @Override
    public Device fromJson(String json) {
        return new Gson().fromJson(json, Device.class);
    }

}
