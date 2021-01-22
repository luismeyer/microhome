import { APIGatewayProxyHandler } from "aws-lambda";
import { deleteItem, MODULE_TABLE } from "../../dynamodb";
import {
  errorResponse,
  successResponse,
  unauthorizedResponse,
} from "../../response";
import { authorized } from "../../validation/access";

export const deleteUser: APIGatewayProxyHandler = async (event, context) => {
  const isAuthorized = authorized(event);
  if (!isAuthorized) return unauthorizedResponse();

  const { pathParameters } = event;
  const id = parseInt(pathParameters.id);

  if (isNaN(id)) {
    return errorResponse("Id should be a number not string");
  }

  return deleteItem(MODULE_TABLE, { id })
    .then(() => successResponse())
    .catch((error) =>
      errorResponse("Couldn't fetch the module item: " + error)
    );
};
