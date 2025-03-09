import { EntityState } from "@reduxjs/toolkit";
import { Car, CarSortField, CarType, ViewMode } from "entities/Car";
import { SortOrder } from "shared/types";

export interface catalogPageSchema extends EntityState<Car> {
    isLoading?: boolean
    error?: string
    _inited?: boolean
    //pagination
    page: number
    limit:number
    hasMore: boolean
    //filters
    view: ViewMode
    order: SortOrder
    sort: CarSortField
    search: string
    type: CarType
}  