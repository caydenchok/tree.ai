import { Box, keyframes } from '@chakra-ui/react';
import React from 'react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface LoadingSpinnerProps {
  size?: string;
  color?: string;
  thickness?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = '40px',
  color = '#CDF683',
  thickness = '3px',
}) => {
  return (
    <Box
      as="div"
      border={`${thickness} solid rgba(255, 255, 255, 0.1)`}
      borderTopColor={color}
      borderRadius="50%"
      width={size}
      height={size}
      animation={`${spin} 0.8s linear infinite`}
    />
  );
};
