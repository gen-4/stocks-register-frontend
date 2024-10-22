import React from "react";

import { StyledTableCell, StyledTableRow, CustomSwitch } from "modules/common";

const StocksTableRow = ({ id: stockId, name }) => {
    return (
        <StyledTableRow key={ stockId }>
            <StyledTableCell align="left">
                { name }
            </StyledTableCell>  
        </StyledTableRow>
    );
};

export default StocksTableRow;