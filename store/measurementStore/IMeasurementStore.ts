import { Action, Thunk } from "easy-peasy";
import { IMeasurement } from "../../models/IMeasurement";
import { IMeasurementService } from "../../service/measurementService/IMeasurementService";

export interface IMeasurementStore {
    measurements: Record<number, IMeasurement[]>;
    measurement: IMeasurement | null;
    getMeasurementsByChildId: Thunk<
        IMeasurementStore, 
        Number,
        IMeasurementService>;
    getMeasurement: Thunk<
        IMeasurementStore, 
        Number,
        IMeasurementService>;
    clearMeasurement: Thunk<
        IMeasurementStore, 
        void,
        IMeasurementService>;
    saveMeasurement: Thunk<
        IMeasurementStore,
        IMeasurement,
        IMeasurementService
    >;
    setMeasurements: Action<IMeasurementStore, { id: Number; measurements: IMeasurement []}>;
    setMeasurement: Action<IMeasurementStore, IMeasurement | null>;

}