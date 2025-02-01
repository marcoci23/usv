import { stateSchema } from "app/providers/StoreProvider/config/stateSchema";

export const getUserData = (state: stateSchema) => state?.user?.authData