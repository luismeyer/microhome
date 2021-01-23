package de.nak.home_assistant;

import java.util.Base64;

public class Env {

    private final static String dbUrl = "DB_SERVICE_URL";
    private final static String dbUser = "DB_AUTH_USER";
    private final static String dbPassword = "DB_AUTH_PASSWORD";
    private final static String botToken = "BOT_TOKEN";
    private final static String botUsername = "BOT_USERNAME";

    public static String getDBUrl() {
        return System.getenv(dbUrl);
    }

    public static String getBotToken() {
        return System.getenv(botToken);
    }

    public static String getBotUsername() {
        return System.getenv(botUsername);
    }

    public static String getDBUser() {
        return System.getenv(dbUser);
    }

    public static String getDBPassword() {
        return System.getenv(dbPassword);
    }

    public static String getDBToken() {
        String token = getDBUser() + ":" + getDBPassword();
        return Base64.getEncoder().encodeToString(token.getBytes());
    }

    public static void checkEnvVariables() throws Exception {
        String baseError = "Missing Env Variable: ";

        if (getDBUser() == null) {
            throw new Exception(baseError + dbUser);
        }

        if (getDBPassword() == null) {
            throw new Exception(baseError + dbPassword);
        }

        if (getDBUrl() == null) {
            throw new Exception(baseError + dbUrl);
        }

        if (getBotToken() == null) {
            throw new Exception(baseError + botToken);
        }

        if (getBotUsername() == null) {
            throw new Exception(baseError + botUsername);
        }
    }
}
