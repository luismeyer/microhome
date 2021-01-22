import { APIGatewayProxyHandler } from "aws-lambda";
import { ServiceRequest } from "../../models/module";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const getUserModuleDeviceFunction: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const {
      deviceid,
      userid,
      moduleid,
      function: moduleFunction,
    } = event.pathParameters;

    const { input: userId, error: userError } = validateNumber(userid);
    if (userError) return errorResponse(userError);

    const { input: moduleId, error: moduleError } = validateNumber(moduleid);
    if (moduleError) return errorResponse(moduleError);

    const user = await findUserByTelegramId(userId);
    if (!user) return errorResponse("Wrong userId");

    const module = user.modules.find(({ id }) => id === moduleId);
    if (!module) return errorResponse("Wrong moduleId");

    const response: ServiceRequest = {
      serviceUrl: module.serviceUrl,
      body: {
        token: module.token,
        action: moduleFunction,
        deviceId: deviceid,
      },
    };

    return successResponse(stringify(response));
  }
);
