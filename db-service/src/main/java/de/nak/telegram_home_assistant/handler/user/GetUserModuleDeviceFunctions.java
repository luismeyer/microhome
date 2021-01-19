package de.nak.telegram_home_assistant.handler.user;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import de.nak.telegram_home_assistant.handler.AHandler;

import java.util.Optional;

public class GetUserModuleDeviceFunctions extends AHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent requestEvent, Context context) {
        this.request = requestEvent;

        Optional<APIGatewayProxyResponseEvent> errorResponse = defaultHandleRequest(USER_ID_PARAM, MODULE_ID_PARAM, DEVICE_ID_PARAM);
        if (errorResponse.isPresent()) {
            return errorResponse.get();
        }

        String userIdParam = requestEvent.getPathParameters().get(USER_ID_PARAM);
        String moduleIdParam = requestEvent.getPathParameters().get(MODULE_ID_PARAM);
        String deviceIdParam = requestEvent.getPathParameters().get(DEVICE_ID_PARAM);

        System.out.println(userIdParam);

        return null;
    }
}
