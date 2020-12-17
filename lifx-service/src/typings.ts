export type Maybe<T> = T | void;

export type ErrorResult = {
  success: false;
  error: string;
};

export type SuccessResult<T> = {
  success: true;
  result: T;
};

export type ApiLamp = {
  color: {
    hue: number;
    saturation: number;
  };
  brightness: number;
  connected: boolean;
  id: string;
  power: "on" | "off";
  label: string;
  status?: boolean;
};

export type Lamp = {
  type: "LAMP";
  id: string;
  on: boolean;
  name: string;
  color: string;
};

export type SetLampParams = {
  token: string;
  lampId: string;
  on: boolean;
  color?: string;
};
