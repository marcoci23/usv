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
import { Car, CarSortField, CarType, ViewMode } from 'entities/Car'
import { catalogPageSchema } from '../types/catalogPageSchema'
import { fetchCarList } from '../services/fetchCarList/fetchCarList'
import { VIEW_MODE_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import { SortOrder } from 'shared/types'


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
        hasMore: true,
        _inited: false,
        limit: 9,
        order: 'asc',
        sort: CarSortField.CREATED_AT,
        search: '',
        type: CarType.ALL
    }),
    reducers: {
        setView: (state, action: PayloadAction<ViewMode>) => {
            state.view = action.payload
            localStorage.setItem(VIEW_MODE_LOCALSTORAGE_KEY, action.payload)
        },
        setPage: (state, action: PayloadAction<number>)=>{
            state.page = action.payload
        },
        setOrder: (state, action: PayloadAction<SortOrder>)=>{
            state.order = action.payload
        },
        setSort: (state, action: PayloadAction<CarSortField>)=>{
            state.sort = action.payload
        },
        setSearch: (state, action: PayloadAction<string>)=>{
            state.search = action.payload
        },
        setType: (state, action: PayloadAction<CarType>)=>{
            state.type = action.payload
        },
        initState: (state)=>{
            const view = localStorage.getItem(VIEW_MODE_LOCALSTORAGE_KEY) as ViewMode
            state.view = view
            state.limit = view == ViewMode.LIST ? 5 : 9
            state._inited = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarList.pending, (state,action) => {
                state.error = undefined;
                state.isLoading = true;
                if(action.meta.arg.replace){
                    catalogAdapter.removeAll(state);}
            })
            .addCase(fetchCarList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit

                if(action.meta.arg.replace){
                catalogAdapter.setAll(state,action.payload);
                } else {
                catalogAdapter.addMany(state,action.payload);
                }
            })
            .addCase(fetchCarList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

    }
}
)

export const { reducer: catalogPageReducer, actions: catalogPageActions } = catalogPageSlice