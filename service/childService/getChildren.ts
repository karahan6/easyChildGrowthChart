import { getChildrenFromSqlite } from "../../utils/database";

export const getChildren = async () => {
    return new Promise<any>((resolve, reject) => {
        getChildrenFromSqlite()
            .then((res)=>resolve(res))
            .catch((err)=>reject(err))
    });
};