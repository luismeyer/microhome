package de.nak.telegram_home_assistant.handler.module;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import de.nak.telegram_home_assistant.handler.AHandler;
import de.nak.telegram_home_assistant.model.Module;

import java.util.*;

public class PostModule extends AHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent request, Context context) {
        this.request = request;

        Optional<APIGatewayProxyResponseEvent> errorResponse = defaultHandleRequest(Module.class);
        if (errorResponse.isPresent()) {
            return errorResponse.get();
        }

        Module input = gson.fromJson(request.getBody(), Module.class);

        dynamoDBClient.mapper.scan(Module.class, new DynamoDBScanExpression())
                .stream()
                .filter(m -> m.getName().equals(input.getName()))
                .findFirst()
                .ifPresent(m -> input.setId(m.getId()));

        dynamoDBClient.mapper.save(input);

        Module savedModule = dynamoDBClient.mapper.load(Module.class, input.getId());
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(201);
        response.setBody(gson.toJson(savedModule));
        return response;
    }
}
