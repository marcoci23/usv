import { classNames } from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss'
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import Icon from 'shared/assets/icons/icon.svg'
import { Button } from "shared/ui/Button/ui/Button";
import { useTheme } from "app/providers/ThemeProvider";

interface NavbarProps {
    clasName?: string;

}

export const Navbar = ({ clasName }: NavbarProps) => {

    const { theme, toggleTheme } = useTheme()

    return (
        <div className={classNames(cls.navbar, {}, [clasName])}>
            <Icon className={cls.icon} />
            <h3>NAVBAR</h3>
            <div className={cls.links}>
                <AppLink to={'/about'}>About</AppLink>
                <AppLink to={'/'} theme={AppLinkTheme.SECONDARY}>Main</AppLink>
                <Button onClick={toggleTheme}>theme</Button>
            </div>
            
        </div>
    )
}