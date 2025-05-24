import { Typography as MuiTypography } from '@mui/material';
import type { TypographyProps as MuiTypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(MuiTypography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: "'Inter', sans-serif",
}));

export interface TypographyProps extends MuiTypographyProps {}

export const Typography = ({ children, ...props }: TypographyProps) => {
  return <StyledTypography {...props}>{children}</StyledTypography>;
};

export default Typography; 