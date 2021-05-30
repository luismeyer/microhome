import { APIGatewayProxyHandler } from "aws-lambda";
import { callbackDataTableName, deleteItem } from "../../db";
import { errorResponse, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";

export const deleteCallbackData: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    const { cbId } = event.pathParameters;
    if (!cbId) {
      return errorResponse("Missing pathParameter: 'cbId'");
    }

    return deleteItem(callbackDataTableName, { id: cbId })
      .then((response) => {
        if (!response.success) {
          return errorResponse(response.result);
        }

        return successResponse();
      })
      .catch((e) => errorResponse("Error during delete: " + e));
  }
);
