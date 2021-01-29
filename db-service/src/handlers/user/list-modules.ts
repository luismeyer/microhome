import { APIGatewayProxyHandler } from "aws-lambda";
import { ModuleResponse } from "telegram-home-assistant-types";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const listUserModules: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { input: userId, error } = validateNumber(
      event.pathParameters.userid
    );
    if (error) return errorResponse(error);

    const user = await findUserByTelegramId(userId);
    if (!user) return errorResponse("Wrong userId");

    const response: ModuleResponse[] = user.modules.map((module) => ({
      id: module.id,
      name: module.name,
      serviceRequest: {
        serviceUrl: module.serviceUrl,
        body: {
          token: module.token,
          deviceId: "",
          action: "",
        },
      },
    }));

    return successResponse(stringify(response));
  }
);
