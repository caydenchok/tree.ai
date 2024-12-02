import React from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { TipItem } from './types';

const Tip: React.FC<TipItem> = ({ icon, text }) => {
  return (
    <Flex 
      align="center" 
      gap={2} 
      p={3} 
      bg="whiteAlpha.100" 
      borderRadius="lg" 
      _hover={{ 
        bg: "whiteAlpha.200",
        transform: "translateY(-2px)",
        boxShadow: "lg"
      }}
      transition="all 0.2s"
      cursor="pointer"
      border="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Icon as={icon} color="#cdf683" boxSize={5} />
      <Text fontSize="sm" color="whiteAlpha.900" fontWeight="medium">
        {text}
      </Text>
    </Flex>
  );
};

export default Tip;
