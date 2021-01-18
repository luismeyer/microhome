package de.nak.telegram_home_assistant.handler.user;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import de.nak.telegram_home_assistant.Json;
import de.nak.telegram_home_assistant.handler.AHandler;
import de.nak.telegram_home_assistant.model.User;

import java.util.*;

public class DeleteUser extends AHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent requestEvent, Context context) {
        Optional<APIGatewayProxyResponseEvent> errorResponse = defaultHandleRequest(requestEvent);
        if (errorResponse.isPresent()) {
            return errorResponse.get();
        }

        String id = requestEvent.getPathParameters().get("id");
        if (id == null) {
            return Json.invalidDataResponse("Missing id in path");
        }

        dynamoDBClient.mapper.delete(new User().setId(id));

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        return response;
    }
}
