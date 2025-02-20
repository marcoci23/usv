import { AnyAction, combineReducers, Reducer, ReducersMapObject } from "@reduxjs/toolkit"
import { MountedReducers, ReducerManager, stateSchema, stateSchemaKey } from "./stateSchema"

export function createReducerManager(initialReducers: ReducersMapObject<stateSchema>): ReducerManager {
    const reducers = { ...initialReducers }
    let combinedReducer = combineReducers(reducers)
    let keysToRemove: stateSchemaKey[] = []
    const mountedReducer: MountedReducers = {}

    return {
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedReducer,
        reduce: (state: stateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state }
                for (let key of keysToRemove) {
                    delete state[key]
                }
                keysToRemove = []
            }
            return combinedReducer(state, action)
        },

        add: (key: stateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return
            }

            reducers[key] = reducer
            mountedReducer[key] = true
            combinedReducer = combineReducers(reducers)
        },

        remove: (key: stateSchemaKey) => {
            if (!key || !reducers[key]) {
                return
            }

            delete reducers[key]
            keysToRemove.push(key)
            mountedReducer[key] = false
            combinedReducer = combineReducers(reducers)
        }
    }
}