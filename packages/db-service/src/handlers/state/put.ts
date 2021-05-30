import { APIGatewayProxyHandler } from "aws-lambda";
import { stateTableName, putItem } from "../../db";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const putState: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters) {
      return errorResponse("Missing 'pathParameters'");
    }

    const { telegramId } = event.pathParameters;
    const id = validateNumber(telegramId);
    if (!id.success) {
      return errorResponse(id.result);
    }

    if (!event.body) {
      return errorResponse("MISSING BODY");
    }

    const stateInput = JSON.parse(event.body);
    const dbInput = { id: id.result, data: stateInput };

    return putItem(stateTableName, dbInput)
      .then((response) => {
        if (!response.success) {
          return errorResponse(response.result);
        }

        return successResponse(stringify(dbInput));
      })
      .catch((e) => errorResponse("Error during put: " + e));
  }
);
