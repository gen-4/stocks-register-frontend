import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { config } from "config/constants";

import { Snackbar, Alert, Button } from "@mui/material";

import app from 'modules/app';

const InfoBar = () => {

    const dispatch = useDispatch();
    const info = useSelector(app.selectors.getInfoMessage);

    if (!info) {
        return null;
    }

    const color = () => {
        switch (info.severity) {
            case config.SEVERITY_INFO:
                return "var(--info)";

            case config.SEVERITY_ERROR:
                return "var(--error)";

            case config.SEVERITY_SUCCESS:
                return "var(--success)";

            case config.SEVERITY_WARNING:
                return "var(--warning";

            default:
                return "var(--info)"
        };
    };
    
    return (
        <Snackbar open={ info } autoHideDuration={ 4000 } onClose={ () => dispatch(app.actions.hidInfo()) }>
            <Alert
                onClose={ () => dispatch(app.actions.hidInfo()) }
                severity={ info.severity }
                variant="filled"
                sx={{
                    backgroundColor: color(),
                    color: 'var(--text-white)'
                }}
                action={ info.action &&
                    ( <Button size="small" style={{ color: 'var(--text-white)' }} onClick={ info.action }>{ info.actionMsg }</Button> )
                }
            >
                { info.message }
            </Alert>
        </Snackbar>
    );
}

export default InfoBar;
