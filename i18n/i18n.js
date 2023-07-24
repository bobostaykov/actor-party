/**
 * i18n-js is a library for internationalization,
 * so the app can be easily translated to any language.
 *
 * JSON files with the translations of all strings in the
 * app are located in the /i18n directory.
 * Currently, english and bulgarian.
 */

import i18n from "i18n-js";
import { NativeModules, Platform } from "react-native";

import bg from "./bg.json";
import en from "./en.json";

let locale;
if (Platform.OS === "ios") {
  locale =
    NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0];
} else {
  locale = NativeModules.I18nManager.localeIdentifier;
}
i18n.locale = locale.split("_")[0];
i18n.fallbacks = true;
i18n.defaultLocale = "en";
i18n.translations = { en, bg };

export default i18n;
