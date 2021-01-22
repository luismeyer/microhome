import { APIGatewayProxyHandler } from "aws-lambda";
import { ModuleResponse } from "../../models/module";
import { findUserByTelegramId } from "../../models/user";
import {
  errorResponse,
  stringify,
  successResponse,
  unauthorizedResponse,
} from "../../response";
import { authorized, validateNumber } from "../../validation/access";

export const getUserModule: APIGatewayProxyHandler = async (event) => {
  const isAuthorized = authorized(event);
  if (!isAuthorized) return unauthorizedResponse();

  const { input: userId, error: userError } = validateNumber(
    event.pathParameters.userid
  );
  if (userError) return errorResponse(userError);

  const { input: moduleId, error: moduleError } = validateNumber(
    event.pathParameters.moduleid
  );
  if (moduleError) return errorResponse(moduleError);

  const user = await findUserByTelegramId(userId);
  if (!user) return errorResponse("Wrong userId");

  const module = user.modules.find(({ id }) => id === moduleId);
  if (!module) return errorResponse("Wrong moduleId");

  const response: ModuleResponse = {
    id: module.id,
    name: module.name,
    serviceRequest: {
      serviceUrl: module.serviceUrl,
      serviceBody: {
        token: module.token,
        action: module.baseAction,
        deviceId: "",
      },
    },
  };

  return successResponse(stringify(response));
};
