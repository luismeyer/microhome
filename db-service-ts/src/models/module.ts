import { Array, Number, Record, String } from "runtypes";

export const ModuleObject = Record({
  id: Number,
  name: String,
  baseAction: String,
  serviceUrl: String,
  functions: Array(String),
});

export type Module = {
  id: number;
  name: string;
  baseAction: string;
  serviceUrl: string;
  functions: string[];
};
