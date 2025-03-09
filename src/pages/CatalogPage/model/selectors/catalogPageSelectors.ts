import { stateSchema } from "app/providers/StoreProvider";
import { CarSortField, CarType, ViewMode } from "entities/Car";

export const getCatalogPageIsLoading = (state: stateSchema) => state.catalogPage?.isLoading || false
export const getCatalogPageError = (state: stateSchema) => state.catalogPage?.error
export const getCatalogPageView = (state: stateSchema) => state.catalogPage?.view || ViewMode.TILES
export const getCatalogPageNum = (state: stateSchema) => state.catalogPage?.page || 1
export const getCatalogPageLimit = (state: stateSchema) => state.catalogPage?.limit || 9
export const getCatalogPageHasMore = (state: stateSchema) => state.catalogPage?.hasMore
export const getCatalogPageInited = (state: stateSchema) => state.catalogPage?._inited
export const getCatalogpageOrder = (state: stateSchema) => state.catalogPage?.order || 'asc'
export const getCatalogPageSort = (state: stateSchema) => state.catalogPage?.sort || CarSortField.CREATED_AT
export const getCatalogPageSearch = (state: stateSchema) => state.catalogPage?.search || ''
export const getCatalogPageType = (state: stateSchema) => state.catalogPage?.type || CarType.ALL