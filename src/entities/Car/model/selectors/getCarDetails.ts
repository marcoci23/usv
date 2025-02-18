import { stateSchema } from "app/providers/StoreProvider";

export const getCarDetailsData = (state: stateSchema) => state.carDetails?.data
export const getCarDetailsIsLoading = (state: stateSchema) => state.carDetails?.isLoading
export const getCarDetailsError = (state: stateSchema) => state.carDetails?.error