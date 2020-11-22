import { Action } from "easy-peasy";

export interface ILocaleStore {
    currentLocale: string;
    setLocale: Action<ILocaleStore, string>;
  }