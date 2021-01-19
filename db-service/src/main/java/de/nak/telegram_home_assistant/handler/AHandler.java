package de.nak.telegram_home_assistant.handler;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import de.nak.telegram_home_assistant.Json;
import de.nak.telegram_home_assistant.Security;
import de.nak.telegram_home_assistant.dynamodb.DynamoDBClient;

import java.util.Arrays;
import java.util.Optional;

public abstract class AHandler {

    public static final String USER_ID_PARAM = "userId";
    public static final String MODULE_ID_PARAM = "moduleId";
    public static final String DEVICE_ID_PARAM = "deviceId";


    protected final DynamoDBClient dynamoDBClient = new DynamoDBClient();
    protected final Gson gson = new Gson();
    protected APIGatewayProxyRequestEvent request;

    protected Optional<APIGatewayProxyResponseEvent> defaultHandleRequest(Class<?> type) {
        if (!Security.authorize(request)) {
            return Optional.of(Security.unauthorizedResponse("Not authorized"));
        }

        APIGatewayProxyResponseEvent errorResponse = Json.validateRequest(type, request);
        if (errorResponse != null) {
            return Optional.of(errorResponse);
        }

        return Optional.empty();
    }

    protected Optional<APIGatewayProxyResponseEvent> defaultHandleRequest() {
        if (!Security.authorize(request)) {
            return Optional.of(Security.unauthorizedResponse("Not authorized"));
        }

        return Optional.empty();
    }

    protected Optional<APIGatewayProxyResponseEvent> defaultHandleRequest(String... pathParams) {
        return Arrays.stream(pathParams)
                .filter(param -> request.getPathParameters().get(param) == null)
                .map(param -> Json.invalidDataResponse("Missing " + param + " in path"))
                .findFirst();
    }

}
