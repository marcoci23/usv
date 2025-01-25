import { stateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getLoginState = (state: stateSchema) => state?.loginForm || {
    username: 'asdasds',
    password: '',
    error: '',
    isLoading: false
}