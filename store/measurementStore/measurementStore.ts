import { action, thunk } from "easy-peasy";
import { IMeasurementStore } from "./IMeasurementStore";

export const measurementStore = <IMeasurementStore>({
    measurements: {},
    measurement: null,
    getMeasurement: thunk(
        async (
            actions,
            id,
            { injections: { getMeasurement } }
        ) => {
            getMeasurement(id).then((res) => {
                actions.setMeasurement(res);
            })
                .catch(err => alert(err));
        }
    ),
    getMeasurementsByChildId: thunk(
        async (
            actions,
            id,
            { injections: { getMeasurementsByChildId } }
        ) => {
            getMeasurementsByChildId(id).then((res) => {
                actions.setMeasurements({ id, measurements: res });
            })
                .catch(err => alert(err));
        }
    ),
    saveMeasurement: thunk(
        async (
            actions,
            measurement,
            { injections: { saveMeasurement } }
        ) => {
            saveMeasurement(measurement).then(() => {
                actions.getMeasurementsByChildId(measurement.childId);
            })
                .catch(err => alert(err));
        }
    ),
    setMeasurement: action((state, measurement) => {
        state.measurement = measurement
    }),
    setMeasurements: action((state, measurementsWithChildId) => {
        state.measurements[Number(measurementsWithChildId.id)] = measurementsWithChildId.measurements
    })
});