package de.nak.telegram_home_assistant;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import de.nak.telegram_home_assistant.model.response.ErrorResponseBody;

import java.util.Base64;
import java.util.Collections;

public class Security {

    private static String getUser() {
        return System.getenv("AUTH_USER");
    }

    private static String getPassword() {
        return System.getenv("AUTH_PASSWORD");
    }

    private static void checkEnvVariables() {
        if (getUser() == null) {
            throw new Error("Missing Env Variable: 'AUTH_USER'");
        }

        if (getPassword() == null) {
            throw new Error("Missing Env Variable: 'AUTH_PASSWORD'");
        }
    }

    public static String createToken() {
        checkEnvVariables();

        String user = getUser();
        String password = getPassword();

        String token = user + ":" + password;
        return Base64.getEncoder().encodeToString(token.getBytes());
    }

    public static boolean authorize(APIGatewayProxyRequestEvent request) {
        String authHeader = request.getHeaders().get("Authorization");

        if (authHeader != null) {
            String token = createToken();
            return authHeader.equals("Basic " + token);
        }

        return false;
    }

    public static APIGatewayProxyResponseEvent unauthorizedResponse(String message) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(401);

        ErrorResponseBody body = new ErrorResponseBody()
                .setMessages(Collections.singletonList(message));
        response.setBody(new Gson().toJson(body));
        return response;
    }
}
