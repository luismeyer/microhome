import { APIGatewayProxyHandler } from "aws-lambda";
import { authorizedHandler } from "../../validation/access";

export const adminLogin: APIGatewayProxyHandler = authorizedHandler(
  async () => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Correct token",
      }),
    };
  }
);
