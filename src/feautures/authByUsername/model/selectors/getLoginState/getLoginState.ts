import { stateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getLoginState = (state: stateSchema) => state?.loginForm || {
    username: '',
    password: '',
    error: '',
    isLoading: false
}