import {
  handleAuthAction,
  handleColorAction,
  handleListAction,
  handleSwitchAction,
  handleGetAction,
} from "./actions";
import pjson from "../package.json";

export const errorResponse = (error: string) => ({
  statusCode: 400,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify({
    success: false,
    error,
    version: pjson.version,
  }),
});

type LambdaEvent = {
  body?: string;
};

export type LambdaBody = {
  token?: string;
  deviceId: string;
  action?: "on" | "off" | "list" | "color" | "auth" | "get";
  data?: any;
};

export const api = async (event: LambdaEvent) => {
  if (!event.body) {
    return errorResponse("Kein Body");
  }

  const body = JSON.parse(event.body) as LambdaBody;

  if (!body.action) {
    return errorResponse("Falsches Action Format");
  }

  let response;
  switch (body.action) {
    case "get":
      response = await handleGetAction(body);
      break;
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
      response = handleAuthAction();
      break;
    default:
      return errorResponse("Falscher Action command");
  }

  if (response.success === false) {
    return errorResponse(response.error);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      success: true,
      result: response.result,
      version: pjson.version,
    }),
  };
};
