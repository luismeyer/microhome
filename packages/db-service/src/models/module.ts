import { Array, Number, Record, String, Undefined, Boolean } from "runtypes";

const ModuleFunction = Record({
  name: String,
  requiresInput: Boolean,
});

export const ModuleObject = Record({
  id: Number,
  name: String,
  serviceUrl: String,
  baseFunction: ModuleFunction,
  functions: Array(ModuleFunction),
});

export const ModuleInput = Record({
  id: Number,
  name: String,
  serviceUrl: String,
  baseAction: ModuleFunction,
  functions: Array(ModuleFunction),
  token: String.Or(Undefined),
});
