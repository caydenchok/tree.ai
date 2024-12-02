import React from 'react';
import {
  VStack,
  Box,
  Text,
  IconButton,
  HStack,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { SavedChat } from './types';

const MotionBox = motion(Box);

interface SavedChatsProps {
  chats: SavedChat[];
  onSelect: (chatId: string) => void;
  onDelete: (chatId: string) => void;
}

const SavedChats: React.FC<SavedChatsProps> = ({
  chats,
  onSelect,
  onDelete,
}) => {
  return (
    <VStack spacing={3} align="stretch" w="full">
      {chats.map((chat) => (
        <MotionBox
          key={chat.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Box
            p={4}
            bg="whiteAlpha.100"
            borderRadius="lg"
            cursor="pointer"
            onClick={() => onSelect(chat.id)}
            _hover={{
              bg: "whiteAlpha.200",
              transform: "translateY(-2px)",
              boxShadow: "lg"
            }}
            transition="all 0.2s"
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text color="white" fontWeight="bold" noOfLines={1}>
                  {chat.title}
                </Text>
                <HStack spacing={2} color="whiteAlpha.700">
                  <FiClock />
                  <Text fontSize="sm">
                    {new Date(chat.timestamp).toLocaleDateString()}
                  </Text>
                </HStack>
              </VStack>
              
              <Tooltip label="Delete chat" placement="top">
                <IconButton
                  aria-label="Delete chat"
                  icon={<FiTrash2 />}
                  variant="ghost"
                  colorScheme="red"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(chat.id);
                  }}
                  _hover={{
                    bg: "red.500",
                    color: "white"
                  }}
                />
              </Tooltip>
            </HStack>
          </Box>
        </MotionBox>
      ))}
      
      {chats.length === 0 && (
        <Box
          p={4}
          bg="whiteAlpha.100"
          borderRadius="lg"
          textAlign="center"
        >
          <Text color="whiteAlpha.600">
            No saved chats yet
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default SavedChats;
