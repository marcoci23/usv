import { configureStore } from '@reduxjs/toolkit'
import { stateSchema } from './stateSchema'
import { ReducersMapObject } from 'redux'
import { loginReducer } from 'feautures/authByUsername'
import { userReducer } from 'entities/User'

export function createReduxStore(initialState?: stateSchema) {
    const rootReducers: ReducersMapObject<stateSchema> = {
       loginForm: loginReducer,
         user: userReducer
    }

    return configureStore<stateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        
    })
    
}

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch