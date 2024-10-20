import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { FormattedMessage } from "react-intl";

import { Avatar, Button, Divider } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

import headerStyle from './header.module.css';

import user from 'modules/user';

const Header = () => {

    const navigator = useNavigate();
    const location = useLocation();

    const loggedIn = useSelector(user.selectors.isLoggedIn);
    const username = useSelector(user.selectors.getUsername);
    const userEmail = useSelector(user.selectors.getUserEmail);
    const isAdmin = useSelector(user.selectors.isAdmin);

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
                    { isAdmin &&
                        <li className={ headerStyle.item + ' nav-item ' + isActive('/admin/users') }>
                            <Link to='/admin/users' className={ headerStyle.link + ' body-font' }>
                                <FormattedMessage id='stocks.app.Header.manageUsers' />
                            </Link>
                        </li>
                    }
                </ul>
                { loggedIn && 
                    <div className='dropdown'>
                        <Avatar data-bs-toggle='dropdown' aria-expanded='false'>
                            <AccountCircle sx={{ fontSize: '2.4rem', bgcolor: 'var(--primary-50)' }} />
                        </Avatar>
                        <ul className={ headerStyle.menu + ' dropdown-menu dropdown-menu-end' }>
                            <li>
                                <div className={ headerStyle.dropdownItem }>
                                    { username }
                                </div>
                            </li>
                            <li>
                                <div className={ headerStyle.dropdownItem }>
                                    { userEmail }
                                </div>
                            </li>

                            <Divider sx={{ borderWidth: '1px', borderColor: 'var(--primary-50)' }} />
                            
                            <li>
                                <div className={ headerStyle.logoutDropdown + ' ' + headerStyle.dropdownItem }>
                                    <Button 
                                        className={ headerStyle.login }  
                                        onClick={ navigateToLogout }  
                                        variant="contained" type="submit" 
                                    >
                                        <FormattedMessage id='stocks.app.Header.logout' />
                                    </Button>
                                </div>
                            </li>
                        </ul>
                    </div>
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
