import { createAsyncThunk } from "@reduxjs/toolkit";
import { stateSchema, ThunkExtraArg } from "app/providers/StoreProvider";
import { Profile, validateProfileError } from "../../types/profile";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfileData } from "../validateProfileData/validateProfileData";

export const updateProfileData = createAsyncThunk<Profile, void, { rejectValue: validateProfileError[], extra: ThunkExtraArg, state: stateSchema }>(
    'profile/updateProfileData',
    async (_,thunkApi) => {

        const formData = getProfileForm(thunkApi.getState())
        const errors = validateProfileData(formData)

        if(errors.length){
            return thunkApi.rejectWithValue(errors)
        }

        try {
            const response = await thunkApi.extra.api.put<Profile>('/profile', formData)
            return response.data
        } catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue([validateProfileError.SERVER_ERROR])
        }
    }
)