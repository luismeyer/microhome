import { APIGatewayProxyHandler } from "aws-lambda";
import { v1 } from "uuid";
import { putItem, USER_TABLE } from "../../dynamodb";
import { findUserByTelegramId, User } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const createUser: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { input, error } = validateNumber(event.pathParameters.userid);
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
      .catch((error) =>
        errorResponse("Couldn't create the user item: " + error)
      );
  }
);
