package de.nak.home_assistant.models.service;

import com.google.gson.Gson;
import de.nak.home_assistant.models.ISerializable;

// Daten die im Body an einen Service gesendet werden
public class ServiceRequestBody implements ISerializable {

    String token = "";
    String deviceId = "";
    String action = "";
    String data = "";

    public ServiceRequestBody() {
    }

    public ServiceRequestBody(String token, String deviceId, String action, String data) {
        this.token = token;
        this.deviceId = deviceId;
        this.action = action;
        this.data = data;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    @Override
    public ServiceRequestBody fromJson(String json) {
        return new Gson().fromJson(json, ServiceRequestBody.class);
    }
}
