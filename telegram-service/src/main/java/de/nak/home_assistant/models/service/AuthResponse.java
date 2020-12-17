package de.nak.home_assistant.models.service;

import com.google.gson.Gson;
import de.nak.home_assistant.models.AServiceResponse;

public class AuthResponse extends AServiceResponse {

    private String result;

    @Override
    public AuthResponse fromJson(String json) {
        return new Gson().fromJson(json, AuthResponse.class);
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
