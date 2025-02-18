import './styles/index.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Navbar } from 'widgets/Navbar'
import { AppRouter } from './providers/router'
import { useTheme } from './providers/ThemeProvider'

import { Sidebar } from 'widgets/sidebar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInited, userActions } from 'entities/User'

//import vid from 'shared/assets/icons/porsche'

const App = () => {

    const { theme, toggleTheme } = useTheme()
    const dispatch = useDispatch()
    const inited = useSelector(getUserInited)

    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])

    return (
        <div className={classNames('app', { 'adasd': false }, [theme])}>
            {/* <video muted loop id="myVideo">
                <source src="" type="video/mp4"/>
            </video> */}
            <Navbar />
            <div className='content-page'>
                <Sidebar />
                {inited && <AppRouter />}
            </div>
        </div>
    )
}

export default App