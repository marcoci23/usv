// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { catalogPageSchema } from "../types/catalogPageSchema";

// const initialState: catalogPageSchema = {
//     isLoading: false,
//     error: undefined,

// }

// export const catalogPageSlice = createSlice({
//     name: 'catalogPage',
//     initialState,
//     reducers: {

//     }
// })

// export const { actions: catalogPageActions } = catalogPageSlice;
// export const { reducer: catalogPageReducer } = catalogPageSlice;


import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import { stateSchema } from 'app/providers/StoreProvider'
import { Car, ViewMode } from 'entities/Car'
import { catalogPageSchema } from '../types/catalogPageSchema'
import { fetchCarList } from '../services/fetchCarList/fetchCarList'
import { VIEW_MODE_LOCALSTORAGE_KEY } from 'shared/const/localstorage'


const catalogAdapter = createEntityAdapter<Car>({
    selectId: (car: Car) => car.id
})

export const getCatalog = catalogAdapter.getSelectors<stateSchema>(
    (state) => state.catalogPage || catalogAdapter.getInitialState()
)

const catalogPageSlice = createSlice({
    name: 'catalogPageSlice',
    initialState: catalogAdapter.getInitialState<catalogPageSchema>({
        entities: {},
        ids: [],
        view: ViewMode.TILES,
        error: undefined,
        isLoading: false,
        page: 1,
        hasMore: true
    }),
    reducers: {
        setView: (state, action: PayloadAction<ViewMode>) => {
            state.view = action.payload
            localStorage.setItem(VIEW_MODE_LOCALSTORAGE_KEY, action.payload)
        },
        setPage: (state, action: PayloadAction<number>)=>{
            state.page = action.payload
        },
        initState: (state)=>{
            const view = localStorage.getItem(VIEW_MODE_LOCALSTORAGE_KEY) as ViewMode
            state.view = view
            state.limit = view == ViewMode.LIST ? 5 : 9
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCarList.fulfilled, (state, action: PayloadAction<Car[]>) => {
                state.isLoading = false;
                catalogAdapter.addMany(state,action.payload);
                state.hasMore = action.payload.length > 0
            })
            .addCase(fetchCarList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

    }
}
)

export const { reducer: catalogPageReducer, actions: catalogPageActions } = catalogPageSlice