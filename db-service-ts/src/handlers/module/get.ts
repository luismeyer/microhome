import { APIGatewayProxyHandler } from "aws-lambda";
import { getItem, MODULE_TABLE } from "../../dynamodb";
import {
  errorResponse,
  stringify,
  successResponse,
  unauthorizedResponse,
} from "../../response";
import { authorized, validateNumber } from "../../validation/access";

export const getModule: APIGatewayProxyHandler = async (event, context) => {
  const isAuthorized = authorized(event);
  if (!isAuthorized) return unauthorizedResponse();

  const { pathParameters } = event;
  const { input, error } = validateNumber(pathParameters.id);
  if (error) return errorResponse(error);

  return getItem(MODULE_TABLE, { id: input })
    .then((result) => successResponse(stringify(result.Item)))
    .catch((error) =>
      errorResponse("Couldn't fetch the module item: " + error)
    );
};
