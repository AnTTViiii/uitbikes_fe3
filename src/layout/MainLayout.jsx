import React from 'react'
import Navigation from '../components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import './main-layout.css'
import ScrollToTop from '../components/scroll-to-top/ScrollToTop'
import { PropTypes } from 'prop-types'

ScrollToTop.propTypes = {
    window: PropTypes.func,
};

const MainLayout = (props) => {
    return (
        <div className='main'>
            <div className='main-content'>
                <Navigation />
                <div id="back-to-top-anchor" />
                <div id='outlet' className="outlet">
                    <Outlet />
                    <ScrollToTop {...props} />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout
