import './styles/index.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Navbar } from 'widgets/Navbar'
import { AppRouter } from './providers/router'
import { useTheme } from './providers/ThemeProvider'

import { Sidebar } from 'widgets/sidebar'
import { useState } from 'react'
import { Modal } from 'shared/ui/Modal/Modal'

const App = () => {

    const { theme, toggleTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={classNames('app', { 'adasd': false }, [theme])}>
            <Navbar />
            <button onClick={()=>setIsOpen(true)} >open</button>
            <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
            <div className='content-page'>
                <Sidebar />
                <AppRouter />
            </div>
        </div>
    )
}

export default App