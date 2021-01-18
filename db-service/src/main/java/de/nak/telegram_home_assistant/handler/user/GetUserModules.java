package de.nak.telegram_home_assistant.handler.user;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import de.nak.telegram_home_assistant.Json;
import de.nak.telegram_home_assistant.controller.response.ModuleResponse;
import de.nak.telegram_home_assistant.controller.response.RandomString;
import de.nak.telegram_home_assistant.controller.response.ServiceRequest;
import de.nak.telegram_home_assistant.controller.response.ServiceRequestBody;
import de.nak.telegram_home_assistant.handler.AHandler;
import de.nak.telegram_home_assistant.model.Module;
import de.nak.telegram_home_assistant.model.User;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class GetUserModules extends AHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent requestEvent, Context context) {
        Optional<APIGatewayProxyResponseEvent> errorResponse = defaultHandleRequest(requestEvent);
        if (errorResponse.isPresent()) {
            return errorResponse.get();
        }

        String rawTelegramId = requestEvent.getPathParameters().get("userId");
        if (rawTelegramId == null) {
            return Json.invalidDataResponse("Missing telegram id");
        }

        Long telegramId = Long.parseLong(rawTelegramId);

        Optional<User> oUser = dynamoDBClient.mapper.scan(User.class, new DynamoDBScanExpression())
                .stream()
                .filter(u -> u.getTelegramId().equals(telegramId))
                .findFirst();

        if (!oUser.isPresent()) {
            return Json.invalidDataResponse("Wrong userid");
        }

        List<ModuleResponse> moduleResponses = oUser.get().getModules()
                .stream()
                .map(m -> new ModuleResponse()
                        .setId(m.getId())
                        .setName(m.getName()))
                .collect(Collectors.toList());

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        response.setBody(gson.toJson(moduleResponses));
        return response;
    }
}
