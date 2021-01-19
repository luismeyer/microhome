package de.nak.telegram_home_assistant.handler.user;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import de.nak.telegram_home_assistant.handler.AHandler;
import de.nak.telegram_home_assistant.model.User;

import java.util.List;
import java.util.Optional;

public class GetUsers extends AHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent requestEvent, Context context) {
        this.request = requestEvent;
        
        Optional<APIGatewayProxyResponseEvent> errorResponse = defaultHandleRequest();
        if (errorResponse.isPresent()) {
            return errorResponse.get();
        }

        List<User> users = dynamoDBClient.mapper.scan(User.class, new DynamoDBScanExpression());

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        response.setBody(gson.toJson(users));
        return response;
    }
}
