import { APIGatewayProxyHandler } from "aws-lambda";
import { v1 } from "uuid";
import { getItem, MODULE_TABLE, putItem, USER_TABLE } from "../../dynamodb";
import { Module, ServiceRequest } from "../../models/module";
import { findUserByTelegramId } from "../../models/user";
import {
  errorResponse,
  stringify,
  successResponse,
  unauthorizedResponse,
} from "../../response";
import { authorized, validateNumber } from "../../validation/access";

export const addUserModule: APIGatewayProxyHandler = async (event) => {
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

  const module = await getItem(MODULE_TABLE, { id: moduleId }).then(
    (res) => res.Item as Module | undefined
  );
  if (!module) return errorResponse("Wrong moduleId");

  const editToken = v1();
  module.token = editToken;

  user.modules = [...user.modules, module];

  await putItem(USER_TABLE, user);

  const response: ServiceRequest = {
    serviceUrl: module.serviceUrl,
    serviceBody: {
      token: module.token,
      action: module.baseAction,
      deviceId: "",
    },
  };

  return successResponse(stringify(response));
};
