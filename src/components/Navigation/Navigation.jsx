import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import logo from '../../assets/images/uit_bikes_logo.svg';
import NavItem from './NavItem';
import './navigation.css'
import { IconButton, Paper, InputBase, Badge } from '@mui/material';
import { Search, Menu, Clear } from '@mui/icons-material';
import { getItemQuantity } from '../functions/functions';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Navigation = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [toggle, setToggle] = useState(1);

    const location = useLocation();
    const navigate = useNavigate();

    const { isAuthed } = useSelector((state) => state.auth);
    const user = isAuthed ? JSON.parse(localStorage.getItem("user")) : [];

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

    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = queryString.stringify({ s: searchTerm });
        navigate(`search?${query}`);
    };

    const [cartItemQty, setCartItemQty] = useState(0);
    useEffect(() => {
        if (isAuthed) {
            axios.get(`http://localhost:9090/api/carts/customer/${user.customer.id}`)
                .then((res) => {
                    setCartItemQty(getItemQuantity(res.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [cartItemQty]);

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
            <Paper component="form" className='nav-search' onSubmit={handleSubmit}
                sx={{ p: '2px 3px', display: 'flex', alignItems: 'center', width: '100%' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Nhập từ khóa tìm kiếm..."
                    inputProps={{ 'aria-label': 'keyword' }}
                    type="text" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton type="submit" sx={{ p: '10px', color: '#2b2b37', marginLeft: 'auto' }} aria-label="search" >
                    <Search />
                </IconButton>
            </Paper>
            <div className={isAuthed ? "nav-menu-signup": "nav-menu"}>
                {isAuthed ? 
                    (
                        NavItem.map((nav, index) => ( (index === 0 || index >= 2) &&
                            <Link to={nav.link} key={`nav-${index}`} 
                                className={`nav-menu-item ${activeIndex === index && 'active'}`}
                                onClick={closeMenu}
                            >
                                {
                                    nav.section === 'cart' ? 
                                    (
                                        <Badge badgeContent={cartItemQty} color='error'>
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
                                    { nav.section === 'user' ? nav.text : '' }
                                </div>
                            </Link>
                        ))
                    ) : (  
                        NavItem.map((nav, index) => ( index < 2 &&
                            <Link to={nav.link} key={`nav-${index}`} 
                                className={`nav-menu-item ${activeIndex === index && 'active'}`} 
                                onClick={closeMenu}
                            >
                                <div className="nav-menu-item-txt">
                                    {nav.text}
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Navigation
