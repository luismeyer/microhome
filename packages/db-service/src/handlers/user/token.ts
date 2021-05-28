import { ModuleInput } from "@microhome/types/dist";
import { APIGatewayProxyHandler } from "aws-lambda";
import { putItem, userTableName } from "../../db";
import { findUserByEditToken } from "../../models/user";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";

export const updateUserToken: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    if (!event.queryStringParameters) {
      return errorResponse("Missing 'queryStringParameters'");
    }

    const { edittoken } = event.pathParameters;
    const { token } = event.queryStringParameters;

    if (!token) {
      return errorResponse("Missing 'token'");
    }

    if (!edittoken) {
      return errorResponse("Missing 'edittoken'");
    }

    const user = await findUserByEditToken(edittoken);
    if (!user) {
      return errorResponse("Couldn't find user");
    }

    const module = user.modules.find(
      ({ token }: ModuleInput) => token === edittoken
    );
    if (!module) {
      return errorResponse("Wrong edittoken");
    }

    module.token = token;

    return putItem(userTableName, user)
      .then((response) => {
        if (!response.success) {
          return errorResponse(response.result);
        }

        return successResponse(stringify(user));
      })
      .catch((error) =>
        errorResponse("Couldn't updater the user item: " + error)
      );
  }
);
