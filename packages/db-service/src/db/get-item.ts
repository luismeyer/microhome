import { AWSError, DynamoDB } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { dynamoDb, ErrorResult, handleCatch, SuccessResult } from "./core";

type Result = SuccessResult<DynamoDB.DocumentClient.AttributeMap> | ErrorResult;

const handleResult = (
  result: PromiseResult<DynamoDB.DocumentClient.GetItemOutput, AWSError>
): Result => {
  if (result.$response.error) {
    return {
      success: false,
      result: result.$response.error.message,
    };
  }

  if (!result.Item) {
    return {
      success: false,
      result: "Missing item",
    };
  }

  return {
    success: true,
    result: result.Item,
  };
};

export const getItem = (
  tablename: string,
  key: DynamoDB.DocumentClient.Key
): Promise<Result> =>
  dynamoDb
    .get({
      TableName: tablename,
      Key: key,
    })
    .promise()
    .then(handleResult)
    .catch(handleCatch);
