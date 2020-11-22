import AsyncStorage from "@react-native-async-storage/async-storage";
import { action, persist } from "easy-peasy";
import { ILocaleStore } from "./ILocaleStore";

export const localeStore = persist<ILocaleStore>({
    currentLocale: "en",
    setLocale: action((state, locale) => {
      state.currentLocale = locale;
      AsyncStorage.setItem("currentLocale", locale);
    })
  },
  {
    storage: {
      setItem: (key, data) => AsyncStorage.setItem(key, data),
      getItem: key => AsyncStorage.getItem(key),
      removeItem: key => AsyncStorage.removeItem(key)
    },
    allow: ["currentLocale"]
  }
);