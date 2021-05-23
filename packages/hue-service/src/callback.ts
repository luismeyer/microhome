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
  const { queryStringParameters } = event;

  if (
    !queryStringParameters ||
    !queryStringParameters.code ||
    !queryStringParameters.state
  ) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        result: "Code fehlt",
      }),
    };
  }

  const result = await codeToToken(queryStringParameters.code);
  if (!result?.tokens.refresh) {
    return;
  }

  await editDBToken(result.tokens.refresh.value, queryStringParameters.state);

  return {
    statusCode: 301,
    headers: {
      Location: "https://www.telegram.me/wp_home_assistant_bot",
    },
  };
};
