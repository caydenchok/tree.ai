import { Box, HStack, IconButton, Icon } from '@chakra-ui/react';
import { BsArrowLeft, BsClock } from 'react-icons/bs';

interface ChatHeaderProps {
  showWelcome: boolean;
  handleBackToHome: () => void;
  onModalOpen: () => void;
}

export const ChatHeader = ({ showWelcome, handleBackToHome, onModalOpen }: ChatHeaderProps) => {
  return (
    <HStack
      position="fixed"
      top={0}
      left={0}
      right={0}
      p={4}
      zIndex={15}
      justify="space-between"
      align="center"
      pointerEvents="auto"
    >
      {/* Left side - Back button for chat interface */}
      <Box>
        {!showWelcome && (
          <IconButton
            aria-label="Back to topics"
            icon={<Icon as={BsArrowLeft} boxSize={5} />}
            onClick={handleBackToHome}
            variant="ghost"
            color="#CDF683"
            _hover={{
              bg: "rgba(205, 246, 131, 0.1)",
              transform: "translateX(-5px)"
            }}
            transition="all 0.2s"
            zIndex={20}
          />
        )}
      </Box>

      {/* Right side */}
      <HStack spacing={2} pointerEvents="auto">
        <IconButton
          aria-label="View Chats"
          icon={<Icon as={BsClock} boxSize={5} />}
          onClick={onModalOpen}
          bg="rgba(205, 246, 131, 0.1)"
          _hover={{ bg: 'rgba(205, 246, 131, 0.2)' }}
          color="#CDF683"
          size="lg"
          borderWidth="1px"
          borderColor="rgba(205, 246, 131, 0.3)"
          borderRadius="xl"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
          transition="all 0.2s"
        />
      </HStack>
    </HStack>
  );
};
