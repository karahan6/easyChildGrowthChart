import { getMeasurementsByChildIdFromDb } from "../../utils/database";

export const getMeasurementsByChildId = async (childId: Number) => {
    return new Promise<any>((resolve, reject) => {
        getMeasurementsByChildIdFromDb(childId)
            .then((res)=>resolve(res))
            .catch((err)=>reject(err))
    });
};