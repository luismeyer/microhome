import translate from "translate";

const { GOOGLE_API_KEY } = process.env;
if (!GOOGLE_API_KEY) throw new Error("Missing env Variable: GOOGLE_API_KEY");
translate.key = GOOGLE_API_KEY;

import { LambdaBody } from "./handler";
import {
  getLamp,
  listLamps,
  setLampState,
  transformApiLamp,
  createErrorResult,
  createSuccessResult,
} from "./lifx";
import {
  ErrorResult,
  Lamp,
  SuccessResult,
  ErrorValidation,
  SuccessValidation,
} from "./typings";

const checkBaseArgs = (
  body: LambdaBody
): ErrorValidation | SuccessValidation => {
  if (!body.token) {
    return {
      valid: false,
      body: createErrorResult("Kein Token"),
    };
  }

  if (!body.deviceId) {
    return {
      valid: false,
      body: createErrorResult("Keine LampenID"),
    };
  }

  return {
    valid: true,
    body: {
      ...body,
      token: body.token,
      deviceId: body.deviceId,
    },
  };
};

// gets you a single lamp by ID
export const handleGetAction = async (
  body: LambdaBody
): Promise<ErrorResult | SuccessResult<Lamp>> => {
  const parseResult = checkBaseArgs(body);
  if (parseResult.valid === false) {
    return parseResult.body;
  }

  const result = await getLamp(parseResult.body.token, parseResult.body.token);

  return result.success == true
    ? createSuccessResult(transformApiLamp(result.result))
    : result;
};

export const handleSwitchAction = async (
  body: LambdaBody
): Promise<ErrorResult | SuccessResult<string>> => {
  const parseResult = checkBaseArgs(body);
  if (parseResult.valid === false) {
    return parseResult.body;
  }

  return await setLampState({
    token: parseResult.body.token,
    lampId: parseResult.body.deviceId,
    on: body.action === "on",
  });
};

export const handleListAction = async (
  body: LambdaBody
): Promise<ErrorResult | SuccessResult<Lamp[]>> => {
  if (!body.token) {
    return createErrorResult("Kein Token");
  }

  const listResult = await listLamps(body.token);

  return listResult.success === true
    ? createSuccessResult(listResult.result.map(transformApiLamp))
    : listResult;
};

export const handleColorAction = async (
  rawBody: LambdaBody
): Promise<ErrorResult | SuccessResult<string>> => {
  const parseResult = checkBaseArgs(rawBody);
  if (parseResult.valid === false) {
    return parseResult.body;
  }

  const { body } = parseResult;

  if (!body.data) {
    return createErrorResult("Keine Farbe");
  }

  let color = body.data;
  if (!body.data.startsWith("#")) {
    color = await translate(body.data, { from: "de", to: "en" });
  }

  return setLampState({
    token: body.token,
    lampId: body.deviceId,
    on: true,
    color: color.toLowerCase(),
  });
};

export const handleAuthAction = (): SuccessResult<string> => ({
  success: true,
  result:
    "Hole die hier deinen lifx token: https://cloud.lifx.com/settings\nDanach speichere den token mit dem '/lifx <dein token>' command",
});
