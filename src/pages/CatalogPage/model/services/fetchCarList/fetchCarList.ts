import { createAsyncThunk } from "@reduxjs/toolkit"
import { stateSchema, ThunkExtraArg } from "app/providers/StoreProvider"
import { Car } from "entities/Car"
import { getCatalogPageLimit } from "../../selectors/catalogPageSelectors"

interface fetchCarListProps {
    page?: number
    limit?: number
}

export const fetchCarList = createAsyncThunk<Car[], fetchCarListProps, { rejectValue: string, extra: ThunkExtraArg, state: stateSchema}>(
    'catalogPage/fetchCarList',
    async (props, thunkApi) => {
        const {extra, rejectWithValue, getState} = thunkApi
        const { page = 1 } = props
        const limit  = getCatalogPageLimit(getState())
        try {
            const response = await extra.api.get<Car[]>('/cars/',{
                params : {
                    _limit: limit,
                    _page: page
                }
            })

            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue('error')
        }
    }
)