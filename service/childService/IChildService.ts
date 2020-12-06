import { getChild } from "./getChild";
import { getChildren } from "./getChildren";
import { saveChild } from "./saveChild";

export interface IChildService {
    saveChild: typeof saveChild;
    getChildren: typeof getChildren;
    getChild: typeof getChild;
}