import { styled } from '@mui/material/styles';
import { TableRow } from "@mui/material";
  
const StyledTableRow = styled(TableRow)(() => ({
    '&': {
        height: '5rem',
    },
    '&:hover': {
        backgroundColor: 'var(--accent-50) !important',
    },
    '&:nth-of-type(odd)': {
        backgroundColor: 'var(--secondary-50)',
    },
    '&:nth-of-type(even)': {
        backgroundColor: 'var(--primary-50)',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default StyledTableRow;
