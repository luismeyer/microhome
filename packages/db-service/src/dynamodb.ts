import { DynamoDB } from "aws-sdk";

const { MODULE_TABLE, USER_TABLE } = process.env;
if (!MODULE_TABLE) {
  throw new Error("Missing Env Variable: 'DYNAMODB_TABLE'");
}

if (!USER_TABLE) {
  throw new Error("Missing Env Variable: 'USER_TABLE'");
}

export const moduleTableName = MODULE_TABLE;
export const userTableName = USER_TABLE;

const dynamoDb = new DynamoDB.DocumentClient();

export const putItem = (
  tablename: string,
  item: DynamoDB.DocumentClient.PutItemInput["Item"]
) => dynamoDb.put({ TableName: tablename, Item: item }).promise();

export const getItem = (tablename: string, key: DynamoDB.DocumentClient.Key) =>
  dynamoDb
    .get({
      TableName: tablename,
      Key: key,
    })
    .promise();

export const scanItems = (
  tablename: string,
  filter?: DynamoDB.DocumentClient.ScanInput["ScanFilter"]
) =>
  dynamoDb
    .scan({
      TableName: tablename,
      ScanFilter: filter,
    })
    .promise();

export const deleteItem = (
  tablename: string,
  key: DynamoDB.DocumentClient.Key
) =>
  dynamoDb
    .delete({
      TableName: tablename,
      Key: key,
    })
    .promise();
