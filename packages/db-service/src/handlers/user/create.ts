import { APIGatewayProxyHandler } from "aws-lambda";
import { User } from "@telegram-home-assistant/types";
import { v1 } from "uuid";
import { putItem, userTableName } from "../../db";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const createUser: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    const userId = validateNumber(event.pathParameters.userid);
    if (!userId.success) {
      return errorResponse(userId.result);
    }

    const existingUser = await findUserByTelegramId(userId.result);
    if (existingUser) return successResponse(stringify(existingUser));

    const user: User = {
      id: v1(),
      telegramId: userId.result,
      modules: [],
      language: "en",
    };

    return putItem(userTableName, user)
      .then((response) => {
        if (!response.success) {
          return errorResponse(response.result);
        }

        return successResponse(stringify(user));
      })
      .catch((error) =>
        errorResponse("Couldn't create the user item: " + error)
      );
  }
);
