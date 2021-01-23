import convert from "color-convert";
import * as dotenv from "dotenv";
import translate from "translate";
import { LambdaBody } from "./handler";
import {
  connectToApi,
  createErrorResponse,
  generateTokens,
  transformLight,
} from "./hue";
import {
  ApiLamp,
  ApiResponse,
  AuthResponse,
  ErrorResponse,
  Lamp,
  LampResponse,
  LampsResponse,
  Maybe,
} from "./typings";

dotenv.config();

const { LightState } = require("node-hue-api").v3.lightStates;

const { GOOGLE_API_KEY, HUE_CLIENT_ID } = process.env;
translate.key = GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) throw new Error("Missing env Variable: GOOGLE_API_KEY");
if (!HUE_CLIENT_ID) throw new Error("Missing env Variable HUE_CLIENT_ID");

const checkBaseParams = (body: LambdaBody): Maybe<ErrorResponse> => {
  if (!body.token) {
    return createErrorResponse("Kein Token");
  }

  if (!body.deviceId) {
    return createErrorResponse("Keine LampenID");
  }

  return null;
};

export const handleListAction = async (
  body: LambdaBody
): Promise<LampsResponse | ErrorResponse> => {
  if (!body.token) {
    return createErrorResponse("Kein Token");
  }

  const result = await refreshAndConnect(body);
  if (result.success === false) {
    return result;
  }

  const lights = await result.api.lights.getAll();
  return {
    success: true,
    result: lights.map(transformLight),
  };
};

export const handleSwitchAction = async (
  body: LambdaBody
): Promise<LampsResponse | ErrorResponse> => {
  const baseError = checkBaseParams(body);
  if (baseError) {
    return baseError;
  }

  const result = await refreshAndConnect(body);
  if (result.success === false) {
    return result;
  }

  return result.api.lights
    .getLight(parseInt(body.deviceId))
    .then((lamp: ApiLamp) => {
      if (lamp.state.reachable == false) {
        return createErrorResponse("Die Lampe ist nicht erreichbar");
      }
      return result.api.lights.setLightState(parseInt(body.deviceId), {
        on: body.action === "on",
      });
    })
    .catch(() =>
      createErrorResponse(`Die Lampe ${body.deviceId} wurde nicht gefunden`)
    );
};

export const handleColorAction = async (
  body: LambdaBody
): Promise<LampResponse | ErrorResponse> => {
  const baseError = checkBaseParams(body);
  if (baseError) {
    return baseError;
  }

  if (!body.data) {
    return createErrorResponse("Keine Farbe");
  }

  let translatedColor = body.data;
  if (!body.data.startsWith("#")) {
    translatedColor = await translate(body.data, { from: "de", to: "en" });
  }

  const color = convert.keyword.rgb(translatedColor);

  const newLightState = new LightState()
    .on(true)
    .rgb(color[0], color[1], color[2]);

  const result = await refreshAndConnect(body);
  if (result.success === false) {
    return result;
  }
  return result.api.lights
    .getLight(parseInt(body.deviceId))
    .then((lamp: ApiLamp) => {
      if (lamp.state.reachable == false) {
        return createErrorResponse("Die Lampe ist nicht erreichbar");
      }

      return result.api.lights.setLightState(
        parseInt(body.deviceId),
        newLightState
      );
    })
    .catch(() =>
      createErrorResponse(`Die Lampe ${body.deviceId} wurde nicht gefunden`)
    );
};

export const handleAuthAction = (
  body: LambdaBody
): AuthResponse | ErrorResponse => {
  if (!body.data) {
    return createErrorResponse("Kein Edittoken");
  }

  const appId = "nordakademie_telegram_bot";
  return {
    success: true,
    result: `https://api.meethue.com/oauth2/auth?clientid=${HUE_CLIENT_ID}&appid=${appId}&deviceid=${appId}&state=${body.data}&response_type=code`,
  };
};

const createLampResponse = (lamp: Lamp): LampResponse => ({
  success: true,
  result: lamp,
});

export const handleGetAction = async (
  body: LambdaBody
): Promise<LampResponse | ErrorResponse> => {
  const baseError = checkBaseParams(body);
  if (baseError) {
    return baseError;
  }

  const result = await refreshAndConnect(body);
  if (result.success === false) {
    return result;
  }

  return result.api.lights
    .getLight(parseInt(body.deviceId))
    .then((l) => createLampResponse(transformLight(l)))
    .catch((err: string) =>
      createErrorResponse("Da ist etwas schief gelaufen: " + err)
    );
};

const refreshAndConnect = async (
  body: LambdaBody
): Promise<ErrorResponse | ApiResponse> => {
  const result = await generateTokens(body.token);

  if (!result.success) {
    return createErrorResponse("Ein Fehler mit dem Token ist aufgetreten");
  }

  const { accessToken, refreshToken } = result;
  const api = await connectToApi(accessToken, refreshToken);
  return {
    success: true,
    api,
  };
};
