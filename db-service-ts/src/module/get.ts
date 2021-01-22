import { APIGatewayProxyHandler } from "aws-lambda";
import { getItem, MODULE_TABLE } from "../dynamodb";

export const get: APIGatewayProxyHandler = async (event, context) => {
  const { pathParameters } = event;
  const id = parseInt(pathParameters.id);

  if (isNaN(id)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Id should be a number not string",
      }),
    };
  }

  const params = {
    TableName: MODULE_TABLE,
    Key: {
      id,
    },
  };

  return getItem(params)
    .then((result) => ({
      statusCode: 200,
      body: JSON.stringify(result.Item),
    }))
    .catch((error) => ({
      statusCode: error.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't fetch the todo item.",
    }));
};
