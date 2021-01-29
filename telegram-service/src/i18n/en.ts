import { TranslationsFunc } from ".";

export const en: TranslationsFunc = () => ({
  languageName: "en",
  internalError: "Internal server error",
  replyError: "Error replying to",
  activate: "activate",
  deactivate: "deactivate",
  start: {
    name: "start",
    description: "Starts the Bot",
    message: `🚀 Welcome to the Home Assistant Bot\n\n⚙️ You can manage your modules with the '/settings' command.\n🏁 If you already added modules to you account you can start directly by using the custom keyboard`,
    error: "Error during login. Try again later. :)",
  },
  back: {
    name: "back",
    description: "Resets the keyboard",
    success: "Alright, you are now back in the start menu",
    error: "Error during login. Try again later. :)",
  },
  settings: {
    name: "settings",
    description: "Opens the settings",
    module: {
      name: "modules",
      description: "Opens the module menu",
      module: "Module",
      error: "Error loading the modules",
    },
    user: {
      name: "user",
      description: "Open the user settings",
      languagePrompt: "Please pick a language:",
    },
    pickPrompt: "Please pick an option from the menu",
  },
  lifx: {
    name: "lifx",
    description: "Opens the Lifx device menu",
    tokenUpdate: "Lifx-Token has been updated 🥳",
    tokenError: "Error during token update",
  },
  fritz: {
    name: "fritz",
    description: "Opens the Fritz device menu",
    tokenUpdate: "Fritz-Token has been updated 🥳",
    tokenError: "Error during token update",
    moduleError: "Wrong module id",
  },
  hue: {
    name: "hue",
    description: "Opens the hue device menu",
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
  setLanguage: {
    missingData: "Missing language data",
    success: "Successfull updated language",
    error: "Language couldn't be updated",
  },
});
