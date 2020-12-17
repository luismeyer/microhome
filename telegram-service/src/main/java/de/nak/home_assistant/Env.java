package de.nak.home_assistant;

public class Env {

    private final static String dbUrl = "DB_URL";
    private final static String dbToken = "DB_TOKEN";
    private final static String botToken = "BOT_TOKEN";
    private final static String botUsername = "BOT_USERNAME";

    public static String getDBUrl() {
        return System.getenv(dbUrl);
    }

    public static String getDBToken() {
        return System.getenv(dbToken);
    }

    public static String getBotToken() {
        return System.getenv(botToken);
    }

    public static String getBotUsername() {
        return System.getenv(botUsername);
    }

    public static void checkEnvVariables() throws Exception {
        String baseError = "Missing Env Variable: ";

        if (getDBToken() == null) {
            throw new Exception(baseError + dbToken);
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
