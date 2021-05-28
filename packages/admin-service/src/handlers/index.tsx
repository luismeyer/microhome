import React from "react";
import { APIGatewayProxyHandler } from "aws-lambda";
import { readFileSync } from "fs";
import ReactServerDOM from "react-dom/server";
import { resolve } from "path";
import { App } from "../app/components/app";
import { ServerStyleSheet } from "styled-components";
import { assetsUrl } from "../config";

const styleSheed = new ServerStyleSheet();

export const handleRequest: APIGatewayProxyHandler = async ({
  requestContext: { stage },
}) => {
  const app = ReactServerDOM.renderToString(styleSheed.collectStyles(<App />));

  let html = readFileSync(
    resolve(__dirname, `../../dist/index.html`)
  ).toString();

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${app}</div>${styleSheed.getStyleTags()}`
  );

  // inject the baseUrl
  html = html.replace('src="/client', `src="${assetsUrl(stage)}/client`);

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html,
  };
};
