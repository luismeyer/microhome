import { APIGatewayProxyHandler } from "aws-lambda";
import { MODULE_TABLE, scanItems } from "../../dynamodb";
import {
  errorResponse,
  stringify,
  successResponse,
  unauthorizedResponse,
} from "../../response";
import { authorized } from "../../validation/access";

export const listModule: APIGatewayProxyHandler = async (event, context) => {
  const isAuthorized = authorized(event);
  if (!isAuthorized) return unauthorizedResponse();

  return scanItems(MODULE_TABLE)
    .then((result) => successResponse(stringify(result.Items)))
    .catch((error) =>
      errorResponse(`Couldn't fetch the module items: ${error}`)
    );
};
