package de.nak.home_assistant.commands;

import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.model.Update;
import com.pengrad.telegrambot.request.SendMessage;
import de.nak.home_assistant.models.telegram.Command;

public class Fallback extends Command {

    private final TelegramBot bot;

    public Fallback(TelegramBot bot) {
        this.bot = bot;
    }

    @Override
    public void reply(Update update) {
        SendMessage sendMessage = new SendMessage(update.message().chat().id(), "Falsches Kommando");
        bot.execute(sendMessage);
    }
}
