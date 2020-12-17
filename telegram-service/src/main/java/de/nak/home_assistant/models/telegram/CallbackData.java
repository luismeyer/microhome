package de.nak.home_assistant.models.telegram;

import com.google.gson.Gson;
import de.nak.home_assistant.models.ISerializable;

public class CallbackData implements ISerializable {

    private int action;
    private String id;
    private String function;

    public CallbackData() {
    }

    public int getAction() {
        return action;
    }

    public CallbackData setId(int moduleId, String deviceId) {
        id = moduleId + "::" + deviceId;
        return this;
    }

    public String getDeviceId() {
        return id.split("::")[1];
    }

    public int getModuleId() {
        return Integer.parseInt(id.split("::")[0]);
    }

    public CallbackData setAction(int action) {
        this.action = action;
        return this;
    }

    public String getFunction() {
        return function;
    }

    public CallbackData setFunction(String function) {
        this.function = function;
        return this;
    }

    @Override
    public CallbackData fromJson(String json) {
        return new Gson().fromJson(json, CallbackData.class);
    }
}
