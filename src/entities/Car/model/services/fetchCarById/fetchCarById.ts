import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArg } from "app/providers/StoreProvider";
import { Car } from "../../types/car";

export const fetchCarById = createAsyncThunk<Car, string, { rejectValue: string, extra: ThunkExtraArg }>(
    'carDetails/fetchCarById',
    async (carId, thunkApi) => {
        try {
            const response = await thunkApi.extra.api.get<Car>('/cars/' + carId)

            return response.data
        } catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue('error')
        }
    }
)