import { APIGatewayProxyHandler } from "aws-lambda";
import { MODULE_TABLE, putItem } from "../dynamodb";
import { validateModuleInput } from "../validation/module";

export const create: APIGatewayProxyHandler = async (event, context) => {
  const { input, error } = validateModuleInput(event.body);
  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }

  console.log(input);
  const params = {
    TableName: MODULE_TABLE,
    Item: input,
  };

  console.log(params);

  return putItem(params)
    .then(() => ({
      statusCode: 200,
      body: JSON.stringify(params.Item),
    }))
    .catch((error) => ({
      statusCode: 200,
      body: JSON.stringify({
        error: "Couldn't create the todo item: " + error,
      }),
    }));
};
