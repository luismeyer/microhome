import { APIGatewayProxyHandler } from "aws-lambda";
import { FunctionsResponse } from "../../models/module";
import { findUserByTelegramId } from "../../models/user";
import {
  errorResponse,
  stringify,
  successResponse,
  unauthorizedResponse,
} from "../../response";
import { authorized, validateNumber } from "../../validation/access";

export const getUserModuleDevice: APIGatewayProxyHandler = async (event) => {
  const isAuthorized = authorized(event);
  if (!isAuthorized) return unauthorizedResponse();

  const { deviceid, userid, moduleid } = event.pathParameters;

  const { input: userId, error: userError } = validateNumber(userid);
  if (userError) return errorResponse(userError);

  const { input: moduleId, error: moduleError } = validateNumber(moduleid);
  if (moduleError) return errorResponse(moduleError);

  const user = await findUserByTelegramId(userId);
  if (!user) return errorResponse("Wrong userId");

  const module = user.modules.find(({ id }) => id === moduleId);
  if (!module) return errorResponse("Wrong moduleId");

  const response: FunctionsResponse = {
    functions: module.functions,
    serviceRequest: {
      serviceUrl: module.serviceUrl,
      serviceBody: {
        token: module.token,
        action: "get",
        deviceId: deviceid,
      },
    },
  };

  return successResponse(stringify(response));
};
