import fetch, { RequestInit } from "node-fetch";
import convert from "color-convert";

import {
  Lamp,
  ErrorResult,
  SetLampParams,
  SuccessResult,
  ApiLamp,
} from "./typings";

export const createErrorResult = (message: string): ErrorResult => ({
  success: false,
  error: message,
});

export const createSuccessResult = <T>(object: T): SuccessResult<T> => ({
  success: true,
  result: object,
});

const baseFetch = (token: string, url: string, params?: Partial<RequestInit>) =>
  fetch(`https://api.lifx.com/v1/lights${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    ...params,
  });

export const listLamps = (
  token: string
): Promise<SuccessResult<ApiLamp[]> | ErrorResult> =>
  baseFetch(token, "/all")
    .then((res) => res.json())
    .then((res) =>
      res.error
        ? createErrorResult(res.error)
        : createSuccessResult(res as ApiLamp[])
    );

export const getLamp = (
  token: string,
  lampID: string
): Promise<SuccessResult<ApiLamp> | ErrorResult> =>
  baseFetch(token, "/" + lampID)
    .then((res) => res.json())
    .then((res) => (res.length ? createSuccessResult(res[0] as ApiLamp) : res))
    .then((res) => (res.error ? createErrorResult(res.error) : res));

export const setLampState = ({
  token,
  lampId,
  on,
  color,
}: SetLampParams): Promise<SuccessResult<string> | ErrorResult> =>
  baseFetch(token, `/${lampId}/state`, {
    method: "PUT",
    body: JSON.stringify({
      power: on ? "on" : "off",
      color,
      fast: true,
    }),
  }).then((res) =>
    res.ok
      ? createSuccessResult("success")
      : res.json().then((e) => createErrorResult(e.error))
  );

export const transformApiLamp = (lamp: ApiLamp): Lamp => {
  // so that the color-convert module understands the lifx api values
  let saturation = lamp.color.saturation * 100;
  let brightness = lamp.brightness * 100;

  const transformed = convert.hsv.keyword([
    lamp.color.hue,
    saturation,
    brightness,
  ]);

  return {
    type: "LAMP",
    id: lamp.id,
    on: lamp.power === "on",
    name: lamp.label,
    color: transformed,
  };
};
