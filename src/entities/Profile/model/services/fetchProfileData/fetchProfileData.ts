import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArg } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";

export const fetchProfileData = createAsyncThunk<Profile, void, { rejectValue: string, extra: ThunkExtraArg }>(
    'profile/fetchProfileData',
    async (_,thunkApi) => {
        try {
            const response = await thunkApi.extra.api.get<Profile>('/profile')
         
            return response.data
        } catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue('error')
        }
    }
)