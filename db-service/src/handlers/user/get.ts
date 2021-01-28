import { APIGatewayProxyHandler } from "aws-lambda";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const getUser: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { input: userId, error: idError } = validateNumber(
      event.pathParameters.userid
    );
    if (idError) return errorResponse(idError);

    const existingUser = await findUserByTelegramId(userId);
    if (!existingUser) return errorResponse("Wrong userid");

    return successResponse(stringify(existingUser));
  }
);
