import { saveChild } from "./saveChild";

export interface IChildService {
    saveChild: typeof saveChild;
}