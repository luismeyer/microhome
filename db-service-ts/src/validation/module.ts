import { ValidationError } from "runtypes";
import { Module, ModuleObject } from "../models/module";
import { ParseResult } from "./typings";

export const validateModuleInput = (input: string): ParseResult<Module> => {
  try {
    const moduleObject = ModuleObject.check(JSON.parse(input));

    return {
      error: undefined,
      input: moduleObject,
    };
  } catch (e) {
    const error = e as ValidationError;

    return {
      error: error.message,
      input: undefined,
    };
  }
};
