import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { carDetailsSchema } from "../types/carDetailsSchema";
import { Car } from "../types/car";
import { fetchCarById } from "../services/fetchCarById/fetchCarById";


const initialState: carDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined
}

export const carDetailsSlice = createSlice({
    name: 'carDetails',
    initialState,
    reducers: {

    },
        extraReducers: (builder) => {
            builder
                .addCase(fetchCarById.pending, (state, action) => {
                    state.error = undefined;
                    state.isLoading = true;
                })
                .addCase(fetchCarById.fulfilled, (state, action: PayloadAction<Car>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                })
                .addCase(fetchCarById.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                })
                
        }
})

export const { actions: carDetailsActions } = carDetailsSlice;
export const { reducer: carDetailsReducer } = carDetailsSlice;