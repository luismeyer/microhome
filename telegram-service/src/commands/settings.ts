import { InlineKeyboardMarkup, Message } from "node-telegram-bot-api";
import bot from "../bot";
import { generateSwitch } from "../keyboard";
import { getModules } from "../services/module";
import { hasModule } from "../services/user";
import {
  ACTIVATE_MODULE,
  DEACTIVATE_MODULE,
} from "../telegram/callback-actions";
import { createCallbackData } from "../telegram/callback-data";
import { Command } from "../telegram/command";

export const Settings: Command = {
  name: "einstellungen",
  description: "Öffnet das Konfigurationsmenü",
};

export const replyToSettings = async ({ chat, from }: Message) => {
  console.log("Reply to settings");
  const { id } = from;

  return getModules()
    .then((modules) =>
      Promise.all(
        modules.map(async (module) => {
          const userHasModule = await hasModule(id, module.id);

          const action = userHasModule ? DEACTIVATE_MODULE : ACTIVATE_MODULE;
          const cb = createCallbackData(module.id, "", action);

          const markup: InlineKeyboardMarkup = {
            inline_keyboard: [[generateSwitch(userHasModule, cb)]],
          };

          return bot.sendMessage(chat.id, "Modul: " + module.name, {
            reply_markup: markup,
          });
        })
      )
    )
    .catch((e) =>
      bot.sendMessage(chat.id, "Fehler beim laden der Module " + e)
    );
};
