import { APIGatewayProxyHandler } from "aws-lambda";
import { FunctionsResponse } from "@telegram-home-assistant/types";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const getUserModuleDevice: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    const { deviceid, userid, moduleid } = event.pathParameters;

    if (!deviceid) {
      return errorResponse("Missing 'deviceid' in 'pathParameters'");
    }

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
    if (!module) return errorResponse("Wrong moduleId");

    const response: FunctionsResponse = {
      functions: module.functions,
      serviceRequest: {
        serviceUrl: module.serviceUrl,
        body: {
          token: module.token,
          action: "get",
          deviceId: deviceid,
        },
      },
    };

    return successResponse(stringify(response));
  }
);
