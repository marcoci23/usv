import { stateSchema } from "app/providers/StoreProvider";

export const getProfileError = (state : stateSchema) => state?.profile?.error;