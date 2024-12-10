import { Box, HStack, VStack, Text, IconButton, Icon, Avatar, useToast } from '@chakra-ui/react';
import { BsBookmark, BsBookmarkFill, BsCopy } from 'react-icons/bs';
import { FaUser, FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface Message {
  role: string;
  content: string;
  id?: number;
}

interface ChatMessageProps {
  message: Message;
  isMessageSaved: (content: string) => boolean;
  handleSaveMessage: (content: string, topic?: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isMessageSaved,
  handleSaveMessage,
}) => {
  const toast = useToast();
  const isSaved = isMessageSaved(message.content);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        p={6}
        bg="rgba(255, 255, 255, 0.03)"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="whiteAlpha.100"
        _hover={{
          bg: "rgba(255, 255, 255, 0.06)",
          borderColor: "whiteAlpha.200"
        }}
        transition="all 0.2s"
      >
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between">
            <HStack spacing={3}>
              <Avatar
                size="sm"
                icon={message.role === 'assistant' ? <FaRobot /> : <FaUser />}
                bg={message.role === 'assistant' ? "green.500" : "blue.500"}
              />
              <Text color="white" fontWeight="semibold">
                {message.role === 'assistant' ? 'AI Assistant' : 'You'}
              </Text>
            </HStack>
            <HStack spacing={2}>
              <IconButton
                aria-label="Copy message"
                icon={<Icon as={BsCopy} />}
                size="sm"
                variant="ghost"
                color="#CDF683"
                _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                onClick={() => {
                  navigator.clipboard.writeText(message.content);
                  toast({
                    title: "Copied to clipboard",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                }}
              />
              <IconButton
                aria-label={isSaved ? "Unsave message" : "Save message"}
                icon={<Icon as={isSaved ? BsBookmarkFill : BsBookmark} />}
                size="sm"
                variant="ghost"
                color="#CDF683"
                _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                onClick={() => handleSaveMessage(message.content)}
              />
            </HStack>
          </HStack>
          <Text color="whiteAlpha.800" fontSize="md" whiteSpace="pre-wrap">
            {message.content}
          </Text>
        </VStack>
      </Box>
    </MotionBox>
  );
};
