import { stateSchema } from "app/providers/StoreProvider";

export const getProfileReadonly = (state : stateSchema) => state?.profile?.readonly;