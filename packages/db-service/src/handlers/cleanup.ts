import { CallBackData } from "@microhome/types";
import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { chunkArray } from "../utils";
import { callbackDataTableName, deleteItemBatch, scanItems } from "../db";

export const cleanupData: APIGatewayProxyHandler = async () => {
  const callbackDataList = await scanItems<CallBackData[]>(
    callbackDataTableName
  );

  if (!callbackDataList.success) {
    return {
      statusCode: 200,
      body: "Couldn't get callbackdat items",
    };
  }

  const requests: DynamoDB.DocumentClient.WriteRequests =
    callbackDataList.result.map((data) => ({
      DeleteRequest: {
        Key: {
          id: data.id,
        },
      },
    }));

  const batches = chunkArray(requests, 25);
  const result = await Promise.all(
    batches.map((batch) => deleteItemBatch(callbackDataTableName, batch))
  );

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
