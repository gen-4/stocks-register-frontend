import React, { useState, useMemo } from "react";

import { useSelector } from "react-redux";

import { useIntl, FormattedMessage } from "react-intl";

import { useDispatch } from "react-redux";

import { config } from "config/constants";

import { 
    Chip, 
    Grid2 as Grid, 
    Dialog,
    DialogTitle,
    Tooltip,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from "@mui/material";
import { AddCircleOutlineOutlined } from '@mui/icons-material';

import admin from 'modules/admin';
import app from 'modules/app';

const RoleGrid = ({ userId, roles }) => {

    const dispatch = useDispatch();
    const intl = useIntl();
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ userRoles, setUserRoles ] = useState(roles);
    const allRoles = useSelector(admin.selectors.getRoles);

    const notOwnedRoles = useMemo(() => {
        if (allRoles) {
            return allRoles.filter(role => !userRoles.some(userRole => userRole.role === role.role));
        } 

        return allRoles;
    }, [ allRoles, userRoles ]);

    const removeRole = roleId => {
        userRoles.map(role => {
            if (role.id === roleId) {
                setUserRoles(userRoles.filter(role => role.id !== roleId));
            }
        });
    };

    const handleRoleDelete = roleId => {
        dispatch(admin.actions.removeRoleFromUser(
            userId,
            roleId,
            message => {
                removeRole(roleId);
                dispatch(app.actions.showInfo({ 
                    severity: config.SEVERITY_SUCCESS, 
                    message: message
                }))
            },
            errors => dispatch(app.actions.showInfo({ severity: config.SEVERITY_ERROR, message: errors.message }))
        ));
    };

    const addRole = roleId => {
        allRoles.map(role => {
            if (role.id === roleId) {
                setUserRoles([...userRoles, role]);
            }
        });
    };

    const handleAddRole = roleId => {
        dispatch(admin.actions.addRoleToUser(
            userId,
            roleId,
            message => {
                addRole(roleId);
                dispatch(app.actions.showInfo({ 
                    severity: config.SEVERITY_SUCCESS, 
                    message: message
                }))
            },
            errors => dispatch(app.actions.showInfo({ severity: config.SEVERITY_ERROR, message: errors.message }))
        ));
    }

    return (
        <Grid container sx={{ alignItems: 'center' }} spacing={ 1 }>
            { 
                userRoles.map(role => (
                    <Chip 
                        sx={{
                            ...(role.role === 'ADMIN' && { 
                                fontSize: '.5rem', 
                                color: 'var(--text-white)',
                                backgroundColor: 'var(--terciary)' 
                            }),
                            ...(role.role === 'USER' && { 
                                fontSize: '.5rem', 
                                color: 'var(--text-white)',
                                backgroundColor: 'var(--primary)' 
                            }),
                            '& .MuiChip-deleteIcon': {
                                color: 'var(--white)',
                            },
                            '& .MuiChip-deleteIcon:hover': {
                                color: 'var(--warning)',
                            },
                        }}
                        size="small"
                        onDelete={ () => handleRoleDelete(role.id) } 
                        label={ role.role } 
                    />
                )) 
            }
            <Tooltip title={ intl.formatMessage({ id: 'stocks.admin.UserTableRow.tooltip.addRole' }) }>
                <AddCircleOutlineOutlined 
                    onClick={ () => setOpenDialog(true) }
                    sx={{ 
                        fontSize: '1.6rem',
                        color: 'var(--white)',
                        backgroundColor: 'var(--secondary)',
                        borderRadius: '10000px',
                        '&:hover': {
                            cursor: 'pointer'
                        }
                    }} 
                />
            </Tooltip>

            <Dialog onClose={ () => setOpenDialog(false) } open={ openDialog } >
                <DialogTitle><FormattedMessage id='stocks.admin.UserTableRow.dialog.title' /></DialogTitle>
                { notOwnedRoles && 
                    <List sx={{ pt: 0 }}>
                        { notOwnedRoles.map( role =>
                            <ListItem disableGutters key={ role.id }>
                                <ListItemButton onClick={() => handleAddRole(role.id)}>
                                    <ListItemText primary={ role.role } />
                                </ListItemButton>
                            </ListItem>
                        ) }  
                    </List>
                }
            </Dialog>
        </Grid>
    );
};

export default RoleGrid;
