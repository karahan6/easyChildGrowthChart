import { IAuthStore, authStore as auth } from "../authStore";
import { IChildStore, childStore as child } from "../childStore";
import { ILocaleStore, localeStore as locale } from "../localeStore";
import { IMeasurementStore, measurementStore as measurement } from "../measurementStore";

export interface StoreModel {
    auth: IAuthStore,
    locale: ILocaleStore,
    child: IChildStore,
    measurement: IMeasurementStore
}

const model: StoreModel = {
    auth,
    locale,
    child,
    measurement
}

export default model;