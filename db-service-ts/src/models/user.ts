import { scanItems, USER_TABLE } from "../dynamodb";
import { Module } from "./module";

export type User = {
  id: string;
  telegramId: number;
  modules: Module[];
};

export const findUserByTelegramId = (
  telegramId: number
): Promise<User | undefined> =>
  scanItems(USER_TABLE).then((res) =>
    res.Items?.map((item) => item as User).find(
      (item: User) => item.telegramId === telegramId
    )
  );
