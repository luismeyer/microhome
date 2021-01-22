import { APIGatewayProxyEvent } from "aws-lambda";
import { AUTH_PASSWORD, AUTH_USER } from "../utils";
import { ValidationResult } from "./typings";

export const authorized = (event: APIGatewayProxyEvent) => {
  const token = Buffer.from(`${AUTH_USER}:${AUTH_PASSWORD}`).toString("base64");
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
