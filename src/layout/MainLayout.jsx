import React, { useState } from 'react'
import Navigation from '../components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import './main-layout.css'
import ScrollToTop from '../components/scroll-to-top/ScrollToTop'
import { PropTypes } from 'prop-types'
import InboxPopup from '../components/Inbox/InboxPopup'
import Inbox from '../components/Inbox/Inbox'
import { useSelector } from 'react-redux'

ScrollToTop.propTypes = {
    window: PropTypes.func,
};

const MainLayout = (props) => {
    const { isAuthed } = useSelector((state) => state.auth);
    const user = isAuthed ? JSON.parse(localStorage.getItem('user')): []

    const [openChat, setOpenChat] = useState(false);

    return (
        <div className='main'>
            <div className='main-content'>
                <Navigation />
                <div id="back-to-top-anchor" />
                <div id='outlet' className="outlet">
                    <Outlet />
                    {isAuthed && user !== null && (
                        <><InboxPopup openChat={setOpenChat} />
                        { openChat && <Inbox /> }</>
                    )}
                    <ScrollToTop {...props} />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout
