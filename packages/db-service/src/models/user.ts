import { Record, String } from "runtypes";
import { User } from "@microhome/types";
import { scanItems, userTableName } from "../db";

const { IS_OFFLINE } = process.env;

export type UserInput = {
  language: string;
};

export const UserInputObject = Record({
  language: String,
});

const isTestUser = (id: number) => IS_OFFLINE && id === 1234567890;

export const findUserByTelegramId = (
  telegramId: number
): Promise<User | undefined> =>
  scanItems(userTableName).then((res) => {
    if (!res.success) {
      return;
    }

    return res.result
      .map((item) => item as User)
      .find(
        (item) => item.telegramId === telegramId || isTestUser(item.telegramId)
      );
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
