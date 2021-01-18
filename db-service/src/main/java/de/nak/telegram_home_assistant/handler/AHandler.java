package de.nak.telegram_home_assistant.handler;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import de.nak.telegram_home_assistant.Json;
import de.nak.telegram_home_assistant.Security;
import de.nak.telegram_home_assistant.dynamodb.DynamoDBClient;

import java.util.Optional;

public abstract class AHandler {

    protected final DynamoDBClient dynamoDBClient = new DynamoDBClient();
    protected final Gson gson = new Gson();

    protected Optional<APIGatewayProxyResponseEvent> defaultHandleRequest(APIGatewayProxyRequestEvent request, Class<?> type) {
        if (!Security.authorize(request)) {
            return Optional.of(Security.unauthorizedResponse());
        }

        APIGatewayProxyResponseEvent errorResponse = Json.validateRequest(type, request);
        if (errorResponse != null) {
            return Optional.of(errorResponse);
        }

        return Optional.empty();
    }

    protected Optional<APIGatewayProxyResponseEvent> defaultHandleRequest(APIGatewayProxyRequestEvent request) {
        if (!Security.authorize(request)) {
            return Optional.of(Security.unauthorizedResponse());
        }

        return Optional.empty();
    }
}
