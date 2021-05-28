import {
  handleListAction,
  handleSwitchAction,
  handleColorAction,
  handleAuthAction,
  handleGetAction,
} from "./actions";
import { LambdaEvent, LambdaBody } from "./typings";

module.exports.handler = async (event: LambdaEvent) => {
  if (!event.body) {
    return errorResponse("Kein Body");
  }

  const body = JSON.parse(event.body) as LambdaBody;
  if (!body.action) {
    return errorResponse("Falsches Action Format");
  }

  let response;
  switch (body.action) {
    case "list":
      response = await handleListAction(body);
      break;
    case "on":
    case "off":
      response = await handleSwitchAction(body);
      break;
    case "color":
      response = await handleColorAction(body);
      break;
    case "auth":
      response = handleAuthAction(body);
      break;
    case "get":
      response = await handleGetAction(body);
      break;
    default:
      return errorResponse("Falscher Action command");
  }

  if (response.success === false) {
    return errorResponse(response.error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      result: response.result,
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
