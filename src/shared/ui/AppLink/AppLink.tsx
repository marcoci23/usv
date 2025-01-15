import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss'
import { Link, LinkProps } from 'react-router-dom';
import { FC } from 'react';

interface AppLinkProps extends LinkProps {
    clasName?: string;
    theme?: AppLinkTheme;
    // TODO
    otherProps?: any
}

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

export const AppLink: FC<AppLinkProps> = (props) => {

    const { clasName, children, to, theme = AppLinkTheme.PRIMARY, otherProps } = props

    return (
        <Link
        to={to} 
        className={classNames(cls.AppLink,{}, [clasName, cls[theme]])}
        {...otherProps}
        >
            {children}
        </Link>
    )
}