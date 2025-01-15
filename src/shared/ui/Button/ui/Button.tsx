import { classNames } from "shared/lib/classNames/classNames";
import cls from './Button.module.scss'
import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    clasName?: string;
}


export const Button: FC<ButtonProps> = ({ clasName, children, ...otherProps }) => {
    return (
        <button className={classNames(cls.Button, {}, [clasName])}{...otherProps}>
            {children}
        </button>
    )
}