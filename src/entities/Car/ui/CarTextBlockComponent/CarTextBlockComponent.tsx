import { classNames } from "shared/lib/classNames/classNames";
import cls from './CarTextBlockComponent.module.scss'

interface CarTextBlockComponentProps {
    className?: string;
}
export const CarTextBlockComponent = ({ className }: CarTextBlockComponentProps) => {
    return (
        <div className={classNames(cls.CarTextBlockComponent, {}, [className])}>
            TXT BLOCK
        </div>
    )
}