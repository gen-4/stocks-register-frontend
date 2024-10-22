import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useIntl } from "react-intl";

import { config } from "config/constants";

import { Table } from "modules/common";

import user from 'modules/user';
import admin from 'modules/admin';
import app from 'modules/app';





const ManageUsers = () => {

    const dispatch = useDispatch();
    const intl = useIntl();

    const isAdmin = useSelector(user.selectors.isAdmin);
    const users = useSelector(admin.selectors.getUsers);

    useEffect(() => {
        dispatch(app.actions.loading());
        dispatch(admin.actions.loadUsers(
            () => dispatch(app.actions.loaded()),
            errors => {
                dispatch(app.actions.showInfo({ severity: config.SEVERITY_ERROR, message: errors.message }));
                dispatch(app.actions.loaded());
            }
        ));
        dispatch(admin.actions.loadRoles(
            errors => dispatch(app.actions.showInfo({ severity: config.SEVERITY_ERROR, message: errors.message }))
        ));
    }, [ dispatch ]);
    
    if (!isAdmin) {
        return null;
    }

    const headers = [
        {
            title: intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.email' }),
            display: "left"
        },
        {
            title: intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.username' }),
            display: "left"
        },
        {
            title: intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.registerDate' }),
            display: "left"
        },
        {
            title: intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.lastLogin' }),
            display: "left"
        },
        {
            title: intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.banned' }),
            display: "center"
        },
        {
            title: intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.enabled' }),
            display: "center"
        },
        {
            title: intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.roles' }),
            display: "left"
        }
    ];

    return (
        <div>

            { users &&
                <Table data={ users } type={ config.TABLE_TYPE_USER } headers={ headers } />
            }

        </div>
    );
};

export default ManageUsers;
