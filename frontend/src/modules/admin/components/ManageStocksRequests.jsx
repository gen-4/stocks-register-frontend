import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useIntl } from "react-intl";

import { config } from "config/constants";

import { Table } from "modules/common";

import user from 'modules/user';
import admin from 'modules/admin';
import app from 'modules/app';

const ManageStocksRequests = () => {

    const dispatch = useDispatch();
    const intl = useIntl();

    const isAdmin = useSelector(user.selectors.isAdmin);
    const requests = useSelector(admin.selectors.getRequests);

    useEffect(() => {
        dispatch(app.actions.loading());
        dispatch(admin.actions.loadRequests(
            () => dispatch(app.actions.loaded()),
            errors => {
                dispatch(app.actions.showInfo({ severity: config.SEVERITY_ERROR, message: errors.message }));
                dispatch(app.actions.loaded());
            }
        ));
    }, [ dispatch ]);

    if (!isAdmin) {
        return null;
    }

    const headers = [
        {
            title: intl.formatMessage({ id: 'stocks.admin.ManageStocksRequests.table.header.name' }),
            display: "left"
        },
        {
            title: intl.formatMessage({ id: 'stocks.admin.ManageStocksRequests.table.header.registerDate' }),
            display: "left"
        },
        {
            title: intl.formatMessage({ id: 'stocks.admin.ManageStocksRequests.table.header.aprovalDate' }),
            display: "left"
        },
        {
            title: intl.formatMessage({ id: 'stocks.admin.ManageStocksRequests.table.header.status' }),
            display: "center"
        }
    ];
    
    return (
        <div>

            { requests &&
                <Table data={ requests } type={ config.TABLE_TYPE_REQUEST } headers={ headers } />
            }

        </div>
    );
};

export default ManageStocksRequests;
