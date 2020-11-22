import { IAuthStore, authStore as auth } from "../authStore";
import { ILocaleStore, localeStore as locale } from "../localeStore";

export interface StoreModel {
    auth: IAuthStore,
    locale: ILocaleStore
}

const model: StoreModel = {
    auth,
    locale
}

export default model;