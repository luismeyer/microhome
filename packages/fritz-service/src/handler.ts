import {
  handleListAction,
  handleTemperaturAction,
  handleSwitchAction,
  handleGetAction,
  handleAuthAction,
} from "./actions";
import { LambdaEvent } from "./typings";

export const handler = async (event: LambdaEvent) => {
  if (!event.body) {
    return errorResponse("Kein Body");
  }

  const body = JSON.parse(event.body);
  if (!body.action) {
    return errorResponse("Falsches Action Format");
  }

  let result;
  switch (body.action) {
    case "list":
      result = await handleListAction(body);
      break;
    case "on":
    case "off":
      result = await handleSwitchAction(body);
      break;
    case "temperatur":
      result = await handleTemperaturAction(body);
      break;
    case "get":
      result = await handleGetAction(body);
      break;
    case "auth":
      result = handleAuthAction();
      break;
    default:
      return errorResponse("Falsche Action");
  }

  if (result.success === false) {
    return errorResponse(result.error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      result: result.result,
    }),
  };
};

const errorResponse = (error: string) => ({
  statusCode: 400,
  body: JSON.stringify({
    success: false,
    error,
  }),
});
