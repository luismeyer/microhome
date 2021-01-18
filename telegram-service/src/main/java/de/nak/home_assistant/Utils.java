package de.nak.home_assistant;

import java.util.Arrays;

public class Utils {

    public static String[] messageArgs(String text) {
        String[] tmp = text.split(" ");
        return Arrays.copyOfRange(tmp, 1, tmp.length);
    }

}
