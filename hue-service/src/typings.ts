import Api from "node-hue-api/lib/api/Api";

export type Maybe<T> = T | void;

export type ApiLamp = {
  id: string;
  name: string;
  state: {
    on: boolean;
    hue?: number;
    bri?: number;
    sat?: number;
    reachable: boolean;
  };
  color: string;
};

export type Lamp = {
  type: "LAMP";
  id: string;
  name: string;
  on: boolean;
  color: string;
};

export type SuccessResponse = {
  success: true;
};

export type FailResponse = {
  success: false;
};

export type TokensResponse = SuccessResponse & {
  refreshToken: string;
  accessToken: string;
};

export type ErrorResponse = FailResponse & {
  error: string;
};

export type Error = {
  response: {
    statusText: string;
  };
};

export type ApiResponse = SuccessResponse & {
  api: Api;
};

export type LampResponse = SuccessResponse & {
  result: Lamp;
};

export type LampsResponse = SuccessResponse & {
  result: Array<Lamp>;
};

export type AuthResponse = SuccessResponse & {
  result: string;
};
