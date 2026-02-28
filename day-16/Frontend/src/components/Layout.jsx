import React from 'react'
import Sidebar from '../components/Sidebar'
import './Layout.scss'

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Sidebar />
            <div className="main-area">
                {children}
            </div>
        </div>
    )
}

export default Layout