import { APIGatewayProxyHandler } from "aws-lambda";
import { getItem, moduleTableName } from "../../dynamodb";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const getModule: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    const { moduleid } = event.pathParameters;
    const moduleId = validateNumber(moduleid);
    if (!moduleId.success) {
      return errorResponse(moduleId.result);
    }

    return getItem(moduleTableName, { id: moduleId.result })
      .then((result) => successResponse(stringify(result.Item)))
      .catch((error) =>
        errorResponse("Couldn't fetch the module item: " + error)
      );
  }
);
