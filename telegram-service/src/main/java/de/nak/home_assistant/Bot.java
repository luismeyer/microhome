package de.nak.home_assistant;

import de.nak.home_assistant.commands.*;
import de.nak.home_assistant.models.telegram.Command;
import org.telegram.abilitybots.api.bot.AbilityBot;
import org.telegram.abilitybots.api.objects.Flag;
import org.telegram.abilitybots.api.objects.Reply;
import org.telegram.abilitybots.api.util.AbilityExtension;
import org.telegram.telegrambots.meta.api.methods.commands.SetMyCommands;
import org.telegram.telegrambots.meta.api.objects.commands.BotCommand;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.telegram.abilitybots.api.util.AbilityUtils.getChatId;

public class Bot extends AbilityBot {

    public static List<Command> FIXED_COMMANDS = Arrays.asList(Start.COMMAND, Settings.COMMAND);

    protected Bot() {
        super(Env.getBotToken(), Env.getBotUsername());

        SetMyCommands setMyCommands = SetMyCommands
                .builder()
                .commands(FIXED_COMMANDS
                        .stream()
                        .map(c -> BotCommand
                                .builder()
                                .command(c.getName())
                                .description(c.getDescription())
                                .build())
                        .collect(Collectors.toList()))
                .build();

        try {
            sender.execute(setMyCommands);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    @Override
    public int creatorId() {
        // Not necessary
        return 0;
    }

    public Reply replyToButtons() {
        Callback callback = new Callback(sender);

        return Reply.of(upd ->
                callback.replyToButtons(getChatId(upd), upd.getCallbackQuery()),
                Flag.CALLBACK_QUERY);
    }

    public Reply replyToText() {
        Input inputCommand = new Input(sender);
        return Reply.of(upd -> {
            try {
                inputCommand.replyToReply(upd.getMessage());
            } catch (TelegramApiException e) {
                        e.printStackTrace();
            }
        },
        Flag.REPLY);
    }

    public AbilityExtension start() {
        return new Start(sender);
    }
    public AbilityExtension settings() {
        return new Settings(sender);
    }

    public AbilityExtension lifx() {
        return new Lifx(sender);
    }
    public AbilityExtension hue() {
        return new Hue(sender);
    }
    public AbilityExtension fritz() {
        return new Fritz(sender);
    }

}
