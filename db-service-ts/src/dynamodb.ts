import { DynamoDB } from "aws-sdk";

export const { MODULE_TABLE } = process.env;
if (!MODULE_TABLE) {
  throw new Error("Missing Env Variable: 'DYNAMODB_TABLE'");
}

const dynamoDb = new DynamoDB.DocumentClient();

export const putItem = (params: DynamoDB.DocumentClient.PutItemInput) =>
  dynamoDb.put(params).promise();

export const getItem = (params: DynamoDB.DocumentClient.GetItemInput) =>
  dynamoDb.get(params).promise();

export const updateItem = (params: DynamoDB.DocumentClient.UpdateItemInput) =>
  dynamoDb.update(params).promise();

export const scanItems = (params: DynamoDB.DocumentClient.ScanInput) =>
  dynamoDb.scan(params).promise();
