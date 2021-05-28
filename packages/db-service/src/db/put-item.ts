import { AWSError, DynamoDB } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { dynamoDb, ErrorResult, handleCatch, SuccessResult } from "./core";

type Result = SuccessResult<boolean> | ErrorResult;

const handleResult = (
  result: PromiseResult<DynamoDB.DocumentClient.PutItemOutput, AWSError>
): Result => {
  if (result.$response.error) {
    return {
      success: false,
      result: result.$response.error.message,
    };
  }

  return {
    success: true,
    result: true,
  };
};

export const putItem = (
  tablename: string,
  item: DynamoDB.DocumentClient.PutItemInput["Item"]
) =>
  dynamoDb
    .put({ TableName: tablename, Item: item })
    .promise()
    .then(handleResult)
    .catch(handleCatch);
