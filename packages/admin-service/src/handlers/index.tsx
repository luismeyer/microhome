import { APIGatewayProxyHandler } from "aws-lambda";
import { readFileSync } from "fs";
import ReactServerDOM from "react-dom/server";
import { resolve } from "path";
import { App } from "../app/components/app";
import { ServerStyleSheet } from "styled-components";

const styleSheed = new ServerStyleSheet();

export const handleRequest: APIGatewayProxyHandler = async () => {
  const app = ReactServerDOM.renderToString(styleSheed.collectStyles(<App />));

  const indexFile = readFileSync(
    resolve(__dirname, `../../client-dist/index.html`)
  ).toString();

  const html = indexFile.replace(
    '<div id="root"></div>',
    `<div id="root">${app}</div>${styleSheed.getStyleTags()}`
  );

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html,
  };
};
