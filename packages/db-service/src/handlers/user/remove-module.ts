import { ModuleInput } from "@telehome/types";
import { APIGatewayProxyHandler } from "aws-lambda";
import { putItem, userTableName } from "../../db";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const removeUserModule: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    const { userid, moduleid } = event.pathParameters;

    const userId = validateNumber(userid);
    if (!userId.success) {
      return errorResponse(userId.result);
    }

    const moduleId = validateNumber(moduleid);
    if (!moduleId.success) {
      return errorResponse(moduleId.result);
    }

    const user = await findUserByTelegramId(userId.result);
    if (!user) {
      return errorResponse("Wrong userId");
    }

    user.modules = user.modules.filter(
      ({ id }: ModuleInput) => id !== moduleId.result
    );

    await putItem(userTableName, user);

    return successResponse();
  }
);
