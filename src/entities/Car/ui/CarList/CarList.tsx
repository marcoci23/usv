import { classNames } from "shared/lib/classNames/classNames";
import cls from './CarList.module.scss'
import { Car, ViewMode,  } from "../../model/types/car";
import { CarListItem } from "../CarListItem/CarListItem";

interface CarListProps {
    className?: string;
    items: Car[]
    isLoading?: boolean
    view?: ViewMode
}
export const CarList = ({ className, items, isLoading, view = ViewMode.TILES }: CarListProps) => {

    const renderItem = (item: Car) => {
        return (
            <CarListItem item={item} view={view} key={item.id}/>
        )
    }
 
    return (
        <div className={classNames(cls.CarList, {}, [className])}>
            {items.length > 0
                ? items.map(renderItem)
                : <div>***NO DATA***</div>
        }
        </div>
    )
}