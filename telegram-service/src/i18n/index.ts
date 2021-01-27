import { getUser } from "../services/user";
import { de } from "./de";
import { en } from "./en";

export type TranslationsFunc = () => {
  languageName: string;

  internalError: string;
  replyError: string;
  activate: string;
  deactivate: string;
  start: {
    message: string;
    error: string;
  };
  back: {
    success: string;
    error: string;
  };
  settings: {
    pickPrompt: string;
    languagePrompt: string;
    module: string;
    moduleError: string;
  };
  lifx: {
    tokenUpdate: string;
    tokenError: string;
  };
  fritz: {
    tokenUpdate: string;
    tokenError: string;
    moduleError: string;
  };
  input: {
    pinnedMessageError: string;
    markupError: string;
  };
  deviceAction: {
    inputPrompt: string;
    databaseError: string;
    success: string;
    error: string;
  };
  callback: {
    error: string;
  };
  deviceList: {
    title: (name: string) => string;
    error: string;
  };
  moduleToggle: {
    success: string;
    error: string;
  };
  devices: {
    lamp: string;
    status: string;
    color: string;
    thermostat: string;
    temperature: string;
    is: string;
    should: string;
    on: string;
    off: string;
  };
};

export const translations = [en, de];

export const i18n = async (userId?: number) => {
  if (!userId) {
    return de();
  }

  const language = await getUser(userId)
    .then((user) => user.language)
    .catch(() => "en");

  const strings =
    translations.find((trans) => trans().languageName === language) || en;

  return strings();
};
