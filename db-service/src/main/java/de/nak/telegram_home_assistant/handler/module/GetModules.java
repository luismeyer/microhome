package de.nak.telegram_home_assistant.handler.module;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import de.nak.telegram_home_assistant.handler.AHandler;
import de.nak.telegram_home_assistant.model.Module;

import java.util.List;
import java.util.Optional;

public class GetModules extends AHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent request, Context context) {
        this.request = request;

        Optional<APIGatewayProxyResponseEvent> errorResponse = defaultHandleRequest();
        if (errorResponse.isPresent()) {
            return errorResponse.get();
        }

        List<Module> modules = dynamoDBClient.mapper.scan(Module.class, new DynamoDBScanExpression());

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        response.setBody(gson.toJson(modules));
        return response;
    }
}
