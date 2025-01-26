import { stateSchema } from "app/providers/StoreProvider";

export const getProfileIsLoading = (state : stateSchema) => state?.profile?.isLoading;