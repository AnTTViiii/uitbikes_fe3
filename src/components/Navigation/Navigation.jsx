import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/uit_bikes_logo.svg';
import NavItem from './NavItem';
import './navigation.css'
import { IconButton, Paper, InputBase, Badge } from '@mui/material';
import { Search, Tune, Menu, Clear } from '@mui/icons-material';
import { getItemQuantity } from '../functions/functions';
import Cart from '../Data/Cart';

const Navigation = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [toggle, setToggle] = useState(1);
    const location = useLocation();
    const isLogin = 1;
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = NavItem.findIndex(item => item.section === curPath);

        setActiveIndex(curPath.length === 0 ? -1 : activeItem);
    }, [location]);

    const openMenu = () => {
        setToggle(!toggle);
        document.querySelector('#nav').classList.add('nav-open');
        document.querySelector('#outlet').classList.add('outlet-nav-open');
        document.querySelector('#footer').classList.add('footer-nav-open');
    }

    const closeMenu = () => {
        setToggle(!toggle);
        document.querySelector('#nav').classList.remove('nav-open');
        document.querySelector('#outlet').classList.remove('outlet-nav-open');
        document.querySelector('#footer').classList.remove('footer-nav-open');
    }
    return (
        <div id='nav' className='nav'>
            <div className='nav-logo'>
                <Link to={'/'}>
                    <img src={logo} alt='UIT Bikes logo' className='logo' />
                </Link>
                <div className="nav-toggle" >
                    {toggle ? <Menu onClick={openMenu} /> : <Clear onClick={closeMenu}/>}
                </div>
            </div>
            <Paper component="form" className='nav-search'
                sx={{ p: '2px 3px', display: 'flex', alignItems: 'center', width: '100%' }}
            >
                <IconButton sx={{ p: '10px', color: '#2b2b37' }} aria-label="filter">
                    <Tune />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Nhập từ khóa tìm kiếm..."
                    inputProps={{ 'aria-label': 'keyword' }} 
                />
                <IconButton type="button" sx={{ p: '10px', color: '#2b2b37', marginLeft: 'auto' }} aria-label="search">
                    <Search />
                </IconButton>
            </Paper>
            <div className={isLogin ? "nav-menu-signup": "nav-menu"}>
                {isLogin === 0 ? 
                    (  
                        NavItem.map((nav, index) => ( index < 2 &&
                            <Link to={nav.link} key={`nav-${index}`} 
                                className={`nav-menu-item ${activeIndex === index && 'active'}`} 
                                onClick={''}
                            >
                                <div className="nav-menu-item-txt">
                                    {nav.text}
                                </div>
                            </Link>
                        ))
                    ) :
                    (
                        NavItem.map((nav, index) => ( (index === 0 || index >= 2) &&
                            <Link to={nav.link} key={`nav-${index}`} 
                                className={`nav-menu-item ${activeIndex === index && 'active'}`}
                                onClick={closeMenu}
                            >
                                {
                                    nav.section === 'cart' ? 
                                    (
                                        <Badge badgeContent={getItemQuantity(Cart)} color='error'>
                                            <div className="nav-menu-item-icon">
                                                {nav.icon}
                                            </div>
                                        </Badge>
                                    ) : 
                                    (
                                        <div className="nav-menu-item-icon">
                                            {nav.icon}
                                        </div>
                                    )
                                }
                                <div className="nav-menu-item-txt">
                                    {index === 4 ? nav.text : ''}
                                </div>
                            </Link>
                        ))
                    )
                }
                {/* <div className="nav-menu-item">
                    <div className="nav-menu-item-icon">
                        <Logout />
                    </div>
                    <div className="nav-menu-item-txt">
                        Đăng xuất
                    </div>
                </div> */}
            </div>
            
        </div>
    )
}

export default Navigation
