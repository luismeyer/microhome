import { APIGatewayProxyHandler } from "aws-lambda";
import { Update } from "node-telegram-bot-api";
import { generateBot } from "./bot";
import { setI18n } from "./i18n";
import { clearState } from "./utils/state";

const setUserLanguage = async (update: Update) => {
  if (update.message && update.message.from) {
    await setI18n(update.message.from.id);
  }

  if (update.callback_query && update.callback_query.from) {
    await setI18n(update.callback_query.from.id);
  }
};

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

  console.log("BODY: ", event.body);
  const update: Update = JSON.parse(event.body);

  const bot = generateBot(() => {
    clearState();
    cb(null, {
      statusCode: 200,
      body: `{ "message": "success" }`,
    });
  });

  setUserLanguage(update).then(() => {
    bot.processUpdate(update);
  });
};