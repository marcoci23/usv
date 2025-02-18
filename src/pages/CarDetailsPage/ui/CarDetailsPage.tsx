import { classNames } from "shared/lib/classNames/classNames";
import cls from './CarDetailsPage.module.scss'
import { memo } from "react";
import { CarDetails } from "entities/Car";
import { useParams } from "react-router-dom";
import { Page } from "widgets/Page";

interface CarDetailsPageProps {
    className?: string;
}
export const CarDetailsPage = memo(({ className }: CarDetailsPageProps) => {

    const {id} = useParams<{id: string}>()

    if(!id){
        return (
            <Page className={classNames(cls.CarDetails, {}, [className])}>
                CAR NOT FOUND
        </Page>
        )
    }

    return (
        <Page className={classNames(cls.CarDetails, {}, [className])}>
            CAR DETAILS
            <CarDetails id={id}/>
        </Page>
    )
})