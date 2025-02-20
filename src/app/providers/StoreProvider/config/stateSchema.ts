import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { carDetailsSchema } from "entities/Car";
import { ProfileSchema } from "entities/Profile";
import { UserSchema } from "entities/User";
import { loginSchema } from "feautures/authByUsername";
import { catalogPageSchema } from "pages/CatalogPage";

export interface stateSchema {
    user: UserSchema

    //async reducers
    loginForm?: loginSchema
    profile?: ProfileSchema
    carDetails?: carDetailsSchema
    catalogPage?: catalogPageSchema
}
export type stateSchemaKey = keyof stateSchema

export type MountedReducers = OptionalRecord<stateSchemaKey, boolean>

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<stateSchema>;
    reduce: (state: stateSchema, action: AnyAction) => CombinedState<stateSchema>;
    add: (key: stateSchemaKey, reducer: Reducer) => void;
    remove: (key: stateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}



export interface ReduxStoreWithManager extends EnhancedStore<stateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance
}