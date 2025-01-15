import './styles/index.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Navbar } from 'widgets/Navbar'
import { AppRouter } from './providers/router'
import { useTheme } from './providers/ThemeProvider'

import { Sidebar } from 'widgets/sidebar'

const App = () => {

    const { theme, toggleTheme } = useTheme()

    return (
        <div className={classNames('app', { 'adasd': false }, [theme])}>
            <Navbar />
            <div className='content-page'>
                <Sidebar />
                <AppRouter />
            </div>
        </div>
    )
}

export default App