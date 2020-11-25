import { Action, Thunk } from "easy-peasy";
import { IChild } from "../../models/IChild";
import { IChildService } from "../../service/childService";


export interface IChildStore {
    loading: boolean;
    childName: string;
    saveChild: Thunk<
        IChildStore,
        IChild,
        IChildService
    >;
    saveSuccessful: Action<IChildStore, string>;
}