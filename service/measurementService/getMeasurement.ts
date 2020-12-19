import { getMeasurementFromDb } from "../../utils/database";

export const getMeasurement = async (id: Number) => {
    return new Promise<any>((resolve, reject) => {
        getMeasurementFromDb(id)
            .then((res)=>resolve(res))
            .catch((err)=>reject(err))
    });
};