import { classNames } from "shared/lib/classNames/classNames";
import cls from './CarDetails.module.scss'
import { memo, useCallback, useEffect } from "react";
import { carDetailsReducer } from "entities/Car/model/slice/carDetailsSlice";
import { useSelector, useStore } from "react-redux";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchCarById } from "entities/Car/model/services/fetchCarById/fetchCarById";
import { getCarDetailsData, getCarDetailsError, getCarDetailsIsLoading } from "../../model/selectors/getCarDetails";
import { CarBlock, CarBlockType } from "entities/Car/model/types/car";
import { CarImageBlockComponent } from "../CarImageBlockComponent/CarImageBlockComponent";
import { CarSpecBlockComponent } from "../CarSpecBlockComponent/CarSpecBlockComponent";
import { CarTextBlockComponent } from "../CarTextBlockComponent/CarTextBlockComponent";

interface CarDetailsProps {
    className?: string;
    id: string
}
export const CarDetails = memo(({ className, id }: CarDetailsProps) => {

    const store = useStore() as ReduxStoreWithManager
    const dispatch = useAppDispatch()

    const data = useSelector(getCarDetailsData)
    const isLoading = useSelector(getCarDetailsIsLoading)
    const error = useSelector(getCarDetailsError)

    useEffect(() => {
        store.reducerManager.add('carDetails', carDetailsReducer)

        return () => {
            store.reducerManager.remove('carDetails')
        }

    }, [])

    useEffect(() => {
        dispatch(fetchCarById(id))
    }, [id])

    const renderBlock = useCallback((block: CarBlock) => {
        switch (block.type) {
            case CarBlockType.IMAGE:
                return <CarImageBlockComponent />
            case CarBlockType.SPECIFICATIONS:
                return <CarSpecBlockComponent />
            case CarBlockType.TEXT:
                return <CarTextBlockComponent />
            default: return null
        }
    }, [])

    if (isLoading) return <div>Loading...</div>
    else if (error) return <div>Error</div>

    return (
        <div className={classNames(cls.CarDetails, {}, [className])}>
            car details
            <div>{data?.title}</div>
            <div>{data?.type}</div>
            <div className={cls.blocks}>
            {data?.blocks.map(renderBlock)}
            </div>
        </div>
    )
})