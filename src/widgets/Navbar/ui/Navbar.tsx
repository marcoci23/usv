import { classNames } from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss'
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import Icon from 'shared/assets/icons/icon.svg'
import { Button } from "shared/ui/Button/ui/Button";
import { useTheme } from "app/providers/ThemeProvider";
import { Suspense, useCallback, useState } from "react";
import { Modal } from "shared/ui/Modal/Modal";
import { LoginFormAsync } from "feautures/authByUsername/ui/LoginForm/LoginForm.async";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, userActions } from "entities/User";


interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {

    const dispatch = useDispatch()

    const { theme, toggleTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const userData = useSelector(getUserData)

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    if (userData) {
        return (
            <div className={classNames(cls.navbar, {}, [className])}>
                <Icon className={cls.icon} />
                <h3>NAVBAR</h3>
                <div className={cls.links}>
                    <AppLink to={'/about'}>About</AppLink>
                    <AppLink to={'/'} theme={AppLinkTheme.SECONDARY}>Main</AppLink>
                    <AppLink to={'/profile'} theme={AppLinkTheme.SECONDARY}>Profile</AppLink>
                    <Button onClick={toggleTheme}>theme</Button>
                </div>
                <Button onClick={onLogout}>logout</Button>
            </div>
        )
    }

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <Icon className={cls.icon} />
            <h3>NAVBAR</h3>
            <div className={cls.links}>
                <AppLink to={'/about'}>About</AppLink>
                <AppLink to={'/'} theme={AppLinkTheme.SECONDARY}>Main</AppLink>
                <Button onClick={toggleTheme}>theme</Button>
            </div>
            {!userData && <button onClick={() => setIsOpen(true)} >open</button>}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Suspense fallback={<div>loading...</div>}>
                    <LoginFormAsync onSucces={()=>setIsOpen(false)}></LoginFormAsync>
                </Suspense>
                <button onClick={() => setIsOpen(false)}>close</button>
            </Modal>
        </div>
    )
}