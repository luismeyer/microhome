import { TranslationsFunc } from ".";
import { Settings } from "../commands/settings";

export const en: TranslationsFunc = () => ({
  languageName: "en",
  internalError: "Internal server error",
  replyError: "Error replying to",
  activate: "activate",
  deactivate: "deactivate",
  start: {
    message: `🚀 Welcome to the Home Assistant Bot\n\n⚙️ You can manage your modules with the '${Settings.name}' command.\n🏁 If you already added modules to you account you can start directly by using the custom keyboard`,
    error: "Error during login. Try again later. :)",
  },
  back: {
    success: "Alright, you are now back in the start menu",
    error: "Error during login. Try again later. :)",
  },
  settings: {
    pickPrompt: "Please pick an option from the menu",
    languagePrompt: "Please pick a language:",
    module: "Module",
    moduleError: "Error loading the modules",
  },
  lifx: {
    tokenUpdate: "Lifx-Token has been updated 🥳",
    tokenError: "Error during token update",
  },
  fritz: {
    tokenUpdate: "Fritz-Token has been updated 🥳",
    tokenError: "Error during token update",
    moduleError: "Wrong module id",
  },
  input: {
    markupError: "Internal Error. Wrong answer format",
    pinnedMessageError: "No pinned message",
  },
  deviceAction: {
    inputPrompt: "Answer to this message with you input data",
    databaseError: "Error querying the database",
    success: "Success!!",
    error: "Something went wrong!!",
  },
  callback: {
    error: "Wrong action",
  },
  deviceList: {
    title: (name: string) => "Your " + name + " Devices:",
    error: "You didn't subscribe to this service yet",
  },
  moduleToggle: {
    success: "Module activated",
    error: "Something went wrong",
  },
  devices: {
    lamp: "Lamp",
    status: "Status",
    color: "Color",
    thermostat: "Thermostat",
    temperature: "Temperature",
    is: "Is",
    should: "Should",
    on: "on",
    off: "off",
  },
});
