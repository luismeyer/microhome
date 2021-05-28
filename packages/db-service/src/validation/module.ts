import { ValidationError } from "runtypes";
import { Module } from "@telehome/types";
import { ModuleObject } from "../models/module";
import { ValidationResult } from "./typings";

export const validateModuleInput = (
  input: string
): ValidationResult<Module> => {
  try {
    const moduleObject: Module = ModuleObject.check(JSON.parse(input));

    return {
      success: true,
      result: moduleObject,
    };
  } catch (e) {
    const error = e as ValidationError;

    return {
      success: false,
      result: error.message,
    };
  }
};
