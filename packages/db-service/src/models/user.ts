import { Record, String } from "runtypes";
import { User } from "@microhome/types";
import { scanItems, userTableName } from "../db";

export type UserInput = {
  language: string;
};

export const UserInputObject = Record({
  language: String,
});

export const findUserByTelegramId = (
  telegramId: number
): Promise<User | undefined> =>
  scanItems(userTableName).then((res) => {
    if (!res.success) {
      return;
    }

    return res.result
      .map((item) => item as User)
      .find((item) => item.telegramId === telegramId);
  });

export const findUserByEditToken = (
  editToken: string
): Promise<User | undefined> =>
  scanItems(userTableName).then((res) => {
    if (!res.success) {
      return;
    }

    return res.result
      .map((item) => item as User)
      .find((item) => item.modules.some((m) => m.token === editToken));
  });
