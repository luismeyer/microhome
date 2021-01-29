import { ValidationError } from "runtypes";
import { Module } from "telegram-home-assistant-types";
import { ModuleObject } from "../models/module";
import { ValidationResult } from "./typings";

export const validateModuleInput = (
  input: string
): ValidationResult<Module> => {
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
