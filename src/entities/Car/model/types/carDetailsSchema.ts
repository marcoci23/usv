import { Car } from "./car"

export interface carDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Car;
}