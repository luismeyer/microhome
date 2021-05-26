import { APIGatewayProxyHandler } from "aws-lambda";
import { scanItems, userTableName } from "../../db";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";

export const listUsers: APIGatewayProxyHandler = authorizedHandler(async () => {
  return scanItems(userTableName)
    .then((response) => {
      if (!response.success) {
        return errorResponse(response.result);
      }

      return successResponse(stringify(response.result));
    })
    .catch((error) => errorResponse(`Couldn't fetch the user items: ${error}`));
});
