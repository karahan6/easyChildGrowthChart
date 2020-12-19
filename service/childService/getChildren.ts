import { getChildrenFromDb } from "../../utils/database";

export const getChildren = async () => {
    return new Promise<any>((resolve, reject) => {
        getChildrenFromDb()
            .then((res)=>resolve(res))
            .catch((err)=>reject(err))
    });
};