import { IChild } from "../../models/IChild";
import { saveChildToDB } from "../../utils/database";

export const saveChild = async (child: IChild) => {
    return new Promise<any>((resolve, reject) => {
        saveChildToDB(child)
            .then(()=>resolve(child))
            .catch((err)=>reject(err))
    });
};