import { classNames } from "shared/lib/classNames/classNames";
import cls from './Button.module.scss'
import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
}


export const Button: FC<ButtonProps> = ({ className, children,disabled, ...otherProps }) => {
    return (
        <button 
            className={classNames(cls.Button, {[cls.disabled] : disabled}, [className])}{...otherProps}
            disabled={disabled}
            >
            {children}
        </button>
    )
}