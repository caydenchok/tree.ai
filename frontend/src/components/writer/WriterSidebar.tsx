import React from 'react';
import {
  Box,
  VStack,
  Text,
  IconButton,
  Heading,
  Divider,
  Button,
  Badge,
  HStack,
  Tooltip,
  Flex,
  Input,
  Avatar,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon, ChatIcon } from '@chakra-ui/icons';
import { FaHistory, FaChartBar, FaMagic, FaRegLightbulb, FaBookmark } from 'react-icons/fa';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface WriterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  suggestions: string[];
  content: string;
  messages: Message[];
  chatInput: string;
  onChatInputChange: (value: string) => void;
  onSendMessage: () => void;
}

const WriterSidebar: React.FC<WriterSidebarProps> = ({
  isOpen,
  onClose,
  onOpen,
  suggestions,
  content,
  messages,
  chatInput,
  onChatInputChange,
  onSendMessage,
}) => {
  const bgColor = 'rgba(34, 39, 29, 0.65)';
  const toolbarBg = 'rgba(255, 255, 255, 0.03)';
  const borderColor = 'rgba(255, 255, 255, 0.1)';
  const textColor = '#CDF683';
  const chatBg = 'rgba(255, 255, 255, 0.02)';
  
  const titleGlowEffect = {
    textShadow: '0 0 10px rgba(205, 246, 131, 0.5)',
    transition: 'text-shadow 0.3s ease-in-out',
    _hover: {
      textShadow: '0 0 15px rgba(205, 246, 131, 0.8)',
    }
  };

  const glassEffect = {
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)', // For Safari support
  };

  const expandButtonStyle = {
    position: "absolute" as const,
    left: "-12px",
    top: "50%",
    transform: "translateY(-50%)",
    size: "sm" as const,
    borderRadius: "full",
    bg: textColor,
    color: "black",
    _hover: { bg: '#bde472' },
    zIndex: 2000,
    width: "24px",
    height: "24px",
    minWidth: "24px",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (!isOpen) {
    return (
      <Flex
        w="40px"
        h="100vh"
        bg={bgColor}
        position="fixed"
        right={0}
        top={0}
        borderLeft="1px solid"
        borderColor={borderColor}
        flexDirection="column"
        alignItems="center"
        zIndex={1999}
        ml="12px"
        {...glassEffect}
      >
        <Button
          {...expandButtonStyle}
          onClick={onOpen}
        >
          <ChevronLeftIcon />
        </Button>
        <Flex
          flex={1}
          alignItems="center"
          justifyContent="center"
          pt={4}
          pb={4}
        >
          <Text
            color={textColor}
            fontWeight="bold"
            fontSize="sm"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              whiteSpace: 'nowrap',
              ...titleGlowEffect
            }}
          >
            TREE AI WRITING ASSISTANT
          </Text>
        </Flex>
      </Flex>
    );
  }

  return (
    <Box
      position="fixed"
      right={0}
      top={0}
      height="100vh"
      width="300px"
      bg={bgColor}
      borderLeft="1px solid"
      borderColor={borderColor}
      transition="all 0.2s"
      zIndex={1000}
      {...glassEffect}
    >
      <Button
        {...expandButtonStyle}
        onClick={onClose}
      >
        <ChevronRightIcon />
      </Button>

      <Tabs isFitted variant="enclosed" h="100%">
        <TabList 
          bg={toolbarBg} 
          borderBottom="1px solid" 
          borderColor={borderColor}
          sx={{
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: -1,
            }
          }}
        >
          <Tab 
            color="gray.400"
            _selected={{ 
              bg: 'rgba(205, 246, 131, 0.1)',
              color: "#CDF683",
              borderColor: "rgba(205, 246, 131, 0.3)",
              borderBottomWidth: "2px",
            }}
            _hover={{
              color: "#CDF683",
              bg: 'rgba(205, 246, 131, 0.05)',
            }}
          >
            <HStack spacing={2}>
              <ChatIcon />
              <Text fontSize="sm">Chat</Text>
            </HStack>
          </Tab>
          <Tab 
            color="gray.400"
            _selected={{ 
              bg: 'rgba(205, 246, 131, 0.1)',
              color: "#CDF683",
              borderColor: "rgba(205, 246, 131, 0.3)",
              borderBottomWidth: "2px",
            }}
            _hover={{
              color: "#CDF683",
              bg: 'rgba(205, 246, 131, 0.05)',
            }}
          >
            <HStack spacing={2}>
              <FaRegLightbulb />
              <Text fontSize="sm">Ideas</Text>
            </HStack>
          </Tab>
          <Tab 
            color="gray.400"
            _selected={{ 
              bg: 'rgba(205, 246, 131, 0.1)',
              color: "#CDF683",
              borderColor: "rgba(205, 246, 131, 0.3)",
              borderBottomWidth: "2px",
            }}
            _hover={{
              color: "#CDF683",
              bg: 'rgba(205, 246, 131, 0.05)',
            }}
          >
            <HStack spacing={2}>
              <FaChartBar />
              <Text fontSize="sm">Stats</Text>
            </HStack>
          </Tab>
        </TabList>

        <TabPanels h="calc(100% - 40px)" overflowY="hidden">
          {/* Chat Panel */}
          <TabPanel h="100%" p={0} display="flex" flexDirection="column">
            {/* Messages Container */}
            <VStack 
              flex="1" 
              p={4} 
              overflowY="auto" 
              spacing={4} 
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0, 0, 0, 0.1)',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
                  maxW="85%"
                >
                  <Box
                    bg={message.role === 'user' ? 'rgba(205, 246, 131, 0.1)' : 'rgba(255, 255, 255, 0.03)'}
                    p={3}
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor={message.role === 'user' ? 'rgba(205, 246, 131, 0.2)' : 'rgba(255, 255, 255, 0.1)'}
                  >
                    <Text color={message.role === 'user' ? '#CDF683' : 'white'}>
                      {message.content}
                    </Text>
                    <Text
                      fontSize="xs"
                      color="whiteAlpha.600"
                      mt={1}
                      textAlign={message.role === 'user' ? 'right' : 'left'}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </Box>
                </Box>
              ))}
            </VStack>

            {/* Chat Input */}
            <Box
              p={4}
              bg="rgba(22, 27, 34, 0.6)"
              borderTop="1px solid"
              borderColor="rgba(255, 255, 255, 0.1)"
              position="sticky"
              bottom={0}
              width="100%"
            >
              <InputGroup size="md">
                <Input
                  value={chatInput}
                  onChange={(e) => onChatInputChange(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onSendMessage();
                    }
                  }}
                  placeholder="Message Tree AI..."
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  borderRadius="full"
                  _hover={{ borderColor: 'rgba(205, 246, 131, 0.2)' }}
                  _focus={{ 
                    borderColor: '#CDF683',
                    boxShadow: '0 0 0 1px rgba(205, 246, 131, 0.2)'
                  }}
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.500' }}
                  pl={4}
                  pr="4.5rem"
                  h="40px"
                />
                <InputRightElement width="4.5rem" h="40px">
                  <Button
                    size="sm"
                    onClick={onSendMessage}
                    bg="#CDF683"
                    color="black"
                    _hover={{ bg: '#bde472' }}
                    _active={{ bg: '#aad361' }}
                    borderRadius="full"
                    h="30px"
                    mr={1}
                  >
                    Send
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          </TabPanel>

          {/* Suggestions Panel */}
          <TabPanel h="100%" overflowY="auto" bg={chatBg} p={4} sx={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.01)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
            },
          }}>
            <VStack spacing={3} align="stretch">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <Box
                    key={index}
                    p={3}
                    bg="rgba(22, 27, 34, 0.6)"
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor={borderColor}
                    _hover={{ borderColor: 'blue.500', cursor: 'pointer' }}
                    transition="all 0.2s"
                  >
                    <Text fontSize="sm" color={textColor}>
                      {suggestion}
                    </Text>
                  </Box>
                ))
              ) : (
                <Text fontSize="sm" color="gray.400">
                  No suggestions yet. Start writing to get AI suggestions.
                </Text>
              )}
            </VStack>
          </TabPanel>

          {/* Statistics Panel */}
          <TabPanel h="100%" overflowY="auto" bg={chatBg} p={4} sx={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.01)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
            },
          }}>
            <VStack spacing={4} align="stretch">
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" color={textColor}>Words</Text>
                  <Badge bg="rgba(205, 246, 131, 0.2)" color={textColor}>{content.trim() ? content.trim().split(/\s+/).length : 0}</Badge>
                </HStack>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" color={textColor}>Characters</Text>
                  <Badge bg="rgba(205, 246, 131, 0.2)" color={textColor}>{content.length}</Badge>
                </HStack>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" color={textColor}>Sentences</Text>
                  <Badge bg="rgba(205, 246, 131, 0.2)" color={textColor}>{content.split(/[.!?]+/).length - 1}</Badge>
                </HStack>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" color={textColor}>Paragraphs</Text>
                  <Badge bg="rgba(205, 246, 131, 0.2)" color={textColor}>{content.split(/\n\s*\n/).length}</Badge>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm" color={textColor}>Reading Time</Text>
                  <Badge bg="rgba(205, 246, 131, 0.2)" color={textColor}>{Math.ceil(content.trim().split(/\s+/).length / 200)} min</Badge>
                </HStack>
              </Box>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default WriterSidebar;
