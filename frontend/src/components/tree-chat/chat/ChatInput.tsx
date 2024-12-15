import {
  Box,
  Input,
  IconButton,
  Flex,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaPen } from 'react-icons/fa';
import React, { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  onModeSelect?: (mode: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isDisabled = false,
  placeholder = 'Type your message...',
  onModeSelect,
}) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSend = () => {
    if (message.trim() && !isDisabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleModeSelect = (mode: string) => {
    if (mode === 'writer') {
      navigate('/writer');
    }
    if (onModeSelect) {
      onModeSelect(mode);
    }
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      left="300px"
      right={0}
      p={4}
      bg="rgba(0, 0, 0, 0.3)"
      backdropFilter="blur(10px)"
    >
      <Flex maxW="800px" mx="auto" gap={2}>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            size="lg"
            variant="outline"
            borderColor="whiteAlpha.200"
            _hover={{ borderColor: "whiteAlpha.300" }}
            color="white"
          >
            Mode
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleModeSelect('chat')}>
              Chat
            </MenuItem>
            <MenuItem 
              icon={<FaPen />}
              onClick={() => handleModeSelect('writer')}
            >
              Writer
            </MenuItem>
          </MenuList>
        </Menu>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          size="lg"
          bg="whiteAlpha.50"
          border="1px solid"
          borderColor="whiteAlpha.200"
          _hover={{ borderColor: "whiteAlpha.300" }}
          _focus={{ 
            borderColor: "#CDF683",
            boxShadow: "0 0 0 1px #CDF683"
          }}
          color="white"
          disabled={isDisabled}
        />
        <IconButton
          aria-label="Send message"
          icon={<IoSend />}
          onClick={handleSend}
          isDisabled={!message.trim() || isDisabled}
          colorScheme="green"
          size="lg"
          bg="#CDF683"
          color="gray.800"
          _hover={{
            bg: "#d8f799",
            transform: "translateY(-1px)"
          }}
          transition="all 0.2s"
        />
      </Flex>
    </Box>
  );
};
