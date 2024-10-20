import React, { useState, useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";

import { FormattedDate, FormattedMessage, FormattedTime, useIntl } from "react-intl";

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
import { 
    CheckCircleOutlineOutlined,
    RemoveCircleOutlineOutlined, 
    AddCircleOutlineOutlined 
} from '@mui/icons-material';

import { StyledTableCell, StyledTableRow, CustomSwitch } from "modules/common";

import { config } from "config/constants";

import admin from 'modules/admin';
import app from 'modules/app';

const UserTableRow = ({ id: userId, email, username, registerDate, lastLogin, banned, enabled, roles }) => {

    const dispatch = useDispatch();
    const intl = useIntl();
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ userRoles, setUserRoles ] = useState(roles);
    const [ userBanned, setUserBanned ] = useState(banned);
    const allRoles = useSelector(admin.selectors.getRoles);

    const notOwnedRoles = useMemo(() => {
        if (allRoles) {
            return allRoles.filter(role => !userRoles.some(userRole => userRole.role === role.role));
        } 

        return allRoles;
    }, [ allRoles, userRoles ]);

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
        <StyledTableRow key={ userId }>
            <StyledTableCell component="th" scope="row">
                { email }
            </StyledTableCell>
            <StyledTableCell align="left">{ username }</StyledTableCell>
            <StyledTableCell align="left">
                <FormattedDate value={ registerDate } />
                -
                <FormattedTime value={ registerDate } />
            </StyledTableCell>
            <StyledTableCell align="left">
                <FormattedDate value={ lastLogin } />
                -
                <FormattedTime value={ lastLogin } />
            </StyledTableCell>
            <StyledTableCell align="center">
                <CustomSwitch 
                    onChange={ () => handleBanChange(banned) } 
                    checked={ userBanned }
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </StyledTableCell>
            <StyledTableCell align="center">
                { 
                    ( enabled ? 
                        <CheckCircleOutlineOutlined sx={{ 
                            color: 'var(--success)',
                            backgroundColor: 'var(--secondary)',
                            borderRadius: '10000px'
                        }} /> : 
                        <RemoveCircleOutlineOutlined sx={{ 
                            color: 'var(--error)',
                            backgroundColor: 'var(--secondary)',
                            borderRadius: '10000px'
                        }} /> 
                    )
                }
            </StyledTableCell>
            <StyledTableCell align="center">
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
                </Grid>
            </StyledTableCell>

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
        </StyledTableRow>
    );
};

export default UserTableRow;
