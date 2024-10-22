import React from "react";

import { FormattedDate, FormattedTime } from "react-intl";

import { 
    CheckCircleOutlineOutlined,
    RemoveCircleOutlineOutlined, 
} from '@mui/icons-material';

import { StyledTableCell, StyledTableRow } from "modules/common";
import { BanUserSwitch, RoleGrid } from 'modules/admin';

const UserTableRow = ({ id: userId, email, username, registerDate, lastLogin, banned, enabled, roles }) => {

    return (
        <StyledTableRow key={ userId }>
            <StyledTableCell>
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
                <BanUserSwitch userId={ userId } banned={ banned } />
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
                <RoleGrid userId={ userId } roles={ roles } />
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default UserTableRow;
