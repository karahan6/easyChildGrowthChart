import { IMeasurement } from "../../models/IMeasurement";
import { insertMeasurement } from "../../utils/database";

export const saveMeasurement = async (measurement: IMeasurement) => {
    return new Promise<any>((resolve, reject) => {
        insertMeasurement(measurement)
            .then(()=>resolve(measurement))
            .catch((err)=>reject(err))
    });
};