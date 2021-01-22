import { APIGatewayProxyHandler } from "aws-lambda";
import { putItem, USER_TABLE } from "../../dynamodb";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const updateUserModuleToken: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { userid, moduleid } = event.pathParameters;
    const { token } = event.queryStringParameters;

    if (!token) return errorResponse("Missing token");

    const { input: userId, error: userError } = validateNumber(userid);
    if (userError) return errorResponse(userError);

    const { input: moduleId, error: moduleError } = validateNumber(moduleid);
    if (moduleError) return errorResponse(moduleError);

    const user = await findUserByTelegramId(userId);
    if (!user) return errorResponse("Wrong userid");

    const module = user.modules.find((m) => m.id === moduleId);
    if (!module) return errorResponse("Wrong edittoken");

    module.token = token;

    return putItem(USER_TABLE, user)
      .then(() => successResponse(stringify(user)))
      .catch((error) =>
        errorResponse("Couldn't updater the user item: " + error)
      );
  }
);
