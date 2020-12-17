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
import { ErrorResult, Maybe, Lamp, SuccessResult } from "./typings";

const checkBaseArgs = (body: LambdaBody): Maybe<ErrorResult> => {
  if (!body.token) {
    return createErrorResult("Kein Token");
  }

  if (!body.deviceId) {
    return createErrorResult("Keine LampenID");
  }

  return null;
};

// gets you a single lamp by ID
export const handleGetAction = async (
  body: LambdaBody
): Promise<ErrorResult | SuccessResult<Lamp>> => {
  const error = checkBaseArgs(body);
  if (error) {
    return error;
  }

  const result = await getLamp(body.token, body.deviceId);

  return result.success == true
    ? createSuccessResult(transformApiLamp(result.result))
    : result;
};

export const handleSwitchAction = async (
  body: LambdaBody
): Promise<ErrorResult | SuccessResult<string>> => {
  const error = checkBaseArgs(body);
  if (error) {
    return error;
  }

  return await setLampState({
    token: body.token,
    lampId: body.deviceId,
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

export const handleColorAction = async (body: LambdaBody) => {
  const error = checkBaseArgs(body);
  if (error) {
    return error;
  }

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
