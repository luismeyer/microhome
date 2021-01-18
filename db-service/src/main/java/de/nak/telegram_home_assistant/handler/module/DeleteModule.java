package de.nak.telegram_home_assistant.handler.module;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import de.nak.telegram_home_assistant.Json;
import de.nak.telegram_home_assistant.handler.AHandler;
import de.nak.telegram_home_assistant.model.Module;

import java.util.*;

public class DeleteModule extends AHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent request, Context context) {
        Optional<APIGatewayProxyResponseEvent> errorResponse = defaultHandleRequest(request);
        if (errorResponse.isPresent()) {
            return errorResponse.get();
        }

        String id = request.getPathParameters().get("moduleId");
        if (id == null) {
            return Json.invalidDataResponse("Missing id in path");
        }

        dynamoDBClient.mapper.delete(new Module().setId(Integer.parseInt(id)));

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        return response;
    }
}
