import { APIGatewayProxyHandler } from "aws-lambda";
import { deleteItem, moduleTableName } from "../../dynamodb";
import { errorResponse, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";

export const deleteUser: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    if (!event.pathParameters || !event.pathParameters.id) {
      return errorResponse("Missing 'id' in 'pathParameters'");
    }

    const id = parseInt(event.pathParameters.id);

    if (isNaN(id)) {
      return errorResponse("Id should be a number not string");
    }

    return deleteItem(moduleTableName, { id })
      .then(() => successResponse())
      .catch((error) =>
        errorResponse("Couldn't fetch the module item: " + error)
      );
  }
);
