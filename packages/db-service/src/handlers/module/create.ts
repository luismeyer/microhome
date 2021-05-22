import { APIGatewayProxyHandler } from "aws-lambda";
import { moduleTableName, putItem } from "../../dynamodb";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";
import { validateModuleInput } from "../../validation/module";

export const createModule: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.body) {
      return errorResponse("MISSING BODY");
    }

    const moduleInput = validateModuleInput(event.body);
    if (!moduleInput.success) {
      return errorResponse(moduleInput.result);
    }

    return putItem(moduleTableName, moduleInput.result)
      .then(() => successResponse(stringify(moduleInput.result)))
      .catch((error) =>
        errorResponse("Couldn't create the module item: " + error)
      );
  }
);
