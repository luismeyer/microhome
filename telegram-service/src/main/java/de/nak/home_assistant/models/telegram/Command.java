package de.nak.home_assistant.models.telegram;

import com.pengrad.telegrambot.model.Update;

public abstract class Command {

    protected String name;
    protected String description;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public abstract void reply(Update update);

}
