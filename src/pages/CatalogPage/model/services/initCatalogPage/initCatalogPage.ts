import { createAsyncThunk } from "@reduxjs/toolkit";
import { stateSchema, ThunkExtraArg } from "app/providers/StoreProvider";
import { getCatalogPageInited } from "../../selectors/catalogPageSelectors";
import { catalogPageActions } from "../../slices/catalogPageSlice";
import { CarSortField } from "entities/Car";
import { SortOrder } from "shared/types";
import { fetchCarList } from "../fetchCarList/fetchCarList";

export const initCatalogPage = createAsyncThunk<void, URLSearchParams,  { rejectValue: string, extra: ThunkExtraArg, state: stateSchema }>(
    'catalogPage/initCatalogPage',
    async(searchParams, thunkApi) => {
        const {getState, dispatch} = thunkApi
        const inited   = getCatalogPageInited(getState())
        if(!inited){
           const orderFromUrl = searchParams.get('order') as SortOrder
           const searchFromUrl = searchParams.get('search') 
           const sortFromUrl = searchParams.get('sort') as CarSortField

           if(orderFromUrl){
               dispatch(catalogPageActions.setOrder(orderFromUrl))
           }
           if(searchFromUrl){
               dispatch(catalogPageActions.setSearch(searchFromUrl))
           }
           if(sortFromUrl){
               dispatch(catalogPageActions.setSort(sortFromUrl))
           }

           dispatch(catalogPageActions.initState())
           dispatch(fetchCarList({page: 1}))
        }
    }
)