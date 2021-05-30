import { DynamoDB } from "aws-sdk";

const { MODULE_TABLE, USER_TABLE, IS_OFFLINE, CALLBACK_DATA_TABLE } =
  process.env;
if (!MODULE_TABLE) {
  throw new Error("Missing Env Variable: 'DYNAMODB_TABLE'");
}

if (!USER_TABLE) {
  throw new Error("Missing Env Variable: 'USER_TABLE'");
}

if (!CALLBACK_DATA_TABLE) {
  throw new Error("Missing Env Variable: 'CALLBACK_DATA_TABLE'");
}

export type SuccessResult<T> = {
  success: true;
  result: T;
};

export type ErrorResult = {
  success: false;
  result: string;
};

export const moduleTableName = MODULE_TABLE;
export const userTableName = USER_TABLE;
export const callbackDataTableName = CALLBACK_DATA_TABLE;

const localOptions = {
  region: "localhost",
  endpoint: "http://localhost:8000",
};

export const dynamoDb = new DynamoDB.DocumentClient(
  IS_OFFLINE ? localOptions : {}
);

export const handleCatch = (e: Error): ErrorResult => {
  return {
    success: false,
    result: "Catch DynamoDB: " + e.message,
  };
};
