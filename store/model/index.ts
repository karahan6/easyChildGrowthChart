import { IAuthStore, authStore as auth } from "../authStore";
import { IChildStore, childStore as child } from "../childStore";
import { ILocaleStore, localeStore as locale } from "../localeStore";

export interface StoreModel {
    auth: IAuthStore,
    locale: ILocaleStore,
    child: IChildStore
}

const model: StoreModel = {
    auth,
    locale,
    child
}

export default model;