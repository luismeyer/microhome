package de.nak.home_assistant;

import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

import static de.nak.home_assistant.Env.checkEnvVariables;

public class Main {

    public static void main(String[] args) throws Exception {
        checkEnvVariables();

        try {

            TelegramBotsApi telegramBotsApi = new TelegramBotsApi(DefaultBotSession.class);
            telegramBotsApi.registerBot(new Bot());
            System.out.println("Bot is running...");

        } catch (TelegramApiException e) {
            System.out.println(e.toString());
            e.printStackTrace();
        }
    }
}
