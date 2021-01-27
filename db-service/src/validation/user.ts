import { ValidationError } from "runtypes";
import { UserInput, UserInputObject } from "../models/user";
import { ValidationResult } from "./typings";

export const validateUserInput = (
  input: string
): ValidationResult<UserInput> => {
  try {
    const userInput = UserInputObject.check(JSON.parse(input));

    return {
      error: undefined,
      input: userInput,
    };
  } catch (e) {
    const error = e as ValidationError;

    return {
      error: error.message,
      input: undefined,
    };
  }
};
