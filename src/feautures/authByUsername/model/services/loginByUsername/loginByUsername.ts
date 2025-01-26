import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArg } from "app/providers/StoreProvider";
import axios from "axios";
import { User, userActions } from "entities/User";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface loginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, loginByUsernameProps, {rejectValue: string, extra: ThunkExtraArg} >(
    'login/loginByUsername',
    async (authData: loginByUsernameProps, thunkApi) => {
        try {
            const response = await thunkApi.extra.api.post<User>('/login', authData)
            if (!response.data) {
                throw new Error('error')
            } 
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
            thunkApi.dispatch(userActions.setAuthData(response.data))      
            return response.data
        } catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue('error')
        }
    }
)