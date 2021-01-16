package de.nak.telegram_home_assistant.controller.response;

public class ResponseAction {
    String URL;
    String token;
    String action;

    public Status getStatus() {
        return status;
    }

    public ResponseAction setStatus(Status status) {
        this.status = status;
        return this;
    }

    Status status;

    public String getURL() {
        return URL;
    }

    public ResponseAction setURL(String URL) {
        this.URL = URL;
        return this;
    }

    public String getToken() {
        return token;
    }

    public ResponseAction setToken(String token) {
        this.token = token;
        return this;
    }

    public String getAction() {
        return action;
    }

    public ResponseAction setAction(String action) {
        this.action = action;
        return this;
    }
}
