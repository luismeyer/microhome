import { APIGatewayProxyHandler } from "aws-lambda";
import { putItem, USER_TABLE } from "../../dynamodb";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const updateUserToken: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { userid, edittoken } = event.pathParameters;
    const { token } = event.queryStringParameters;

    if (!token) return errorResponse("Missing token");

    const { input, error } = validateNumber(userid);
    if (error) return errorResponse(error);

    const user = await findUserByTelegramId(input);
    if (!user) return errorResponse("Wrong userid");

    const module = user.modules.find((m) => m.token === edittoken);
    if (!module) return errorResponse("Wrong edittoken");

    module.token = token;

    return putItem(USER_TABLE, user)
      .then(() => successResponse(stringify(user)))
      .catch((error) =>
        errorResponse("Couldn't updater the user item: " + error)
      );
  }
);
