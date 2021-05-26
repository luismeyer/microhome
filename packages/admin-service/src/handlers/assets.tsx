import { APIGatewayProxyHandler } from "aws-lambda";
import { readFileSync } from "fs";
import { resolve, extname } from "path";
import mime from "mime-types";

export const handleRequest: APIGatewayProxyHandler = async ({
  pathParameters,
}) => {
  if (!pathParameters || !pathParameters.proxy) {
    return {
      statusCode: 404,
      body: "Missing proxy parameter",
    };
  }

  const relativePath = resolve(__dirname, "../../dist/", pathParameters.proxy);

  const filePath = resolve(__dirname, relativePath);

  const file = readFileSync(filePath).toString();
  const mimetype = mime.contentType(extname(filePath));

  return {
    statusCode: 200,
    headers: { "Content-Type": mimetype },
    body: file,
  };
};
