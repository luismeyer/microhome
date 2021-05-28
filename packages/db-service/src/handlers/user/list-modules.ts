import { APIGatewayProxyHandler } from "aws-lambda";
import { ModuleResponse } from "@microhome/types";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const listUserModules: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    const userId = validateNumber(event.pathParameters.userid);
    if (!userId.success) {
      return errorResponse(userId.result);
    }

    const user = await findUserByTelegramId(userId.result);
    if (!user) {
      return errorResponse("Wrong userId");
    }

    const response: ModuleResponse[] = user.modules.map((module) => ({
      id: module.id,
      name: module.name,
      serviceRequest: {
        serviceUrl: module.serviceUrl,
        body: {
          token: module.token,
        },
      },
    }));

    return successResponse(stringify(response));
  }
);
