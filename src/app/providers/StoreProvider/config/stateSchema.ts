import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { ProfileSchema } from "entities/Profile";
import { UserSchema } from "entities/User";
import { loginSchema } from "feautures/authByUsername";
import { NavigateOptions, To } from "react-router-dom";

export interface stateSchema {
    user: UserSchema

    //async reducers
    loginForm?: loginSchema
    profile?: ProfileSchema
}
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<stateSchema>;
    reduce: (state: stateSchema, action: AnyAction) => CombinedState<stateSchema>
    add: (key: stateSchemaKey, reducer: Reducer) => void;
    remove: (key: stateSchemaKey) => void;
}

export type stateSchemaKey = keyof stateSchema

export interface ReduxStoreWithManager extends EnhancedStore<stateSchema> { 
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance,
    navigate?: (to: To, options?: NavigateOptions) => void
}