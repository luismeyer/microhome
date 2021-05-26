import { APIGatewayProxyHandler } from "aws-lambda";
import { moduleTableName, scanItems } from "../../db";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";

export const listModule: APIGatewayProxyHandler = authorizedHandler(async () =>
  scanItems(moduleTableName)
    .then((response) => {
      if (!response.success) {
        return errorResponse(response.result);
      }

      return successResponse(stringify(response.result));
    })
    .catch((error) =>
      errorResponse(`Couldn't fetch the module items: ${error}`)
    )
);
