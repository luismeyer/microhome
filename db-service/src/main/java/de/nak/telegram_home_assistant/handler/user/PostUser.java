package de.nak.telegram_home_assistant.handler.user;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import de.nak.telegram_home_assistant.Json;
import de.nak.telegram_home_assistant.handler.AHandler;
import de.nak.telegram_home_assistant.model.User;

import java.util.*;

public class PostUser extends AHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent requestEvent, Context context) {
        System.out.println("handle: " + requestEvent);
        Optional<APIGatewayProxyResponseEvent> errorResponse = defaultHandleRequest(requestEvent);
        if (errorResponse.isPresent()) {
            return errorResponse.get();
        }

        String id = requestEvent.getPathParameters().get("userId");
        if (id == null) {
            return Json.invalidDataResponse("Missing id in path");
        }

        Long telegramId = Long.parseLong(id);
        User newUser = new User()
                .setId(UUID.randomUUID().toString())
                .setTelegramId(telegramId)
                .setModules(new ArrayList<>());

        Optional<User> user = dynamoDBClient.mapper.scan(User.class, new DynamoDBScanExpression())
                .stream()
                .filter(u -> u.getTelegramId().equals(telegramId))
                .findFirst();

        if (user.isPresent()) {
            APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
            response.setStatusCode(200);
            return response;
        }

        dynamoDBClient.mapper.save(newUser);
        User savedUser = dynamoDBClient.mapper.load(User.class, newUser.getId());

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(201);
        response.setBody(gson.toJson(savedUser));
        return response;
    }
}
