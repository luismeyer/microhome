package de.nak.telegram_home_assistant.handler.user;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import de.nak.telegram_home_assistant.Json;
import de.nak.telegram_home_assistant.controller.response.RandomString;
import de.nak.telegram_home_assistant.handler.AHandler;
import de.nak.telegram_home_assistant.model.Module;
import de.nak.telegram_home_assistant.model.User;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class PutUserModule extends AHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent requestEvent, Context context) {
        Optional<APIGatewayProxyResponseEvent> errorResponse = defaultHandleRequest(requestEvent);
        if (errorResponse.isPresent()) {
            return errorResponse.get();
        }

        String rawTelegramId = requestEvent.getPathParameters().get("userId");
        String rawModuleId = requestEvent.getPathParameters().get("moduleId");

        if (rawTelegramId == null || rawModuleId == null) {
            return Json.invalidDataResponse("Missing path parameters");
        }

        Long telegramId = Long.parseLong(rawTelegramId);
        int moduleId = Integer.parseInt(rawModuleId);

        Optional<User> oUser = dynamoDBClient.mapper.scan(User.class, new DynamoDBScanExpression())
                .stream()
                .filter(u -> u.getTelegramId().equals(telegramId))
                .findFirst();

        String editToken = new RandomString().nextString();
        Module module = dynamoDBClient.mapper.load(Module.class, moduleId).setToken(editToken);

        if (!oUser.isPresent()) {
            return Json.invalidDataResponse("Wrong userid");
        }

        if (module == null) {
            return Json.invalidDataResponse("Wrong moduleid");
        }

        User user = oUser.get();
        List<Module> newModules = user.getModules()
                .stream()
                .filter(m -> m.getId() != module.getId())
                .collect(Collectors.toList());

        newModules.add(module);
        user.setModules(newModules);

        dynamoDBClient.mapper.save(user);

        User updatedUser = dynamoDBClient.mapper.load(User.class, user.getId());
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        response.setBody(gson.toJson(updatedUser));
        return response;
    }
}
