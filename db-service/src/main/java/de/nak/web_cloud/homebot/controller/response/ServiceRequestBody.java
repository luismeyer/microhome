package de.nak.web_cloud.homebot.controller.response;

// Daten die im Body an einen Service gesendet werden
public class ServiceRequestBody {

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

    public ServiceRequestBody setToken(String token) {
        this.token = token;
        return this;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public ServiceRequestBody setDeviceId(String deviceId) {
        this.deviceId = deviceId;
        return this;
    }

    public String getAction() {
        return action;
    }

    public ServiceRequestBody setAction(String action) {
        this.action = action;
        return this;
    }

    public String getData() {
        return data;
    }

    public ServiceRequestBody setData(String data) {
        this.data = data;
        return this;
    }
}