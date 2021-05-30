import { APIGatewayProxyHandler } from "aws-lambda";
import { getItem, callbackDataTableName } from "../../db";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";

export const getCallbackData: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    const { cbId } = event.pathParameters;
    if (!cbId) {
      return errorResponse("Missing pathParameter: 'cbId'");
    }

    return getItem(callbackDataTableName, { id: cbId })
      .then((response) => {
        if (!response.success) {
          return errorResponse(response.result);
        }

        return successResponse(stringify(response.result));
      })
      .catch((error) =>
        errorResponse("Couldn't fetch the state item: " + error)
      );
  }
);
