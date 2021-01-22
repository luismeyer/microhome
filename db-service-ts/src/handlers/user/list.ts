import { APIGatewayProxyHandler } from "aws-lambda";
import { scanItems, USER_TABLE } from "../../dynamodb";
import { errorResponse, stringify, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";

export const listUsers: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    return scanItems(USER_TABLE)
      .then((result) => successResponse(stringify(result.Items)))
      .catch((error) =>
        errorResponse(`Couldn't fetch the user items: ${error}`)
      );
  }
);
