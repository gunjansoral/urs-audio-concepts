import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(19, 23, 34, 0.7)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: theme.palette.text.primary,
    '&:hover': {
      border: '1px solid rgba(45, 127, 249, 0.3)',
    },
    '&.Mui-focused': {
      border: '1px solid rgba(45, 127, 249, 0.5)',
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.primary,
  },
}));

export const Input = (props: TextFieldProps) => {
  return <StyledTextField {...props} />;
};

export default Input; 