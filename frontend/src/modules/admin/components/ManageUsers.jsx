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
            errors => dispatch(app.actions.showInfo({ severity: config.SEVERITY_ERROR, message: errors.message }))
        ));
        dispatch(admin.actions.loadRoles(
            errors => dispatch(app.actions.showInfo({ severity: config.SEVERITY_ERROR, message: errors.message }))
        ));
    }, [ dispatch ]);
    
    if (!isAdmin) {
        return null;
    }

    const headers = [
        intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.email' }),
        intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.username' }),
        intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.registerDate' }),
        intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.lastLogin' }),
        intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.banned' }),
        intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.enabled' }),
        intl.formatMessage({ id: 'stocks.admin.ManageUsers.table.header.roles' })
    ];

    return (
        <div>

            { users &&
                <Table data={ users } type='user' headers={ headers } />
            }

        </div>
    );
};

export default ManageUsers;
