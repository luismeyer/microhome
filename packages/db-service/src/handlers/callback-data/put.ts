import { CallBackData } from "@microhome/types/src";
import { APIGatewayProxyHandler } from "aws-lambda";
import { v1 } from "uuid";
import { callbackDataTableName, putItem } from "../../db";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";

export const putCallbackData: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const id = v1();

    if (!event.body) {
      return errorResponse("MISSING BODY");
    }

    const stateInput = JSON.parse(event.body);
    const dbInput: CallBackData = { id, ...stateInput };

    return putItem(callbackDataTableName, dbInput)
      .then((response) => {
        if (!response.success) {
          return errorResponse(response.result);
        }

        return successResponse(stringify(dbInput));
      })
      .catch((e) => errorResponse("Error during put: " + e));
  }
);
