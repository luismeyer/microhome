import { ValidationError } from "runtypes";
import { UserInput, UserInputObject } from "../models/user";
import { ValidationResult } from "./typings";

export const validateUserInput = (
  input?: string
): ValidationResult<UserInput> => {
  if (!input) {
    return {
      success: false,
      result: "Missing user input",
    };
  }

  try {
    const userInput = UserInputObject.check(JSON.parse(input));

    return {
      success: true,
      result: userInput,
    };
  } catch (e) {
    const error = e as ValidationError;

    return {
      success: false,
      result: error.message,
    };
  }
};
