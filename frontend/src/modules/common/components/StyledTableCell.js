import { styled } from '@mui/material/styles';
import { TableCell, tableCellClasses } from "@mui/material";

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'var(--secondary)',
        color: 'var(--text-white)',
    },
    [`&.${tableCellClasses.body}`]: {
        color: 'var(--text-black)',
        fontSize: 14,
    },
}));

export default StyledTableCell;
