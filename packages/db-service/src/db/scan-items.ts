import { AWSError, DynamoDB } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { dynamoDb, ErrorResult, handleCatch, SuccessResult } from "./core";

type Result<T> = SuccessResult<T> | ErrorResult;

const handleResult = <T>(
  result: PromiseResult<DynamoDB.DocumentClient.ScanOutput, AWSError>
): Result<T> => {
  if (result.$response.error) {
    return {
      success: false,
      result: result.$response.error.message,
    };
  }

  if (result.Items === undefined) {
    return {
      success: false,
      result: "Missing items",
    };
  }

  return {
    success: true,
    result: result.Items as unknown as T,
  };
};

export const scanItems = <T>(
  tablename: string,
  filter?: DynamoDB.DocumentClient.ScanInput["ScanFilter"]
): Promise<Result<T>> =>
  dynamoDb
    .scan({
      TableName: tablename,
      ScanFilter: filter,
    })
    .promise()
    .then((res) => handleResult<T>(res))
    .catch(handleCatch);
