import { Action, Thunk } from "easy-peasy";
import { IChild } from "../../models/IChild";
import { IChildService } from "../../service/childService";


export interface IChildStore {
    loading: boolean;
    childName: string;
    children: IChild[];
    child: IChild | null;
    getChildren: Thunk<
        IChildStore, 
        void,
        IChildService>;
    getChild: Thunk<
        IChildStore, 
        Number,
        IChildService>;
    clearChild: Thunk<
        IChildStore, 
        void,
        IChildService>;
    saveChild: Thunk<
        IChildStore,
        IChild,
        IChildService
    >;
    saveSuccessful: Action<IChildStore, string>;
    setChildren: Action<IChildStore, IChild[]>;
    setChild: Action<IChildStore, IChild | null>;

}