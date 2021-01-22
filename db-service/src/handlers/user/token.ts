import { APIGatewayProxyHandler } from "aws-lambda";
import { putItem, USER_TABLE } from "../../dynamodb";
import { findUserByEditToken } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";

export const updateUserToken: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { edittoken } = event.pathParameters;
    const { token } = event.queryStringParameters;

    if (!token) return errorResponse("Missing token");

    const user = await findUserByEditToken(edittoken);
    if (!user) return errorResponse("Couldn't find user");

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
