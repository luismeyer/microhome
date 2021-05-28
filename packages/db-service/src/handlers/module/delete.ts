import { APIGatewayProxyHandler } from "aws-lambda";
import { deleteItem, getItem, moduleTableName } from "../../db";
import { errorResponse, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const deleteModule: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    const { moduleid } = event.pathParameters;
    const moduleId = validateNumber(moduleid);
    if (!moduleId.success) {
      return errorResponse(moduleId.result);
    }

    const module = await getItem(moduleTableName, { id: moduleId.result });
    if (!module.success) {
      return errorResponse(module.result);
    }

    return deleteItem(moduleTableName, { id: module.result.id })
      .then((res) => {
        if (!res.success) {
          return errorResponse(res.result);
        }

        return successResponse();
      })
      .catch((error) => errorResponse("Coulnd't delete item " + error));
  }
);
