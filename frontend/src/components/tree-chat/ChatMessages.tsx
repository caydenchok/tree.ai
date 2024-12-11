import { Box, VStack, HStack, Avatar, Text, IconButton, Icon } from '@chakra-ui/react';
import { BsBookmark } from 'react-icons/bs';
import { FaRobot, FaUser } from 'react-icons/fa';
import { Message } from '../../services/chatService';
import { RefObject } from 'react';

interface ChatMessagesProps {
  messages: Message[];
  chatContainerRef: RefObject<HTMLDivElement>;
  messagesEndRef: RefObject<HTMLDivElement>;
}

export const ChatMessages = ({ messages, chatContainerRef, messagesEndRef }: ChatMessagesProps) => {
  return (
    <Box
      position="relative"
      h="calc(100vh - 80px)"
      mt={2}
      overflow="hidden"
    >
      <Box
        ref={chatContainerRef}
        overflowY="auto"
        h="100%"
        pb={24}
        pt={2}
        px={4}
        css={{
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        <VStack
          width="100%"
          spacing={4}
          align="stretch"
          px={4}
          pt={4}
          pb={0}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              p={6}
              bgGradient={
                message.role === 'assistant'
                  ? "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))"
                  : "linear(to-r, rgba(205, 246, 131, 0.15), rgba(205, 246, 131, 0.1))"
              }
              borderRadius="lg"
              borderWidth="1px"
              borderColor={message.role === 'assistant' ? "whiteAlpha.100" : "#CDF683"}
              width="100%"
              maxW="100%"
              mx="auto"
              backdropFilter="blur(8px)"
              boxShadow="lg"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
              transition="all 0.2s"
              ref={index === messages.length - 1 ? messagesEndRef : undefined}
            >
              <HStack spacing={4} align="start" width="100%">
                <Avatar
                  size="sm"
                  icon={message.role === 'assistant' ? <FaRobot /> : <FaUser />}
                  bg={message.role === 'assistant' ? "green.500" : "blue.500"}
                />
                <VStack align="start" flex={1} spacing={2} width="100%">
                  <HStack spacing={2} width="100%" justify="space-between">
                    <HStack spacing={2}>
                      <Text fontSize="sm" fontWeight="bold" color="whiteAlpha.900">
                        {message.role === 'assistant' ? 'AI Assistant' : 'You'}
                      </Text>
                      <Text fontSize="xs" color="whiteAlpha.600">
                        {new Date().toLocaleTimeString()}
                      </Text>
                    </HStack>
                    {message.role === 'assistant' && (
                      <IconButton
                        aria-label="Save message"
                        icon={<Icon as={BsBookmark} />}
                        size="sm"
                        variant="ghost"
                        color="#CDF683"
                        _hover={{
                          bg: "rgba(205, 246, 131, 0.1)",
                          transform: "scale(1.1)"
                        }}
                        transition="all 0.2s"
                      />
                    )}
                  </HStack>
                  <Text 
                    color="whiteAlpha.900" 
                    fontSize="md" 
                    width="100%"
                    whiteSpace="pre-wrap"
                    sx={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word'
                    }}
                  >
                    {message.content}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};
