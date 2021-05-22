import { APIGatewayProxyHandler } from "aws-lambda";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const getUser: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    const userId = validateNumber(event.pathParameters.userid);
    if (!userId.success) {
      return errorResponse(userId.result);
    }

    const existingUser = await findUserByTelegramId(userId.result);
    if (!existingUser) return errorResponse("Wrong userid");

    return successResponse(stringify(existingUser));
  }
);
