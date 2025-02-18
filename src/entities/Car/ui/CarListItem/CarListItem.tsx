import { classNames } from "shared/lib/classNames/classNames";
import cls from './CarListItem.module.scss'
import { Car, ViewMode } from "../../model/types/car";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Button } from "shared/ui/Button/ui/Button";

interface CarListItemProps {
    className?: string;
    item: Car;
    view: ViewMode
}
export const CarListItem = ({ className, item, view }: CarListItemProps) => {

    const navigate = useNavigate()

    const onOpenCarDetails = useCallback(() => {
        navigate(RoutePath.car_details + item.id);
    }, [item.id, navigate]);


    if (view == ViewMode.LIST) {
        return (
            <div className={classNames(cls.CarListItem, {}, [className, cls[view]])}>
                CAR LIST ITEM list
                {item.title}
                <div>{item.img}</div>
            </div>
        )
    }

    return (
        <div onClick={onOpenCarDetails} className={classNames(cls.CarListItem, {}, [className, cls[view]])}>
            CAR LIST ITEM tiles
            {item.title}
            <div>{item.img}</div>
            <div>{item.subtitle}</div>
            <div>{item.img}</div>
            <div>{item.createdAt}</div>
            <div>{item.type}</div>
            <div>{item.views}</div>
        </div>
    )
}