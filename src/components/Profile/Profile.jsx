import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ProfileItem } from './ProfileItem'
import './profile.css'
import { LogoutRounded } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../stores/auth'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { Transition } from '../functions/functions'

const Profile = () => {
    const location = useLocation();
    const [page, setPage] = useState(0);
    useEffect(() => {
        const path = window.location.pathname.split('/');
        if (path[1] === 'user') {
            const activePage = ProfileItem.findIndex(item => item.section === path[2]);
            setPage(path[2] === undefined ? 0 : activePage);
        }
    }, [location]);
    const DisplayPage = ProfileItem[page].page;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { account } = useSelector((state) => state.auth);

    const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
    const handleCloseLogoutPopup = () => setOpenLogoutPopup(false);
    const handleOpenLogoutPopup = () => setOpenLogoutPopup(true);

    //logout
    const handleLogout = () => {
        dispatch(authActions.logout(account));
        navigate('/');
        handleCloseLogoutPopup();
    };

    return (
        <div className='profile'>
            <div className="profile-sidebar">
                {ProfileItem.map((item, index) => (
                    <Link to={item.url}>
                        <div className={`profile-sidebar-page ${page === index ? 'active' : ''} page-name`}>{item.name}</div>
                        <div className={`profile-sidebar-page ${page === index ? 'active' : ''} page-icon`}>{item.icon}</div>
                    </Link>
                ))}
                <div onClick={handleOpenLogoutPopup}>
                    <div className={`profile-sidebar-page page-name`}>Đăng xuất</div>
                    <div className={`profile-sidebar-page page-icon`}>
                        <LogoutRounded />  
                    </div>
                </div>

                <Dialog open={openLogoutPopup} TransitionComponent={Transition}
                    keepMounted onClose={handleCloseLogoutPopup}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Bạn có chắc chắn muốn đăng xuất?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseLogoutPopup}>Không</Button>
                        <Button onClick={handleLogout}>Có</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className="profile-outlet">
                <DisplayPage />
            </div>
        </div>
    )
}

export default Profile
