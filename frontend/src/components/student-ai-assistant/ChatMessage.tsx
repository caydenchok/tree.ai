import * as React from 'react';
import {
  Box,
  HStack,
  Text,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiMoreVertical, FiCopy, FiSave, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface ChatMessageProps {
  message: {
    content: string;
    sender: 'user' | 'assistant';
  };
  onCopy: () => void;
  onSave: () => void;
  onDelete: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = React.memo(({ 
  message, 
  onCopy, 
  onSave, 
  onDelete 
}) => {
  const isUser = message.sender === 'user';

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      style={{ willChange: 'transform, opacity' }}
      p={4}
      bg={isUser ? 'whiteAlpha.100' : 'whiteAlpha.200'}
      borderRadius="xl"
      boxShadow="lg"
      _hover={{
        bg: isUser ? 'whiteAlpha.200' : 'whiteAlpha.300',
        boxShadow: "xl",
      }}
      transition="all 0.2s"
    >
      <HStack spacing={4} align="start">
        <Avatar
          size="sm"
          name={isUser ? "User" : "AI Assistant"}
          src={isUser ? undefined : "/ai-avatar.png"}
          bg={isUser ? "blue.500" : "green.500"}
        />
        <Box flex={1}>
          <Text color="white">{message.content}</Text>
        </Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FiMoreVertical />}
            variant="ghost"
            size="sm"
            color="gray.400"
            _hover={{ color: 'white' }}
          />
          <MenuList bg="gray.800" borderColor="gray.700">
            <MenuItem 
              icon={<FiCopy />} 
              onClick={onCopy}
              _hover={{ bg: 'gray.700' }}
            >
              Copy
            </MenuItem>
            <MenuItem 
              icon={<FiSave />} 
              onClick={onSave}
              _hover={{ bg: 'gray.700' }}
            >
              Save
            </MenuItem>
            <MenuItem 
              icon={<FiTrash2 />} 
              onClick={onDelete}
              _hover={{ bg: 'gray.700' }}
              color="red.400"
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </MotionBox>
  );
});

export default ChatMessage;
