import { createAsyncThunk } from "@reduxjs/toolkit"
import { stateSchema, ThunkExtraArg } from "app/providers/StoreProvider"
import { Car } from "entities/Car"
import { getCatalogPageHasMore, getCatalogPageIsLoading, getCatalogPageLimit, getCatalogPageNum } from "../../selectors/catalogPageSelectors"
import { fetchCarList } from "../fetchCarList/fetchCarList"
import { catalogPageActions } from "../../slices/catalogPageSlice"

export const fetchNextPage = createAsyncThunk<void, void, { rejectValue: string, extra: ThunkExtraArg, state: stateSchema }>(
    'catalogPage/fetchNextPage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi
        const isLoading = getCatalogPageIsLoading(getState())
        const hasMore = getCatalogPageHasMore(getState())
        const page = getCatalogPageNum(getState())

        if (hasMore && !isLoading) {
            dispatch(catalogPageActions.setPage(page + 1))
            dispatch(fetchCarList({
                page: page + 1
            }))
        }
    }
)