import React from 'react'
import Navigation from '../components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import './main-layout.css'

const MainLayout = () => {
    return (
        <div className='main'>
            <div className='main-content'>
                <Navigation />
                <div id='outlet' className="outlet">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout
