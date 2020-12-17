import * as dotenv from "dotenv";
dotenv.config();

import { codeToToken, editDBToken } from "./hue";

type Event = {
  body?: string;
  queryStringParameters?: {
    code?: string;
    state?: string;
  };
};

//TODO: Objektifizierung -> Rückgabewert der Funktion
export const handler = async (event: Event) => {
  if (!event.queryStringParameters || !event.queryStringParameters.code)
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        result: "Code fehlt",
      }),
    };
  const { code, state } = event.queryStringParameters;
  const result = await codeToToken(code);
  await editDBToken(result.tokens.refresh.value, state);

  return {
    statusCode: 301,
    headers: {
      Location: "https://www.telegram.me/wp_home_assistant_bot",
    },
  };
};
