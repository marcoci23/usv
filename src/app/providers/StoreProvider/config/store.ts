import { configureStore } from '@reduxjs/toolkit'
import { stateSchema } from './stateSchema'

export function createReduxStore(initialState?: stateSchema) {
    return configureStore<stateSchema>({
        reducer: {},
        devTools: __IS_DEV__,
        preloadedState: initialState,
        
    })
    
}

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch