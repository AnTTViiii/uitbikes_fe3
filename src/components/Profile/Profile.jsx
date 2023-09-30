import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProfileItem } from './ProfileItem'
import './profile.css'

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
    return (
        <div className='profile'>
            <div className="profile-sidebar">
                {ProfileItem.map((item, index) => (
                    <Link to={item.url}>
                        <div className={`profile-sidebar-page ${page === index ? 'active' : ''} page-name`}>{item.name}</div>
                        <div className={`profile-sidebar-page ${page === index ? 'active' : ''} page-icon`}>{item.icon}</div>
                    </Link>
                ))}
            </div>
            <div className="profile-outlet">
                <DisplayPage />
            </div>
        </div>
    )
}

export default Profile
