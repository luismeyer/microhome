import { Record, String } from "runtypes";
import { scanItems, USER_TABLE } from "../dynamodb";
import { Module } from "./module";

export type User = {
  id: string;
  telegramId: number;
  modules: Module[];
  language: string;
};

export type UserInput = {
  language: string;
};

export const UserInputObject = Record({
  language: String,
});

export const findUserByTelegramId = (
  telegramId: number
): Promise<User | undefined> =>
  scanItems(USER_TABLE).then((res) =>
    res.Items?.map((item) => item as User).find(
      (item) => item.telegramId === telegramId
    )
  );

export const findUserByEditToken = (
  editToken: string
): Promise<User | undefined> =>
  scanItems(USER_TABLE).then((res) =>
    res.Items?.map((item) => item as User).find((item) =>
      item.modules.some((m) => m.token === editToken)
    )
  );
