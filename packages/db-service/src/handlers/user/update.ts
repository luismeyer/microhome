import { APIGatewayProxyHandler } from "aws-lambda";
import { User } from "@microhome/types";
import { putItem, userTableName } from "../../db";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";
import { validateUserInput } from "../../validation/user";

export const updateUser: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const userId = validateNumber(event.pathParameters?.userid);
    if (!userId.success) {
      return errorResponse(userId.result);
    }

    const userInput = validateUserInput(event.body ?? undefined);
    if (!userInput.success) {
      return errorResponse(userInput.result);
    }

    const existingUser = await findUserByTelegramId(userId.result);
    if (!existingUser) {
      return errorResponse("Wrong userId");
    }

    const user: User = {
      ...existingUser,
      language: userInput.result.language,
    };

    return putItem(userTableName, user)
      .then((response) => {
        if (!response.success) {
          return errorResponse(response.result);
        }

        return successResponse(stringify(user));
      })
      .catch((error) =>
        errorResponse("Couldn't update the user item: " + error)
      );
  }
);
