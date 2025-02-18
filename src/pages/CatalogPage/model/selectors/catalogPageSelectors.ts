import { stateSchema } from "app/providers/StoreProvider";
import { ViewMode } from "entities/Car";

export const getCatalogPageIsLoading = (state: stateSchema) => state.catalogPage?.isLoading || false
export const getCatalogPageError = (state: stateSchema) => state.catalogPage?.error
export const getCatalogPageView = (state: stateSchema) => state.catalogPage?.view || ViewMode.TILES
export const getCatalogPageNum = (state: stateSchema) => state.catalogPage?.page || 1
export const getCatalogPageLimit = (state: stateSchema) => state.catalogPage?.limit || 9
export const getCatalogPageHasMore = (state: stateSchema) => state.catalogPage?.hasMore