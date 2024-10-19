import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { FormattedMessage } from "react-intl";

import { Button } from '@mui/material';

import headerStyle from './header.module.css';

import user from 'modules/user';

const Header = () => {

    const dispatch = useDispatch();
    const navigator = useNavigate();
    const location = useLocation();

    const loggedIn = useSelector(user.selectors.isLoggedIn);

    const isActive = (path) => location.pathname === path ? headerStyle.active : '';

    const navigateToLogin = () => navigator('/login');
    const navigateToLogout = () => navigator('/logout');

    return (
        <nav className="navbar fixed-top">
            <div className='container-fluid'>
                <h1 className={  headerStyle.logo + ' title-font' }><FormattedMessage id='stocks.app.Header.title' /></h1>
                <ul className={ headerStyle.navbar + ' navbar-nav' }>
                    <li className={ headerStyle.item + ' nav-item ' + isActive('/') }>
                        <Link to='/' className={ headerStyle.link + ' body-font' }><FormattedMessage id='stocks.app.Header.home' /></Link>
                    </li>
                    <li className={ headerStyle.item + ' nav-item ' + isActive('/home') }>
                        <Link className={ headerStyle.link + ' body-font' }><FormattedMessage id='stocks.app.Header.home' /></Link>
                    </li>
                </ul>
                { loggedIn && 
                    <Button onClick={ navigateToLogout }  variant="contained" type="submit" >
                        <FormattedMessage id='stocks.app.Header.logout' />
                    </Button>
                }
                { !loggedIn && 
                    <Button 
                        className={ headerStyle.login } 
                        onClick={ navigateToLogin }  
                        variant="contained" type="submit" 
                    >
                        <FormattedMessage id='stocks.app.Header.login' />
                    </Button>
                }
            </div>
        </nav>
    );
};
  
export default Header;
