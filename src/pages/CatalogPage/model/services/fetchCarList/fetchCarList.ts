import { createAsyncThunk } from "@reduxjs/toolkit"
import { stateSchema, ThunkExtraArg } from "app/providers/StoreProvider"
import { Car, CarType } from "entities/Car"
import { getCatalogPageLimit, getCatalogpageOrder, getCatalogPageSearch, getCatalogPageSort, getCatalogPageType } from "../../selectors/catalogPageSelectors"
import { addQueryParams } from "shared/lib/url/addQueryParams/addQueryParams"

interface fetchCarListProps {
    page?: number
    replace?: boolean
}

export const fetchCarList = createAsyncThunk<Car[], fetchCarListProps, { rejectValue: string, extra: ThunkExtraArg, state: stateSchema }>(
    'catalogPage/fetchCarList',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi
        const { page = 1, replace } = props
        const limit = getCatalogPageLimit(getState())
        const sort = getCatalogPageSort(getState())
        const order = getCatalogpageOrder(getState())
        const search = (getCatalogPageSearch(getState()))
        const type = getCatalogPageType(getState())

        try {
            addQueryParams({
                sort, order, search, type
            })
            const response = await extra.api.get<Car[]>('/cars/', {
                params: {
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    q: search,
                    type : type === CarType.ALL ? undefined : type
                }
            })

            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue('error')
        }
    }
)