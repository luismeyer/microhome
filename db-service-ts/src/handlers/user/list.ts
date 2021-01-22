import { APIGatewayProxyHandler } from "aws-lambda";
import { scanItems, USER_TABLE } from "../../dynamodb";
import {
  errorResponse,
  stringify,
  successResponse,
  unauthorizedResponse,
} from "../../response";
import { authorized } from "../../validation/access";

export const listUsers: APIGatewayProxyHandler = async (event) => {
  const isAuthorized = authorized(event);
  if (!isAuthorized) return unauthorizedResponse();

  return scanItems(USER_TABLE)
    .then((result) => successResponse(stringify(result.Items)))
    .catch((error) => errorResponse(`Couldn't fetch the user items: ${error}`));
};
