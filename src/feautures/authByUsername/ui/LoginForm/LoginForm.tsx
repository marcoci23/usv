import { useDispatch, useSelector, useStore } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss';
import { memo, useCallback, useEffect } from "react";
import { loginActions, loginReducer } from "feautures/authByUsername/model/slice/loginSlice";
import { getLoginState } from "feautures/authByUsername/model/selectors/getLoginState/getLoginState";
import { Button } from "shared/ui/Button/ui/Button";
import { loginByUsername } from "feautures/authByUsername/model/services/loginByUsername/loginByUsername";
import { ReduxStoreWithManager, stateSchema } from "app/providers/StoreProvider";

interface LoginFormProps {
    className?: string;
}
const LoginForm = memo(({ className }: LoginFormProps) => {

    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager
    const {username, password, error, isLoading} = useSelector(getLoginState)

    useEffect(() => {
        store.reducerManager.add('loginForm',loginReducer)

        return () => {
            store.reducerManager.remove('loginForm')
        }

    },[])

    const onChangeUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setUsername(event.target.value))
    }, [dispatch])
    const onChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setPassword(event.target.value))
    }, [dispatch])

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username: username, password: password }))
    }, [dispatch,username, password])

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <div>AUTH </div>
            {error && <span style={
                {
                    color: 'red',
                    fontSize: '12px'
                }
            }>{error}</span>}
            <div>
                <span>username</span>
                <input type="text" onChange={onChangeUsername} value={username} />
            </div>
            <div>
                <span>password</span>
                <input type="password" onChange={onChangePassword} value={password} />
            </div>
            <Button onClick={onLoginClick} disabled={isLoading}>
                LOGIN
            </Button>
        </div>
    )
})

export default LoginForm