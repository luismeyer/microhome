import { AWSError, DynamoDB } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { dynamoDb, ErrorResult, handleCatch, SuccessResult } from "./core";

type Result = SuccessResult<boolean> | ErrorResult;

const handleResult = (
  result: PromiseResult<DynamoDB.DocumentClient.DeleteItemOutput, AWSError>
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

export const deleteItem = (
  tablename: string,
  key: DynamoDB.DocumentClient.Key
) =>
  dynamoDb
    .delete({
      TableName: tablename,
      Key: key,
    })
    .promise()
    .then(handleResult)
    .catch(handleCatch);
