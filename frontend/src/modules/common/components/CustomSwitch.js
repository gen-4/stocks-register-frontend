import { styled } from '@mui/material/styles';
import { Switch } from "@mui/material";

const CustomSwitch = styled(Switch)(() => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: 'var(--secondary)',
      '&:hover': {
        backgroundColor: 'var(--secondary-25)',
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: 'var(--secondary-50)',
    },
}));

export default CustomSwitch;
