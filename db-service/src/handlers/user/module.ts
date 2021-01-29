import { APIGatewayProxyHandler } from "aws-lambda";
import { ModuleResponse } from "telegram-home-assistant-types";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const getUserModule: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { userid, moduleid } = event.pathParameters;

    const { input: userId, error: userError } = validateNumber(userid);
    if (userError) return errorResponse(userError);

    const { input: moduleId, error: moduleError } = validateNumber(moduleid);
    if (moduleError) return errorResponse(moduleError);

    const user = await findUserByTelegramId(userId);
    if (!user) return errorResponse("Wrong userId");

    const module = user.modules.find(({ id }) => id === moduleId);
    if (!module)
      return errorResponse("User is not subscribed to this serviceId");

    const response: ModuleResponse = {
      id: module.id,
      name: module.name,
      serviceRequest: {
        serviceUrl: module.serviceUrl,
        body: {
          token: module.token,
          action: module.baseAction,
          deviceId: "",
        },
      },
    };

    return successResponse(stringify(response));
  }
);
