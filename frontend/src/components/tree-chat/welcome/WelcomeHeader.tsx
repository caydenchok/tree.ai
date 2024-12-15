import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface WelcomeHeaderProps {
  greeting: string;
  message: string;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  greeting,
  message,
}) => {
  return (
    <Flex 
      direction="column" 
      align="center" 
      textAlign="center"
      color="whiteAlpha.900"
    >
      <Text fontSize="xl" fontWeight="bold">
        {greeting}
      </Text>
      <Text color="whiteAlpha.800" fontSize="lg" textAlign="center">
        {message}
      </Text>
    </Flex>
  );
};
