import { getMeasurementsFromDb } from "../../utils/database";

export const getMeasurements = async () => {
    return new Promise<any>((resolve, reject) => {
        getMeasurementsFromDb()
            .then((res)=>resolve(res))
            .catch((err)=>reject(err))
    });
};