import { classNames } from "shared/lib/classNames/classNames";
import cls from './CarSpecBlockComponent.module.scss'

interface CarSpecBlockComponentProps {
    className?: string;
}
export const CarSpecBlockComponent = ({ className }: CarSpecBlockComponentProps) => {
    return (
        <div className={classNames(cls.CarSpecBlockComponent, {}, [className])}>
            SPECIFICATIONS BLOCK
        </div>
    )
}