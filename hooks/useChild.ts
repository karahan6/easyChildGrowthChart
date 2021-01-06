import { useEffect } from "react";
import { useStoreActions, useStoreState } from "../store";

const useChild = (id: number) => {
    const getChild = useStoreActions(actions => actions.child.getChild);
    const clearChild = useStoreActions(actions => actions.child.clearChild);
    const child = useStoreState(state => state.child.child);

    useEffect(()=>{
        if (id != 0)
            getChild(id);
        return () => {
            clearChild();
        }
    },[])
    return child;
};

export default useChild;