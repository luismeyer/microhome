import { APIGatewayProxyHandler } from "aws-lambda";
import { Module } from "@telegram-home-assistant/types";
import {
  getItem,
  moduleTableName,
  putItem,
  userTableName,
} from "../../dynamodb";
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
    if (!user) return errorResponse("Wrong userId");

    const module = await getItem(moduleTableName, { id: moduleId }).then(
      ({ Item }) => Item as Module | undefined
    );
    if (!module) return errorResponse("Wrong moduleId");

    user.modules = user.modules.filter(({ id }) => id !== moduleId.result);

    await putItem(userTableName, user);

    return successResponse();
  }
);
