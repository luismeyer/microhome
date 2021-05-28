import { AWSError, DynamoDB } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { dynamoDb, ErrorResult, handleCatch, SuccessResult } from "./core";

type Result = SuccessResult<DynamoDB.DocumentClient.ItemList> | ErrorResult;

const handleResult = (
  result: PromiseResult<DynamoDB.DocumentClient.ScanOutput, AWSError>
): Result => {
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
    result: result.Items,
  };
};

export const scanItems = (
  tablename: string,
  filter?: DynamoDB.DocumentClient.ScanInput["ScanFilter"]
): Promise<Result> =>
  dynamoDb
    .scan({
      TableName: tablename,
      ScanFilter: filter,
    })
    .promise()
    .then(handleResult)
    .catch(handleCatch);
