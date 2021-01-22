package de.nak.home_assistant;

import java.util.HashMap;
import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import com.pengrad.telegrambot.model.Update;

import static de.nak.home_assistant.Env.checkEnvVariables;

/**
 * Handler for requests to Lambda function.
 */
public class Handler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(final APIGatewayProxyRequestEvent input, final Context context) {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent().withHeaders(headers);

        if (input.getBody() == null) {
            return response.withStatusCode(400).withBody("{ \"error\": \"Missing Event body\" }");
        }

        try {
            checkEnvVariables();
        } catch (Exception e) {
            e.printStackTrace();
        }

        Update update = new Gson().fromJson(input.getBody(), Update.class);
        Bot bot = new Bot();
        bot.handleUpdate(update);

        return response.withStatusCode(200).withBody("{ \"success\": true }");
    }
}
