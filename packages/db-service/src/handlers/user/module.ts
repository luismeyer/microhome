import { APIGatewayProxyHandler } from "aws-lambda";
import { ModuleResponse } from "@microhome/types";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const getUserModule: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }
    const { userid, moduleid } = event.pathParameters;

    const userId = validateNumber(userid);
    if (!userId.success) {
      return errorResponse(userId.result);
    }

    const moduleId = validateNumber(moduleid);
    if (!moduleId.success) {
      return errorResponse(moduleId.result);
    }

    const user = await findUserByTelegramId(userId.result);
    if (!user) {
      return errorResponse("Wrong userId");
    }

    const module = user.modules.find(({ id }) => id === moduleId.result);
    if (!module) {
      return errorResponse("User is not subscribed to this serviceId");
    }

    const response: ModuleResponse = {
      id: module.id,
      name: module.name,
      serviceRequest: {
        serviceUrl: module.serviceUrl,
        body: {
          token: module.token,
          action: module.baseFunction.name,
        },
      },
    };

    return successResponse(stringify(response));
  }
);
