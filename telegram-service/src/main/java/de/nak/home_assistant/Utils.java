package de.nak.home_assistant;

public class Utils {

    public static String[] messageArgs(String text, String command) {
        return text
                .replace(command, "")
                .split(" ");
    }

}
