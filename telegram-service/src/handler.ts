import { APIGatewayProxyHandler } from "aws-lambda";
import { Update } from "node-telegram-bot-api";
import bot, { setDefaultCommands } from "./bot";

export const handleApiGatewayRequest: APIGatewayProxyHandler = async (
  event,
  context
) => {
  if (!event || !event.body) {
    return {
      statusCode: 400,
      body: `{ "message": "Missing event body" }`,
    };
  }

  const update: Update = JSON.parse(event.body);
  console.log(update);
  setDefaultCommands();
  bot.processUpdate(update);

  return {
    statusCode: 200,
    body: `{ "message": "success" }`,
  };
};
