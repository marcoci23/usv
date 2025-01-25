import { configureStore } from '@reduxjs/toolkit'
import { stateSchema } from './stateSchema'
import { ReducersMapObject } from 'redux'
import { userReducer } from 'entities/User'
import { createReducerManager } from './reducerManager'

export function createReduxStore(initialState?: stateSchema) {
    const rootReducers: ReducersMapObject<stateSchema> = {
        user: userReducer
    }

    const reducerManager = createReducerManager(rootReducers)

    const store = configureStore<stateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,

    })
    //@ts-ignore
    store.reducerManager = reducerManager

    return store
}

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch