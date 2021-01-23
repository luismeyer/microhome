import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { unauthorizedResponse } from "../response";
import { DB_AUTH_PASSWORD, DB_AUTH_USER } from "../utils";
import { ValidationResult } from "./typings";

export const authorizedHandler = (handler: APIGatewayProxyHandler) => {
  const authHandler: APIGatewayProxyHandler = (event, context) => {
    if (authorized(event)) {
      console.log("HANDLING: ", event);
      return handler(event, context, undefined);
    }

    return Promise.resolve(unauthorizedResponse());
  };

  return authHandler;
};

export const authorized = (event: APIGatewayProxyEvent) => {
  const token = Buffer.from(`${DB_AUTH_USER}:${DB_AUTH_PASSWORD}`).toString(
    "base64"
  );

  const header = `Basic ${token}`;

  const authHeader = event.headers["Authorization"];
  return Boolean(authHeader && authHeader === header);
};

export const validateNumber = (number: string): ValidationResult<number> => {
  const num = parseInt(number);

  if (isNaN(num)) {
    return {
      error: "Id should be a number not string",
      input: undefined,
    };
  }

  return {
    input: num,
  };
};
