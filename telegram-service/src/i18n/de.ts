import { TranslationsFunc } from ".";
import { Settings } from "../commands/settings";

export const de: TranslationsFunc = () => ({
  languageName: "de",
  internalError: "Interner Fehler",
  replyError: "Fehler bei antwort auf",
  activate: "aktivieren",
  deactivate: "deaktivieren",
  start: {
    message: `🚀 Willkommen beim Home Assistant Bot\n\n⚙️ Als nächstes kannst du mit dem '${Settings.name}' Kommando deine Module verwalten.\n🏁 Wenn du schon Module hinzugfügt hast kannst du auch direkt loslegen in dem du diese im Menü auswählst`,
    error: "Fehler beim Anmelden. Versuch es später erneut. :)",
  },
  back: {
    success: "Ok, du bist jetzt wieder im Startmenü",
    error: "Fehler beim Anmelden. Versuch es später erneut. :)",
  },
  settings: {
    pickPrompt: "Bitte wähle aus dem Menü",
    module: "Modul",
    languagePrompt: "Bitte wähle eine Sprache:",
    moduleError: "Fehler beim laden der Module",
  },
  lifx: {
    tokenUpdate: "Lifx-Token wurde geupdated 🥳",
    tokenError: "Fehler beim Tokenupdate",
  },
  fritz: {
    tokenUpdate: "Fritz-Token wurde geupdated 🥳",
    tokenError: "Fehler beim Tokenupdate",
    moduleError: "Falsche Modul-id",
  },
  input: {
    markupError: "Interner Fehler. Falsches Antworten Format",
    pinnedMessageError: "Keine angepinnte Nachricht",
  },
  deviceAction: {
    inputPrompt: "Antworte auf diese Nachricht mit den Eingabe Daten",
    databaseError: "Fehler beim Abfragen der Datenbank",
    success: "Wir hatten erfolg!!",
    error: "Hat irgendwie nicht geklappt!!",
  },
  callback: {
    error: "Falsche Action",
  },
  deviceList: {
    title: (name: string) => "Deine " + name + " Geräte:",
    error: "Du hast dieses Modul nicht abonniert",
  },
  moduleToggle: {
    success: "Modul deaktiviert",
    error: "Etwas ist schiefgegangen",
  },
  devices: {
    lamp: "Lampe",
    status: "Status",
    color: "Farbe",
    thermostat: "Heizung",
    temperature: "Temperatur",
    is: "Ist",
    should: "Soll",
    on: "an",
    off: "aus",
  },
});
