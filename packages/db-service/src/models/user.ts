import { Record, String } from "runtypes";
import { User } from "@telegram-home-assistant/types";
import { scanItems, userTableName } from "../dynamodb";

export type UserInput = {
  language: string;
};

export const UserInputObject = Record({
  language: String,
});

export const findUserByTelegramId = (
  telegramId: number
): Promise<User | undefined> =>
  scanItems(userTableName).then((res) =>
    res.Items?.map((item) => item as User).find(
      (item) => item.telegramId === telegramId
    )
  );

export const findUserByEditToken = (
  editToken: string
): Promise<User | undefined> =>
  scanItems(userTableName).then((res) =>
    res.Items?.map((item) => item as User).find((item) =>
      item.modules.some((m) => m.token === editToken)
    )
  );