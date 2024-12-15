import { Box, IconButton, Icon } from '@chakra-ui/react';
import { BsArrowLeft } from 'react-icons/bs';
import React from 'react';

interface ChatHeaderProps {
  onBackClick: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onBackClick,
}) => {
  return (
    <Box
      position="fixed"
      top={4}
      left="304px"
      zIndex={50}
      pointerEvents="auto"
    >
      <IconButton
        aria-label="Back to topics"
        icon={<Icon as={BsArrowLeft} boxSize={5} />}
        onClick={onBackClick}
        bg="rgba(205, 246, 131, 0.1)"
        _hover={{ 
          bg: 'rgba(205, 246, 131, 0.2)',
          transform: 'translateY(-1px)'
        }}
        color="#CDF683"
        size="lg"
        borderWidth="1px"
        borderColor="rgba(205, 246, 131, 0.3)"
        borderRadius="xl"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        transition="all 0.2s"
      />
    </Box>
  );
};
