import { EntityState } from "@reduxjs/toolkit";
import { Car, ViewMode } from "entities/Car";

export interface catalogPageSchema extends EntityState<Car> {
    isLoading?: boolean
    error?: string
    view: ViewMode
    //pagination
    page: number
    limit?:number
    hasMore: boolean
}  