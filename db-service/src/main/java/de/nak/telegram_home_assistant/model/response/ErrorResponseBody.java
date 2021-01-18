package de.nak.telegram_home_assistant.model.response;

import java.util.List;

public class ErrorResponseBody {

    private List<String> messages;

    public List<String> getMessages() {
        return messages;
    }

    public ErrorResponseBody setMessages(List<String> messages) {
        this.messages = messages;
        return this;
    }
}
