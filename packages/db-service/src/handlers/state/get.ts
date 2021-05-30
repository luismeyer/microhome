import { APIGatewayProxyHandler } from "aws-lambda";
import { getItem, stateTableName } from "../../db";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const getState: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    const { telegramId } = event.pathParameters;
    const id = validateNumber(telegramId);
    if (!id.success) {
      return errorResponse(id.result);
    }

    return getItem(stateTableName, { id: id.result })
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
