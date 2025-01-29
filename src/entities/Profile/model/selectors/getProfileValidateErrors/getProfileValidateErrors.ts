import { stateSchema } from "app/providers/StoreProvider"

export const getProfileValidateErrors = (state: stateSchema) => state.profile?.validateErrors