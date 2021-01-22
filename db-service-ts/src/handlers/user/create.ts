import { APIGatewayProxyHandler } from "aws-lambda";
import { v1 } from "uuid";
import { putItem, USER_TABLE } from "../../dynamodb";
import { findUserByTelegramId, User } from "../../models/user";
import {
  errorResponse,
  stringify,
  successResponse,
  unauthorizedResponse,
} from "../../response";
import { authorized, validateNumber } from "../../validation/access";

export const createUser: APIGatewayProxyHandler = async (event, context) => {
  const isAuthorized = authorized(event);
  if (!isAuthorized) return unauthorizedResponse();

  const { input, error } = validateNumber(event.pathParameters.id);
  if (error) return errorResponse(error);

  const existingUser = await findUserByTelegramId(input);
  if (existingUser) return successResponse(stringify(existingUser));

  const user: User = {
    id: v1(),
    telegramId: input,
    modules: [],
  };

  return putItem(USER_TABLE, user)
    .then(() => successResponse(stringify(user)))
    .catch((error) => errorResponse("Couldn't create the user item: " + error));
};
