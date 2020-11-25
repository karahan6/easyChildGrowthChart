import { IChild } from "../../models/IChild";
import { insertChild } from "../../utils/database";

export const saveChild = async (child: IChild) => {
    return new Promise<any>((resolve, reject) => {
        insertChild(child)
            .then(()=>resolve(child))
            .catch((err)=>reject(err))
    });
};