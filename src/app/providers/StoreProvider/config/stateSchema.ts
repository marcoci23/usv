import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { UserSchema } from "entities/User";
import { loginSchema } from "feautures/authByUsername";

export interface stateSchema {
    user: UserSchema

    //async reducers
    loginForm?: loginSchema
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