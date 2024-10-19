import React from "react";

import { Link } from "react-router-dom";

import { FormattedMessage } from "react-intl";

import { Button } from "@mui/material";

import homeStyle from './home.module.css';


const Home = () => {
    return (
        <div className={ homeStyle.container }>
            <h2><FormattedMessage id='stocks.app.Home.title' /></h2>
            <h3><FormattedMessage id='stocks.app.Home.subtitle' /></h3>
            <Link to='/register'>
                <Button className={ homeStyle.register } variant="contained">
                    <FormattedMessage id='stocks.app.Home.button.register' />
                </Button>
            </Link>
        </div>
    )
};

export default Home;
