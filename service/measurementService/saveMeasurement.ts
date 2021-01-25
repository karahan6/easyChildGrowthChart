import { IMeasurement } from "../../models/IMeasurement";
import { saveMeasurementToDB } from "../../utils/database";

export const saveMeasurement = async (measurement: IMeasurement) => {
    return new Promise<any>((resolve, reject) => {
        saveMeasurementToDB(measurement)
            .then(()=>resolve(measurement))
            .catch((err)=>reject(err))
    });
};