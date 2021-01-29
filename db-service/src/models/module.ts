import { Array, Null, Number, Record, String, Undefined } from "runtypes";

export const ModuleObject = Record({
  id: Number,
  name: String,
  baseAction: String,
  serviceUrl: String,
  functions: Array(String),
  token: String.Or(Undefined).Or(Null),
});
