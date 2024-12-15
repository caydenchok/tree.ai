import { HStack, IconButton, Tooltip } from '@chakra-ui/react';
import { BsStopCircle, BsArrowRepeat } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';
import React from 'react';

interface ChatControlsProps {
  onStop?: () => void;
  onRegenerate?: () => void;
  onClear?: () => void;
  isGenerating?: boolean;
  hasMessages?: boolean;
}

export const ChatControls: React.FC<ChatControlsProps> = ({
  onStop,
  onRegenerate,
  onClear,
  isGenerating = false,
  hasMessages = false,
}) => {
  return (
    <HStack 
      spacing={2} 
      position="fixed" 
      bottom={20} 
      left="50%" 
      transform="translateX(-50%)"
      zIndex={2}
    >
      {isGenerating && onStop && (
        <Tooltip label="Stop generating">
          <IconButton
            aria-label="Stop generating"
            icon={<BsStopCircle />}
            onClick={onStop}
            colorScheme="red"
            variant="solid"
            size="sm"
            bg="red.500"
            _hover={{ bg: 'red.600' }}
          />
        </Tooltip>
      )}
      
      {!isGenerating && hasMessages && onRegenerate && (
        <Tooltip label="Regenerate response">
          <IconButton
            aria-label="Regenerate response"
            icon={<BsArrowRepeat />}
            onClick={onRegenerate}
            bg="rgba(205, 246, 131, 0.1)"
            _hover={{ bg: 'rgba(205, 246, 131, 0.2)' }}
            color="#CDF683"
            size="sm"
          />
        </Tooltip>
      )}

      {hasMessages && onClear && (
        <Tooltip label="Clear chat">
          <IconButton
            aria-label="Clear chat"
            icon={<MdClear />}
            onClick={onClear}
            bg="rgba(205, 246, 131, 0.1)"
            _hover={{ bg: 'rgba(205, 246, 131, 0.2)' }}
            color="#CDF683"
            size="sm"
          />
        </Tooltip>
      )}
    </HStack>
  );
};
