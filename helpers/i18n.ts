import { createIntl } from "react-intl";
import { store } from "../store";

import messages_en from "../i18n/en-US.json";
import messages_tr from "../i18n/tr-TR.json";

export interface Languages<T> {
  [key: string]: T;
  "en": T;
  "tr": T;
}

export interface Language {
  title: string;
  code: string;
  key: string;
}

export const languages: Languages<any> = {
  "en": messages_en,
  "tr": messages_tr
};

export const availableLanguagesArr: Language[] = [
  {
    key: "en",
    code: "EN-US",
    title: "United States (English)"
  },
  {
    key: "tr",
    code: "TR-TR",
    title: "Türkiye (Türkçe)"
  }
];

export const formatMessage = (
  id: string,
  variables?: { [key: string]: any }
) => createIntl({
  locale: store.getState().locale.currentLocale,
  messages: languages[store.getState().locale.currentLocale]
}).formatMessage({id}, variables);