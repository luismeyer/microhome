import { APIGatewayProxyResult } from "aws-lambda";

export const successResponse = (body: string = ""): APIGatewayProxyResult => ({
  headers: { "Content-Type": "application/json" },
  statusCode: 200,
  body,
});

export const unauthorizedResponse = (): APIGatewayProxyResult => ({
  headers: { "Content-Type": "application/json" },
  statusCode: 401,
  body: stringify({ error: "Missing or wrong Authorization header" }),
});

export const errorResponse = (error: string): APIGatewayProxyResult => ({
  headers: { "Content-Type": "application/json" },
  statusCode: 400,
  body: stringify({ error }),
});

export const stringify = (object: any): string => JSON.stringify(object);
