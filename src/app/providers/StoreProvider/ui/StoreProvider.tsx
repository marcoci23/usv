import { ReactNode, Reducer } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { stateSchema } from "../config/stateSchema";
import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<stateSchema>
}
export const StoreProvider = ({children,initialState} : StoreProviderProps) => {

    //const navigate = useNavigate()

    const store = createReduxStore(
        initialState as stateSchema,
       // navigate
    )

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
