import { configureStore } from '@reduxjs/toolkit'
import { stateSchema, ThunkExtraArg } from './stateSchema'
import { CombinedState, Reducer, ReducersMapObject } from 'redux'
import { userReducer } from 'entities/User'
import { createReducerManager } from './reducerManager'
import { $api } from 'shared/api/api'

export function createReduxStore(initialState?: stateSchema, asyncReducers?: ReducersMapObject<stateSchema>) {
    const rootReducers: ReducersMapObject<stateSchema> = {
        ...asyncReducers,
        user: userReducer
    }

    const reducerManager = createReducerManager(rootReducers)

    const extraArg: ThunkExtraArg = {
        api: $api,
    }

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<stateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: extraArg } })
    })
    //@ts-ignore
    store.reducerManager = reducerManager

    return store
}

// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
// export const useAppDispatch = () => useDispatch<AppDispatch>()