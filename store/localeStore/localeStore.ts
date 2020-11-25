import AsyncStorage from "@react-native-async-storage/async-storage";
import { action, persist } from "easy-peasy";
import { ILocaleStore } from "./ILocaleStore";

export const localeStore = <ILocaleStore>({
    currentLocale: "en",
    setLocale: action((state, locale) => {
      state.currentLocale = locale;
    })
  }
);