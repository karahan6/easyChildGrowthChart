import { getMeasurement } from "./getMeasurement";
import { getMeasurements } from "./getMeasurements";
import { getMeasurementsByChildId } from "./getMeasurementsByChildId";
import { saveMeasurement } from "./saveMeasurement";

export interface IMeasurementService {
    saveMeasurement: typeof saveMeasurement;
    getMeasurements: typeof getMeasurements;
    getMeasurement: typeof getMeasurement;
    getMeasurementsByChildId: typeof getMeasurementsByChildId;
}