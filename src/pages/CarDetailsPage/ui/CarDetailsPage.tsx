import { classNames } from "shared/lib/classNames/classNames";
import cls from './CarDetailsPage.module.scss'
import { memo } from "react";
import { CarDetails } from "entities/Car";
import { useParams } from "react-router-dom";

interface CarDetailsPageProps {
    className?: string;
}
export const CarDetailsPage = memo(({ className }: CarDetailsPageProps) => {
    return (
        <div className={classNames(cls.CarDetails, {}, [className])}>
            CAR DETAILS
        </div>
    )
})