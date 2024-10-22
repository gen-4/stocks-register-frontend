import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { useIntl } from "react-intl";

import { Tooltip } from "@mui/material";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import stocksStyle from './stocks.module.css';

import { config } from "config/constants";

import { Table } from "modules/common";

import app from 'modules/app';
import user from 'modules/user';
import stocksModule from 'modules/stocks';


const Stocks = () => {

    const dispatch = useDispatch();
    const intl = useIntl();

    const isUser = useSelector(user.selectors.isUser);
    const stocks = useSelector(stocksModule.selectors.getStocks);

    useEffect(() => {
        dispatch(app.actions.loading());
        dispatch(stocksModule.actions.loadStocks(
            () => dispatch(app.actions.loaded()),
            errors => {
                dispatch(app.actions.showInfo({ severity: config.SEVERITY_ERROR, message: errors.message }));
                dispatch(app.actions.loaded());
            }
        ));
    }, [ dispatch ]);

    if (!isUser) {
        return null;
    }

    const headers = [
        { 
            title: intl.formatMessage({ id: 'stocks.admin.stocks.table.header.name' }),
            display: 'left'
        }
    ];

    return (
        <div>

            <div className={ stocksStyle.buttonRow }>
                <div className={ stocksStyle.buttonContainer }>
                    <Tooltip placement="top" title={ intl.formatMessage({ id: 'stocks.admin.stocks.tooltip.requestStock'}) }>
                        <Link to="/stocks/request">
                            <AddBoxOutlinedIcon />
                        </Link>
                    </Tooltip>
                </div>
            </div>

            { stocks &&
                <Table data={ stocks } type={ config.TABLE_TYPE_STOCKS } headers={ headers } />
            }

        </div>
    )
};

export default Stocks;
