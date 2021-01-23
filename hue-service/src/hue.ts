import convert from "color-convert";
import fetch from "node-fetch";
import { v3 } from "node-hue-api";
import { OAuthTokens } from "node-hue-api/lib/api/http/RemoteApi";
import { ApiLamp, Error, ErrorResponse, Lamp, TokensResponse } from "./typings";

const {
  DB_SERVICE_URL,
  HUE_CLIENT_ID,
  HUE_CLIENT_SECRET,
  DB_AUTH_USER,
  DB_AUTH_PASSWORD,
} = process.env;

if (!DB_SERVICE_URL) {
  throw new Error("Missing env Variable DB_SERVICE_URL");
}

if (!HUE_CLIENT_ID) {
  throw new Error("Missing env Variable HUE_CLIENT_ID");
}

if (!HUE_CLIENT_SECRET) {
  throw new Error("Missing env Variable HUE_CLIENT_SECRET");
}

if (!DB_AUTH_USER) {
  throw new Error("Missing env Variable DB_AUTH_USER");
}

if (!DB_AUTH_PASSWORD) {
  throw new Error("Missing env Variable DB_AUTH_PASSWORD");
}

export const connectToApi = (accessToken: string, refreshToken: string) => {
  const remoteBootstrap = v3.api.createRemote(HUE_CLIENT_ID, HUE_CLIENT_SECRET);

  return remoteBootstrap
    .connectWithTokens(accessToken, refreshToken)
    .catch((err: Error) => {
      console.error("Failed to get a remote connection using existing tokens.");
      console.error(err);
      process.exit(1);
    });
};

export const codeToToken = (code: string) => {
  const remoteBootstrap = v3.api.createRemote(HUE_CLIENT_ID, HUE_CLIENT_SECRET);
  return remoteBootstrap
    .connectWithCode(code)
    .then((api) => api.remote.getRemoteAccessCredentials());
};

export const createTokensResponse = (tokens: OAuthTokens): TokensResponse => ({
  success: true,
  refreshToken: tokens.refreshToken,
  accessToken: tokens.accessToken,
});

export const createErrorResponse = (error: string | Error): ErrorResponse => ({
  success: false,
  error: typeof error === "string" ? error : error.response.statusText,
});

export const editDBToken = (token: string, editToken: string) => {
  console.log("New Token: ", token);
  const url = `${DB_SERVICE_URL}user/token/${editToken}?token=${token}`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${DB_AUTH_USER}:${DB_AUTH_PASSWORD}`
      ).toString("base64")}`,
    },
  });
};

export const generateTokens = async (
  refreshToken: string
): Promise<ErrorResponse | TokensResponse> => {
  const remoteBootstrap = v3.api.createRemote(HUE_CLIENT_ID, HUE_CLIENT_SECRET);
  const result = await remoteBootstrap.remoteApi
    .refreshTokens(refreshToken)
    .then(createTokensResponse)
    .catch(createErrorResponse);

  if (result.success) {
    await editDBToken(result.refreshToken, refreshToken);
    return result;
  }

  return result;
};

export const transformLight = (light: ApiLamp): Lamp => {
  let hue;
  let brightness;
  let saturation;

  if (light.state.hue) {
    hue = light.state.hue / 182;
    brightness = light.state.bri / 2.54;
    saturation = light.state.sat / 2.54;
  } else {
    hue = 0;
  }

  const transformed = convert.hsv.keyword([hue, saturation, brightness]);

  return {
    type: "LAMP",
    name: light.name,
    id: light.id,
    on: light.state.reachable ? light.state.on : false,
    color: transformed,
  };
};
