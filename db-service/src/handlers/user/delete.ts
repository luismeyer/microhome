import { APIGatewayProxyHandler } from "aws-lambda";
import { deleteItem, MODULE_TABLE } from "../../dynamodb";
import { errorResponse, successResponse } from "../../response";
import { authorizedHandler } from "../../validation/access";

export const deleteUser: APIGatewayProxyHandler = authorizedHandler(
  async (event) => {
    const { pathParameters } = event;
    const id = parseInt(pathParameters.id);

    if (isNaN(id)) {
      return errorResponse("Id should be a number not string");
    }

    return deleteItem(MODULE_TABLE, { id })
      .then(() => successResponse())
      .catch((error) =>
        errorResponse("Couldn't fetch the module item: " + error)
      );
  }
);
