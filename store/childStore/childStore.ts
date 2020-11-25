import { action, thunk } from "easy-peasy";
import { IChildStore } from "./IChildStore";

export const childStore = <IChildStore>({
    loading: false,
    childName: "ee",
    saveChild: thunk(
        async (
            actions,
            child,
            { injections: { saveChild } }
          ) => {
              saveChild(child).then(()=>{
                  actions.saveSuccessful(child.name);
              })
              .catch(err => actions.saveSuccessful(err));
          }
    ),
    saveSuccessful: action((state, name) => {
        state.childName = name;
      }),
})