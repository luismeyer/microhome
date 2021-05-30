import { getUser } from "../services/user";
import { setState, state } from "../utils/state";
import { de } from "./de";
import { en } from "./en";

export type TranslationsFunc = () => {
  languageName: string;

  internalError: string;
  replyError: string;
  activate: string;
  deactivate: string;
  start: {
    name: string;
    description: string;
    message: string;
    error: string;
  };
  back: {
    name: string;
    description: string;
    success: string;
    error: string;
  };
  settings: {
    name: string;
    description: string;
    pickPrompt: string;
    module: {
      name: string;
      description: string;
      module: string;
      error: string;
    };
    user: {
      name: string;
      description: string;
      languagePrompt: string;
    };
  };
  lifx: {
    name: string;
    description: string;
    tokenUpdate: string;
    tokenError: string;
  };
  fritz: {
    name: string;
    description: string;
    tokenUpdate: string;
    tokenError: string;
    moduleError: string;
  };
  hue: {
    name: string;
    description: string;
  };
  input: {
    dbError: string;
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
  setLanguage: {
    missingData: string;
    success: string;
    error: string;
  };
};

export const translations = [en, de];

export const setI18n = async (userId?: number, fallback?: string) => {
  if (!userId) {
    return;
  }

  const language = await getUser(userId)
    .then((user) => user.language)
    .catch(() => fallback ?? "en");

  setState({
    language,
  });
};

export const i18n = () => {
  if (!state.language) {
    return en();
  }

  const strings =
    translations.find((trans) => trans().languageName === state.language) || en;

  return strings();
};
