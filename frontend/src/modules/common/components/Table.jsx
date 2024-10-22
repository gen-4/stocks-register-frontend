import React from "react";

import { 
    TableContainer, 
    Table, 
    TableHead, 
    TableRow, 
    TableBody, 
    Paper
} from "@mui/material";

import { config } from "config/constants";

import { UserTableRow, StocksRequestRow } from "modules/admin";
import { StocksTableRow } from "modules/stocks";
import { StyledTableCell } from "modules/common";

const CustomTable = ({ data, type, headers }) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="users table">
                <TableHead>
                    <TableRow>
                        { headers.map(header => (
                            <StyledTableCell align={ header.display }>
                                { header.title }
                            </StyledTableCell>
                        )) }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data.map(row => {
                        switch (type) {
                            case config.TABLE_TYPE_USER:
                                return (<UserTableRow { ...row } />);

                            case config.TABLE_TYPE_STOCKS:
                                return (<StocksTableRow { ...row } />);

                            case config.TABLE_TYPE_REQUEST:
                                return (<StocksRequestRow { ...row } />);

                            default:
                                return null;
                        }
                    }) }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomTable;
