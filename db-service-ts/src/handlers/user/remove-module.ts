import { APIGatewayProxyHandler } from "aws-lambda";
import { getItem, MODULE_TABLE, putItem, USER_TABLE } from "../../dynamodb";
import { Module } from "../../models/module";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const removeUserModule: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { userid, moduleid } = event.pathParameters;

    const { input: userId, error: userError } = validateNumber(userid);
    if (userError) return errorResponse(userError);

    const { input: moduleId, error: moduleError } = validateNumber(moduleid);
    if (moduleError) return errorResponse(moduleError);

    const user = await findUserByTelegramId(userId);
    if (!user) return errorResponse("Wrong userId");

    const module = await getItem(MODULE_TABLE, { id: moduleId }).then(
      ({ Item }) => Item as Module | undefined
    );
    if (!module) return errorResponse("Wrong moduleId");

    user.modules = user.modules.filter(({ id }) => id !== moduleId);

    await putItem(USER_TABLE, user);

    return successResponse();
  }
);
