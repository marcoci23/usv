import { stateSchema } from "app/providers/StoreProvider";

export const getProfileForm = (state: stateSchema) => state?.profile?.form;