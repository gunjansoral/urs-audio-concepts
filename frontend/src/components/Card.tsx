import { Card as MuiCard } from '@mui/material';
import type { CardProps as MuiCardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(MuiCard)(({ theme }) => ({
  background: 'rgba(19, 23, 34, 0.7)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.3)',
    transform: 'translateY(-2px)',
  },
}));

export interface CardProps extends MuiCardProps {}

export const Card = ({ children, ...props }: CardProps) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};

export default Card; 