import { createStore, createTypedHooks } from "easy-peasy";
import { composeWithDevTools } from "redux-devtools-extension";
import { Injections } from "../models/Injections";
import {login} from "../service/authService";
import {saveChild, getChildren, getChild} from "../service/childService";
import model, { StoreModel } from "./model";

const { useStoreActions, useStoreDispatch, useStoreState } = createTypedHooks<
StoreModel
>();

export { useStoreActions, useStoreDispatch, useStoreState };

const injections: Injections = {
    login,
    saveChild,
    getChildren,
    getChild
};

// const logger = store: => next => action => {
//     let result = next(action);
// return result;
// };

const store = createStore(model, {
injections,
//middleware: [logger],
compose: composeWithDevTools({ trace: true })
});

export { store };
