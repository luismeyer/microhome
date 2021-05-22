import { APIGatewayProxyHandler } from "aws-lambda";
import { putItem, userTableName } from "../../dynamodb";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const updateUserModuleToken: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    if (!event.queryStringParameters) {
      return errorResponse("Missing 'queryStringParameters'");
    }

    const { userid, moduleid } = event.pathParameters;
    const { token } = event.queryStringParameters;

    if (!token) {
      return errorResponse("Missing token");
    }

    const userId = validateNumber(userid);
    if (!userId.success) {
      return errorResponse(userId.result);
    }

    const moduleId = validateNumber(moduleid);
    if (!moduleId.success) {
      return errorResponse(moduleId.result);
    }

    const user = await findUserByTelegramId(userId.result);
    if (!user) return errorResponse("Wrong userid");

    const module = user.modules.find((m) => m.id === moduleId.result);
    if (!module) return errorResponse("Wrong edittoken");

    module.token = token;

    return putItem(userTableName, user)
      .then(() => successResponse(stringify(user)))
      .catch((error) =>
        errorResponse("Couldn't updater the user item: " + error)
      );
  }
);
