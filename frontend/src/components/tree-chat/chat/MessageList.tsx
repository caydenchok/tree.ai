import { VStack, Box, Text, Flex, Icon } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaRobot } from 'react-icons/fa';
import React from 'react';

const MotionBox = motion(Box);

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading = false,
}) => {
  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <VStack spacing={4} align="stretch" width="100%" position="relative">
      <Box
        position="relative"
        h="calc(100vh - 80px)"
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(205, 246, 131, 0.2)',
            borderRadius: '24px',
          },
        }}
      >
        <AnimatePresence>
          {messages.map((message, index) => (
            <MotionBox
              key={index}
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              mb={4}
            >
              <Flex
                alignItems="flex-start"
                justifyContent={message.role === 'user' ? 'flex-end' : 'flex-start'}
                px={4}
              >
                {message.role === 'assistant' && (
                  <Icon
                    as={FaRobot}
                    boxSize={5}
                    color="#CDF683"
                    mr={2}
                    mt={1}
                  />
                )}
                <Box
                  maxW="70%"
                  bg={message.role === 'user' ? 'rgba(205, 246, 131, 0.1)' : 'whiteAlpha.50'}
                  color="white"
                  p={4}
                  borderRadius="lg"
                  borderTopLeftRadius={message.role === 'assistant' ? 0 : 'lg'}
                  borderTopRightRadius={message.role === 'user' ? 0 : 'lg'}
                >
                  <Text>{message.content}</Text>
                </Box>
                {message.role === 'user' && (
                  <Icon
                    as={FaUser}
                    boxSize={5}
                    color="#CDF683"
                    ml={2}
                    mt={1}
                  />
                )}
              </Flex>
            </MotionBox>
          ))}
          {isLoading && (
            <MotionBox
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              mb={4}
              px={4}
            >
              <Flex alignItems="center">
                <Icon as={FaRobot} boxSize={5} color="#CDF683" mr={2} />
                <Box
                  bg="whiteAlpha.50"
                  color="white"
                  p={4}
                  borderRadius="lg"
                  borderTopLeftRadius={0}
                >
                  <Text>Thinking...</Text>
                </Box>
              </Flex>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </VStack>
  );
};
