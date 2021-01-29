import { TranslationsFunc } from ".";

export const de: TranslationsFunc = () => ({
  languageName: "de",
  internalError: "Interner Fehler",
  replyError: "Fehler bei antwort auf",
  activate: "aktivieren",
  deactivate: "deaktivieren",
  start: {
    name: "start",
    description: "Startet den Bot",
    message: `🚀 Willkommen beim Home Assistant Bot\n\n⚙️ Als nächstes kannst du mit dem '/einstellungen' Kommando deine Module verwalten.\n🏁 Wenn du schon Module hinzugfügt hast kannst du auch direkt loslegen in dem du diese im Menü auswählst`,
    error: "Fehler beim Anmelden. Versuch es später erneut. :)",
  },
  back: {
    name: "zurück",
    description: "Setzt das Keyboard Menü zurück",
    success: "Ok, du bist jetzt wieder im Startmenü",
    error: "Fehler beim Anmelden. Versuch es später erneut. :)",
  },
  settings: {
    name: "einstellungen",
    description: "Öffnet das Konfigurationsmenü",
    pickPrompt: "Bitte wähle aus dem Menü",
    module: {
      name: "module",
      description: "Öffnet das Modulemenü",
      module: "Modul",
      error: "Fehler beim laden der Module",
    },
    user: {
      name: "benutzer",
      description: "Öffnet das Nutzermenü",
      languagePrompt: "Bitte wähle eine Sprache:",
    },
  },
  lifx: {
    name: "lifx",
    description: "Öffnet das Lifx Gerätemenü",
    tokenUpdate: "Lifx-Token wurde geupdated 🥳",
    tokenError: "Fehler beim Tokenupdate",
  },
  fritz: {
    name: "fritz",
    description: "Öffnet das Fritz Gerätemenü",
    tokenUpdate: "Fritz-Token wurde geupdated 🥳",
    tokenError: "Fehler beim Tokenupdate",
    moduleError: "Falsche Modul-id",
  },
  hue: {
    name: "hue",
    description: "Öffnet das Hue Gerätemenü",
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
  setLanguage: {
    missingData: "Sprache fehlt",
    success: "Sprache wurde aktualisiert",
    error: "Sprache konnte nicht aktualisiert werden",
  },
});
