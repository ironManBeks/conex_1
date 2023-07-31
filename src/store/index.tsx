import React, { ReactElement } from "react";

import { RootStore } from "./stores";
import { IRoot } from "./stores/store";

let store: IRoot;

const StoreContext = React.createContext<RootStore | undefined>(undefined);

export const RootStoreProvider = ({
    children,
}: {
    children: React.ReactNode;
}): ReactElement => {
    const root = store ?? new RootStore();

    return (
        <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
    );
};

export const useRootStore = (): RootStore => {
    const context = React.useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useRootStore must be used within RootStoreProvider");
    }

    return context;
};
