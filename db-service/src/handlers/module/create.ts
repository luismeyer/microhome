import { APIGatewayProxyHandler } from "aws-lambda";
import { MODULE_TABLE, putItem } from "../../dynamodb";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";
import { validateModuleInput } from "../../validation/module";

export const createModule: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { input, error } = validateModuleInput(event.body);
    if (error) return errorResponse(error);

    return putItem(MODULE_TABLE, input)
      .then(() => successResponse(stringify(input)))
      .catch((error) =>
        errorResponse("Couldn't create the module item: " + error)
      );
  }
);
