import { APIGatewayProxyHandler } from "aws-lambda";
import { User } from "telegram-home-assistant-types";
import { putItem, USER_TABLE } from "../../dynamodb";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";
import { validateUserInput } from "../../validation/user";

export const updateUser: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { input: userId, error: idError } = validateNumber(
      event.pathParameters.userid
    );
    if (idError) return errorResponse(idError);

    const { input, error } = validateUserInput(event.body);
    if (error) return errorResponse(error);

    const existingUser = await findUserByTelegramId(userId);
    if (!existingUser) return errorResponse("Wrong userId");

    const user: User = {
      ...existingUser,
      language: input.language,
    };

    return putItem(USER_TABLE, user)
      .then(() => successResponse(stringify(user)))
      .catch((error) =>
        errorResponse("Couldn't update the user item: " + error)
      );
  }
);
