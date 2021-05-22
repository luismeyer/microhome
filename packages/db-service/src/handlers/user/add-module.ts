import { APIGatewayProxyHandler } from "aws-lambda";
import { Module, ServiceRequest } from "@telegram-home-assistant/types";
import { v1 } from "uuid";
import {
  getItem,
  moduleTableName,
  putItem,
  userTableName,
} from "../../dynamodb";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const addUserModule: APIGatewayProxyHandler = authorizedHandler(
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
      (res) => res.Item as Module | undefined
    );

    if (!module) {
      return errorResponse("Wrong moduleId");
    }

    const userModule = user.modules.find((m) => m.id === module.id);
    let editToken = "";

    if (userModule) {
      editToken == userModule.token;
    } else {
      editToken = v1();

      user.modules = [
        ...user.modules,
        {
          ...module,
          token: editToken,
        },
      ];

      await putItem(userTableName, user);
    }

    const response: ServiceRequest = {
      serviceUrl: module.serviceUrl,
      body: {
        data: editToken,
        action: "auth",
      },
    };

    return successResponse(stringify(response));
  }
);
