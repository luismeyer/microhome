import { APIGatewayProxyHandler } from "aws-lambda";
import { Update } from "node-telegram-bot-api";
import bot, { setDefaultCommands } from "./bot";

export let callback: () => void;

export const handleApiGatewayRequest: APIGatewayProxyHandler = (
  event,
  _,
  cb
) => {
  if (!event || !event.body) {
    cb(null, {
      statusCode: 400,
      body: `{ "message": "Missing event body" }`,
    });
    return;
  }

  const update: Update = JSON.parse(event.body);
  console.log(event.body);
  setDefaultCommands();

  callback = () =>
    cb(null, {
      statusCode: 200,
      body: `{ "message": "success" }`,
    });

  bot.processUpdate(update);
};
