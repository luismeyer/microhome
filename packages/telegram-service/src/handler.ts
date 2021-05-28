import { APIGatewayProxyHandler } from "aws-lambda";
import { Update } from "node-telegram-bot-api";
import { generateBot } from "./bot";
import { setI18n } from "./i18n";
import { clearState } from "./utils/state";

const setUserLanguage = async ({ message, callback_query }: Update) => {
  if (message && message.from) {
    return await setI18n(message.from.id, message.from.language_code);
  }

  if (callback_query && callback_query.from) {
    return await setI18n(
      callback_query.from.id,
      callback_query.from.language_code
    );
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

  setUserLanguage(update).then(() => {
    const bot = generateBot(() => {
      clearState();

      cb(null, {
        statusCode: 200,
        body: `{ "message": "success" }`,
      });
    });

    bot.processUpdate(update);
  });
};
