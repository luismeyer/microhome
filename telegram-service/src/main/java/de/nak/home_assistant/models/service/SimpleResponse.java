package de.nak.home_assistant.models.service;

import com.google.gson.Gson;
import de.nak.home_assistant.models.AServiceResponse;

public class SimpleResponse extends AServiceResponse {
    @Override
    public SimpleResponse fromJson(String json) {
        return new Gson().fromJson(json, SimpleResponse.class);
    }
}
