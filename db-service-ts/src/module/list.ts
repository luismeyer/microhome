import { APIGatewayProxyHandler } from "aws-lambda";
import { MODULE_TABLE, scanItems } from "../dynamodb";

const params = {
  TableName: MODULE_TABLE,
};

export const list: APIGatewayProxyHandler = async (event, context) => {
  // fetch all todos from the database
  // For production workloads you should design your tables and indexes so that your applications can use Query instead of Scan.

  return scanItems(params)
    .then((result) => ({
      statusCode: 200,
      body: JSON.stringify(result.Items),
    }))
    .catch((error) => ({
      statusCode: error.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: `Couldn't fetch the todo items: ${error}`,
    }));
};
