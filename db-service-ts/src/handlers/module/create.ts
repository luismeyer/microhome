import { APIGatewayProxyHandler } from "aws-lambda";
import { MODULE_TABLE, putItem } from "../../dynamodb";
import {
  errorResponse,
  stringify,
  successResponse,
  unauthorizedResponse,
} from "../../response";
import { authorized } from "../../validation/access";
import { validateModuleInput } from "../../validation/module";

export const createModule: APIGatewayProxyHandler = async (event, context) => {
  const isAuthorized = authorized(event);
  if (!isAuthorized) return unauthorizedResponse();

  const { input, error } = validateModuleInput(event.body);
  if (error) return errorResponse(error);

  return putItem(MODULE_TABLE, input)
    .then(() => successResponse(stringify(input)))
    .catch((error) =>
      errorResponse("Couldn't create the module item: " + error)
    );
};
