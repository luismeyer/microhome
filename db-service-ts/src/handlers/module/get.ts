import { APIGatewayProxyHandler } from "aws-lambda";
import { getItem, MODULE_TABLE } from "../../dynamodb";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler, validateNumber } from "../../validation/access";

export const getModule: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { userid } = event.pathParameters;
    const { input, error } = validateNumber(userid);
    if (error) return errorResponse(error);

    return getItem(MODULE_TABLE, { id: input })
      .then((result) => successResponse(stringify(result.Item)))
      .catch((error) =>
        errorResponse("Couldn't fetch the module item: " + error)
      );
  }
);
