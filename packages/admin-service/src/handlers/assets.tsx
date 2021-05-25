import { APIGatewayProxyHandler } from "aws-lambda";
import { readFileSync } from "fs";
import { resolve, extname } from "path";
import mime from "mime-types";

const baseUrl = "/services/admin";

export const handleRequest: APIGatewayProxyHandler = async ({ path }) => {
  const relativePath = path.replace(baseUrl, "");

  const filePath = resolve(__dirname, `../../client-dist${relativePath}`);

  const file = readFileSync(filePath).toString();
  const mimetype = mime.contentType(extname(filePath));

  return {
    statusCode: 200,
    headers: { "Content-Type": mimetype },
    body: file,
  };
};
