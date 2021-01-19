package de.nak.telegram_home_assistant.handler.user;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import de.nak.telegram_home_assistant.Json;
import de.nak.telegram_home_assistant.dynamodb.UserRepository;
import de.nak.telegram_home_assistant.handler.AHandler;
import de.nak.telegram_home_assistant.model.User;

import java.util.Optional;
import java.util.stream.Collectors;

public class DeleteUserModule extends AHandler
        implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent requestEvent, Context context) {
        this.request = requestEvent;

        Optional<APIGatewayProxyResponseEvent> errorResponse = defaultHandleRequest(USER_ID_PARAM, MODULE_ID_PARAM);
        if (errorResponse.isPresent()) {
            return errorResponse.get();
        }

        String telegramId = requestEvent.getPathParameters().get(USER_ID_PARAM);
        String moduleId = requestEvent.getPathParameters().get(MODULE_ID_PARAM);

        Optional<User> oUser = new UserRepository(dynamoDBClient).findUserByTelegramId(Long.parseLong(telegramId));

        if (!oUser.isPresent()) {
            return Json.invalidDataResponse("Wrong userid");
        }

        User user = oUser.get();

        user.setModules(user.getModules().stream().filter(u -> u.getId() != Integer.parseInt(moduleId))
                .collect(Collectors.toList()));

        dynamoDBClient.mapper.save(user);

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        response.setBody(gson.toJson(user));
        return response;
    }
}
