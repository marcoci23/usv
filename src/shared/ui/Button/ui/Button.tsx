import { classNames } from "shared/lib/classNames/classNames";
import cls from './Button.module.scss'
import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}


export const Button: FC<ButtonProps> = ({ className, children, ...otherProps }) => {
    return (
        <button className={classNames(cls.Button, {}, [className])}{...otherProps}>
            {children}
        </button>
    )
}