import { APIGatewayProxyHandler } from "aws-lambda";
import { Module, ServiceRequest } from "telegram-home-assistant-types";
import { v1 } from "uuid";
import { getItem, MODULE_TABLE, putItem, USER_TABLE } from "../../dynamodb";
import { findUserByTelegramId } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const addUserModule: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { userid, moduleid } = event.pathParameters;

    const { input: userId, error: userError } = validateNumber(userid);
    if (userError) return errorResponse(userError);

    const { input: moduleId, error: moduleError } = validateNumber(moduleid);
    if (moduleError) return errorResponse(moduleError);

    const user = await findUserByTelegramId(userId);
    if (!user) return errorResponse("Wrong userId");

    const module = await getItem(MODULE_TABLE, { id: moduleId }).then(
      (res) => res.Item as Module | undefined
    );
    if (!module) return errorResponse("Wrong moduleId");

    if (!user.modules.some((m) => m.id === module.id)) {
      const editToken = v1();
      module.token = editToken;

      user.modules = [...user.modules, module];

      await putItem(USER_TABLE, user);
    }

    const response: ServiceRequest = {
      serviceUrl: module.serviceUrl,
      body: {
        token: module.token,
        action: "auth",
        deviceId: "",
        data: module.token,
      },
    };

    return successResponse(stringify(response));
  }
);
