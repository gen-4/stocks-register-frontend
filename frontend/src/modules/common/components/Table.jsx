import React from "react";

import { 
    TableContainer, 
    Table, 
    TableHead, 
    TableRow, 
    TableBody, 
    Paper
} from "@mui/material";

import { UserTableRow } from "modules/admin";
import { StyledTableCell } from "modules/common";

const CustomTable = ({ data, type, headers }) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="users table">
                <TableHead>
                    <TableRow>
                        { headers.map(header => (
                            <StyledTableCell align="center">
                                { header }
                            </StyledTableCell>
                        )) }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data.map(row => {
                        switch (type) {
                            case 'user':
                                return (<UserTableRow { ...row } />);

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
