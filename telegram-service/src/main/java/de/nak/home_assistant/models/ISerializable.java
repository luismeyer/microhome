package de.nak.home_assistant.models;

import com.google.gson.Gson;

public interface ISerializable {

    default String toJson() {
        return new Gson().toJson(this);
    }

    <T> T fromJson(String json);
}
