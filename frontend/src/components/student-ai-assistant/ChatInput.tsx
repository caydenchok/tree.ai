import React, { useState } from 'react';
import {
  Box,
  Input,
  IconButton,
  HStack,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { FiSend, FiMic, FiPaperclip } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onVoiceInput?: () => void;
  onAttachment?: () => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onVoiceInput,
  onAttachment,
  isLoading = false,
}) => {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        p={4}
        borderTop="1px solid"
        borderColor="whiteAlpha.200"
        bg="rgba(0, 0, 0, 0.3)"
        backdropFilter="blur(10px)"
      >
        <HStack spacing={2}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            size="lg"
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor="whiteAlpha.200"
            _hover={{
              borderColor: "whiteAlpha.300",
              bg: "whiteAlpha.200"
            }}
            _focus={{
              borderColor: "#cdf683",
              boxShadow: "0 0 0 1px #cdf683"
            }}
            color="white"
            _placeholder={{ color: "whiteAlpha.500" }}
          />
          
          {onAttachment && (
            <Tooltip label="Attach file" placement="top">
              <IconButton
                aria-label="Attach file"
                icon={<FiPaperclip />}
                onClick={onAttachment}
                variant="ghost"
                colorScheme="green"
                size="lg"
                isDisabled={isLoading}
                _hover={{
                  bg: "whiteAlpha.200"
                }}
              />
            </Tooltip>
          )}
          
          {onVoiceInput && (
            <Tooltip label="Voice input" placement="top">
              <IconButton
                aria-label="Voice input"
                icon={<FiMic />}
                onClick={onVoiceInput}
                variant="ghost"
                colorScheme="green"
                size="lg"
                isDisabled={isLoading}
                _hover={{
                  bg: "whiteAlpha.200"
                }}
              />
            </Tooltip>
          )}
          
          <Tooltip label="Send message" placement="top">
            <IconButton
              aria-label="Send message"
              icon={<FiSend />}
              onClick={handleSend}
              colorScheme="green"
              size="lg"
              isLoading={isLoading}
              isDisabled={!message.trim()}
              _hover={{
                transform: "translateY(-2px)",
                shadow: "lg"
              }}
              transition="all 0.2s"
            />
          </Tooltip>
        </HStack>
      </Box>
    </MotionBox>
  );
};

export default ChatInput;
