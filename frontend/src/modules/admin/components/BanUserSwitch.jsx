import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { config } from "config/constants";

import { CustomSwitch } from "modules/common";

import admin from 'modules/admin';
import app from 'modules/app';

const BanUserSwitch = ({ userId, banned }) => {

    const dispatch = useDispatch();
    const [ userBanned, setUserBanned ] = useState(banned);

    const handleBanChange = () => {
        dispatch(admin.actions.manageUserBan(
            userId,
            !userBanned,
            message => {
                dispatch(app.actions.showInfo({ 
                    severity: config.SEVERITY_SUCCESS, 
                    message: message
                }));
                setUserBanned(!userBanned);
            },
            errors => dispatch(app.actions.showInfo({ severity: config.SEVERITY_ERROR, message: errors.message }))
        ));
    };

    return (
        <CustomSwitch
            onChange={ () => handleBanChange(banned) } 
            checked={ userBanned }
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
};

export default BanUserSwitch;
