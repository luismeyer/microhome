package de.nak.telegram_home_assistant.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import de.nak.telegram_home_assistant.dynamodb.DynamoDBClient;
import de.nak.telegram_home_assistant.model.Module;
import de.nak.telegram_home_assistant.model.request.CreateModuleRequest;

import java.util.UUID;

public class ModuleHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent request, Context context) {
        DynamoDBClient client = new DynamoDBClient();
        Gson gson = new Gson();

        System.out.println();
        CreateModuleRequest input = gson.fromJson(request.getBody(), CreateModuleRequest.class);

        Module module = new Module()
                .setId(UUID.randomUUID().toString())
                 .setName(input.getName())
                 .setBaseAction(input.getBaseAction())
                .setFunctions(input.getFunctions())
                .setServiceURL(input.getServiceUrl());

        client.mapper.save(module);

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        response.setBody(gson.toJson(module));
        return response;
    }
}
