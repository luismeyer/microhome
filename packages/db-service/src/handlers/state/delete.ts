import { APIGatewayProxyHandler } from "aws-lambda";
import { stateTableName, deleteItem } from "../../db";
import { errorResponse, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const deleteState: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    const { telegramId } = event.pathParameters;
    const id = validateNumber(telegramId);
    if (!id.success) {
      return errorResponse(id.result);
    }

    return deleteItem(stateTableName, { id: id.result })
      .then((response) => {
        if (!response.success) {
          return errorResponse(response.result);
        }

        return successResponse();
      })
      .catch((e) => errorResponse("Error during delete: " + e));
  }
);
