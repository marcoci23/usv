import './styles/index.scss'
import { Route, Routes } from "react-router-dom"
import { Link } from "react-router-dom"
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async"
import { Suspense } from "react"
import { useTheme } from './theme/useTheme'
import { classNames } from './helpers/classNames/classNames'

const App = () => {

    const { theme, toggleTheme } = useTheme()

    return (
        <div className={classNames('app', {'adasd': false}, [theme])}>
            NNNNNNN
            <button onClick={toggleTheme}>theme</button>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={'/'} />
                    <Route path={'/about'} element={<AboutPageAsync />} />
                </Routes>
            </Suspense>
            <Link to={'/about'}>About</Link>
            <Link to={'/'}>Main</Link>
        </div>
    )
}

export default App