import { ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { stateSchema } from "../config/stateSchema";
import { DeepPartial } from "@reduxjs/toolkit";

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<stateSchema>
}
export const StoreProvider = ({children,initialState} : StoreProviderProps) => {

    const store = createReduxStore(initialState as stateSchema)

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
