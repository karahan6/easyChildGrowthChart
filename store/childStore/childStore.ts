import { action, thunk } from "easy-peasy";
import { State } from "react-native-gesture-handler";
import { IChildStore } from "./IChildStore";

export const childStore = <IChildStore>({
    loading: false,
    childName: "ee",
    children: [],
    child: null,
    saveChild: thunk(
        async (
            actions,
            child,
            { injections: { saveChild } }
        ) => {
            saveChild(child).then(() => {
                actions.saveSuccessful(child.name);
                actions.getChildren();
            })
                .catch(err => alert(err));
        }
    ),
    getChild: thunk(
        async (
            actions,
            id,
            { injections: { getChild } }
        ) => {
            getChild(id).then((res) => {
                actions.setChild(res);
            })
                .catch(err => alert(err));
        }
    ),
    clearChild: thunk(
        async (
            actions,
            _,
            _inj
        ) => {
            actions.setChild(null);
        }
    ),
    getChildren: thunk(
        async (
            actions,
            _,
            { injections: { getChildren } }
        ) => {
            getChildren().then((res) => {
                actions.setChildren(res);
            })
                .catch(err => alert(err));
        }
    ),
    saveSuccessful: action((state, name) => {
        state.childName = name;
    }),
    setChildren: action((state, children) => {
        state.children = children
    }),
    setChild: action((state, child) => {
        state.child = child
    })
})