import { classNames } from "shared/lib/classNames/classNames";
import cls from './CarImageBlockComponent.module.scss'

interface CarImageBlockComponentProps {
    className?: string;
}
export const CarImageBlockComponent = ({ className }: CarImageBlockComponentProps) => {
    return (
        <div className={classNames(cls.CarImageBlockComponent, {}, [className])}>
            IMG BLOCK
        </div>
    )
}