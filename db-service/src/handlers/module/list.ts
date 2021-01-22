import { APIGatewayProxyHandler } from "aws-lambda";
import { MODULE_TABLE, scanItems } from "../../dynamodb";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";

export const listModule: APIGatewayProxyHandler = authorizedHandler(async () =>
  scanItems(MODULE_TABLE)
    .then((result) => successResponse(stringify(result.Items)))
    .catch((error) =>
      errorResponse(`Couldn't fetch the module items: ${error}`)
    )
);
