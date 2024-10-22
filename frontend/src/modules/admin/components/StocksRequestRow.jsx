import React from "react";

import { FormattedDate, FormattedTime } from "react-intl";

import { 
    CheckCircleOutlineOutlined,
    RemoveCircleOutlineOutlined, 
} from '@mui/icons-material';

import { StyledTableCell, StyledTableRow } from "modules/common";

const StocksRequestRow = ({ id: requestId, name, registerDate, aprovalDate, status }) => {

    return (
        <StyledTableRow key={ requestId }>
            <StyledTableCell align="left">{ name }</StyledTableCell>
            <StyledTableCell align="left">
                <FormattedDate value={ registerDate } />
                -
                <FormattedTime value={ registerDate } />
            </StyledTableCell>
            <StyledTableCell align="left">
                <FormattedDate value={ aprovalDate } />
                -
                <FormattedTime value={ aprovalDate } />
            </StyledTableCell>
            <StyledTableCell align="center">
                { status }
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default StocksRequestRow;
