import { Box, InputGroup, Input, InputRightElement, IconButton, Icon } from '@chakra-ui/react';
import { BsSend } from 'react-icons/bs';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  isLoading
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      position="fixed"
      bottom={7}
      left={0}
      right={0}
      px={4}
      zIndex={2}
    >
      <Box
        mx="auto"
        maxW="5xl"
        bg="rgba(0, 0, 0, 0.3)"
        backdropFilter="blur(10px)"
        borderRadius="2xl"
        p={4}
        borderWidth="1px"
        borderColor="whiteAlpha.200"
      >
        <InputGroup size="lg">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            bg="whiteAlpha.50"
            border="none"
            _focus={{
              boxShadow: "none",
              bg: "whiteAlpha.100"
            }}
            _hover={{
              bg: "whiteAlpha.100"
            }}
            color="white"
            disabled={isLoading}
          />
          <InputRightElement>
            <IconButton
              aria-label="Send message"
              icon={<Icon as={BsSend} />}
              size="sm"
              variant="ghost"
              color="#CDF683"
              _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
              isLoading={isLoading}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
};
