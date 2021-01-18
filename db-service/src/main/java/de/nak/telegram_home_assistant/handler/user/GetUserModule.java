package de.nak.telegram_home_assistant.handler.user;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import de.nak.telegram_home_assistant.Json;
import de.nak.telegram_home_assistant.controller.response.ServiceRequest;
import de.nak.telegram_home_assistant.controller.response.ServiceRequestBody;
import de.nak.telegram_home_assistant.dynamodb.UserRepository;
import de.nak.telegram_home_assistant.handler.AHandler;
import de.nak.telegram_home_assistant.model.Module;
import de.nak.telegram_home_assistant.model.User;
import de.nak.telegram_home_assistant.model.response.ModuleServiceResponse;

import java.util.Optional;

public class GetUserModule extends AHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent requestEvent, Context context) {
        Optional<APIGatewayProxyResponseEvent> errorResponse = defaultHandleRequest(requestEvent);
        if (errorResponse.isPresent()) {
            return errorResponse.get();
        }

        String telegramId = requestEvent.getPathParameters().get("userId");
        String moduleId =   requestEvent.getPathParameters().get("moduleId");
        if (telegramId == null || moduleId == null) {
            return Json.invalidDataResponse("Missing path parameters\")");
        }

        UserRepository userRepository = new UserRepository(dynamoDBClient);

        Optional<User> oUser = userRepository.findUserByTelegramId(Long.parseLong(telegramId));
        if (!oUser.isPresent()) {
            return Json.invalidDataResponse("Wrong userid");
        }

        Optional<Module> oModule = userRepository.findUserModule(oUser.get(), Integer.parseInt(moduleId));
        if (!oModule.isPresent()) {
            return Json.invalidDataResponse("Wrong moduleid");
        }
        Module module = oModule.get();

        ModuleServiceResponse moduleResponse = new ModuleServiceResponse()
                .setId(module.getId())
                .setName(module.getName())
                .setServiceRequest(new ServiceRequest()
                        .setServiceUrl(module.getServiceUrl())
                        .setBody(new ServiceRequestBody()
                                .setAction(module.getBaseAction())
                                .setToken(module.getToken())));

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        response.setBody(gson.toJson(moduleResponse));
        return response;
    }
}
