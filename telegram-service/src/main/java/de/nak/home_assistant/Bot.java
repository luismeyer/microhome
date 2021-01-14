package de.nak.home_assistant;

import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.model.BotCommand;
import com.pengrad.telegrambot.model.Update;
import com.pengrad.telegrambot.request.SetMyCommands;
import de.nak.home_assistant.commands.*;
import de.nak.home_assistant.models.telegram.Command;

import java.util.Arrays;
import java.util.List;

public class Bot {

    TelegramBot api = new TelegramBot(Env.getBotToken());
    public static List<Command> FIXED_COMMANDS = Arrays.asList(new Start(), new Settings());

    public Bot() {
        BotCommand[] commands = FIXED_COMMANDS
                .stream()
                .map(c -> new BotCommand(c.getName(), c.getDescription()))
                .toArray(BotCommand[]::new);

        SetMyCommands setMyCommands = new SetMyCommands(commands);
        api.execute(setMyCommands);
    }

    public void handleUpdate(Update update) {

        if (update.inlineQuery() != null) {
            Callback callback = new Callback(api);
            callback.replyToButtons(update.message().chat().id(), update.callbackQuery());
        }

        if (update.message().replyToMessage() != null) {
            Input inputCommand = new Input(api);
            inputCommand.replyToReply(update.message());
        }

        handleCommand(update);
    }

    private void handleCommand(Update update) {
        String text = update.message().text();
        Command[] commands = { new Start(api), new Settings(api), new Lifx(api), new Hue(api), new Fritz(api) };

        Command command = Arrays.stream(commands)
                .filter(handler -> text.startsWith(handler.getCommand()))
                .findFirst()
                .orElse(new Fallback(api));

        command.reply(update);
    }
}
