package de.nak.telegram_home_assistant.handler.user;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import de.nak.telegram_home_assistant.Json;
import de.nak.telegram_home_assistant.controller.response.RandomString;
import de.nak.telegram_home_assistant.controller.response.ServiceRequest;
import de.nak.telegram_home_assistant.controller.response.ServiceRequestBody;
import de.nak.telegram_home_assistant.dynamodb.UserRepository;
import de.nak.telegram_home_assistant.handler.AHandler;
import de.nak.telegram_home_assistant.model.Module;
import de.nak.telegram_home_assistant.model.User;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class PutUserModule extends AHandler
        implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent requestEvent, Context context) {
        this.request = requestEvent;

        Optional<APIGatewayProxyResponseEvent> errorResponse = defaultHandleRequest(USER_ID_PARAM, MODULE_ID_PARAM);
        if (errorResponse.isPresent()) {
            return errorResponse.get();
        }

        String rawTelegramId = requestEvent.getPathParameters().get(USER_ID_PARAM);
        String rawModuleId = requestEvent.getPathParameters().get(MODULE_ID_PARAM);

        Long telegramId = Long.parseLong(rawTelegramId);
        int moduleId = Integer.parseInt(rawModuleId);

        UserRepository userRepository = new UserRepository(dynamoDBClient);
        Optional<User> oUser = userRepository.findUserByTelegramId(telegramId);

        String editToken = new RandomString().nextString();
        Module module = dynamoDBClient.mapper.load(Module.class, moduleId).setToken(editToken);

        if (!oUser.isPresent()) {
            return Json.invalidDataResponse("Wrong userid");
        }

        if (module == null) {
            return Json.invalidDataResponse("Wrong moduleid");
        }

        User user = oUser.get();
        List<Module> newModules = user.getModules().stream().filter(m -> m.getId() != module.getId())
                .collect(Collectors.toList());

        newModules.add(module);
        user.setModules(newModules);

        dynamoDBClient.mapper.save(user);

        User updatedUser = dynamoDBClient.mapper.load(User.class, user.getId());
        Module updatedModule = userRepository.findUserModule(updatedUser, moduleId).orElse(null);

        if (updatedModule == null) {
            return Json.invalidDataResponse("Something went wrong");
        }

        ServiceRequest serviceRequest = new ServiceRequest().setServiceUrl(updatedModule.getServiceUrl())
                .setBody(new ServiceRequestBody().setAction("auth").setData(updatedModule.getToken()));

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        response.setBody(gson.toJson(serviceRequest));
        return response;
    }
}
