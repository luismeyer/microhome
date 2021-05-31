import { APIGatewayProxyHandler } from "aws-lambda";
import { callbackDataTableName, scanItems } from "../../db";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";

export const listCallbackData: APIGatewayProxyHandler = authorizedHandler(
  async () => {
    return scanItems(callbackDataTableName)
      .then((response) => {
        if (!response.success) {
          return errorResponse(response.result);
        }

        return successResponse(stringify(response.result));
      })
      .catch((error) =>
        errorResponse(`Couldn't fetch the callbackdata items: ${error}`)
      );
  }
);
