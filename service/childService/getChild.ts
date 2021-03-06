import { getChildFromDb } from "../../utils/database";

export const getChild = async (id: Number) => {
    return new Promise<any>((resolve, reject) => {
        getChildFromDb(id)
            .then((res)=>resolve(res))
            .catch((err)=>reject(err))
    });
};