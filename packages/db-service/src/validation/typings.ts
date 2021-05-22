export type SuccessValidationResult<T> = {
  success: true;
  result: T;
};

export type ErrorValidationResult = {
  success: false;
  result: string;
};

export type ValidationResult<T> =
  | ErrorValidationResult
  | SuccessValidationResult<T>;
