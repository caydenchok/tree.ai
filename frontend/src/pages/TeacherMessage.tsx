import { useState, type FC, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  VStack,
  HStack,
  Avatar,
  IconButton,
  Divider,
  Badge,
  Button,
  useColorModeValue,
  Card,
  CardBody,
  Heading,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { FaPaperPlane, FaSearch, FaEllipsisV, FaCircle } from 'react-icons/fa';
import TeacherSidebar from '../components/layout/TeacherSidebar/TeacherSidebar';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: string;
  isTeacher: boolean;
  avatar: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
}

const TeacherMessage: FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Theme colors
  const bgGradient = "linear(to-br, brand.secondary, brand.dark.primary)";
  const cardBg = "rgba(255, 255, 255, 0.05)";
  const hoverBg = "rgba(205, 246, 131, 0.1)";
  const borderColor = "rgba(205, 246, 131, 0.2)";
  const textColor = "brand.white.primary";
  const mutedColor = "whiteAlpha.700";
  const accentColor = "#cdf683";

  // Sample conversations data
  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      lastMessage: 'Thank you for the feedback on my project!',
      timestamp: '10:30 AM',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      online: true,
    },
    {
      id: '2',
      name: 'Michael Chen',
      lastMessage: 'When is the next assignment due?',
      timestamp: 'Yesterday',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      online: false,
    },
  ];

  // Sample messages data
  const messages: { [key: string]: Message[] } = {
    '1': [
      {
        id: '1',
        content: 'Hello! I wanted to ask about the feedback you gave on my project.',
        timestamp: '10:15 AM',
        sender: 'Sarah Johnson',
        isTeacher: false,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      {
        id: '2',
        content: 'Your project was excellent! I particularly liked your approach to problem-solving.',
        timestamp: '10:20 AM',
        sender: 'Teacher',
        isTeacher: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      },
      {
        id: '3',
        content: 'Thank you for the feedback on my project!',
        timestamp: '10:30 AM',
        sender: 'Sarah Johnson',
        isTeacher: false,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
    ],
  };

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    
    toast({
      title: 'Message sent',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    setMessageInput('');
    scrollToBottom();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Flex h="100vh" bg={bgGradient} overflow="hidden">
      <TeacherSidebar onCollapse={handleSidebarCollapse} />
      
      <Box
        flex="1"
        ml={isSidebarCollapsed ? "60px" : "240px"}
        transition="margin-left 0.3s"
        position="relative"
      >
        <Flex h="100vh">
          {/* Chat Area */}
          <Flex flex={1} direction="column" h="100vh">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <Flex
                  p={4}
                  bg={cardBg}
                  borderBottom="1px"
                  borderColor={borderColor}
                  align="center"
                >
                  <Avatar
                    size="sm"
                    src={conversations.find(c => c.id === selectedConversation)?.avatar}
                    mr={3}
                  />
                  <Box flex={1}>
                    <Text color={textColor} fontWeight="bold">
                      {conversations.find(c => c.id === selectedConversation)?.name}
                    </Text>
                    <Text color={mutedColor} fontSize="sm">
                      {conversations.find(c => c.id === selectedConversation)?.online
                        ? 'Online'
                        : 'Offline'}
                    </Text>
                  </Box>
                </Flex>

                {/* Messages */}
                <VStack flex={1} p={4} spacing={4} overflowY="auto" align="stretch">
                  {messages[selectedConversation]?.map((message, index) => (
                    <Box
                      key={message.id}
                      opacity="0"
                      transform="translateY(20px)"
                      animation={`fadeInUp 0.3s ease-out ${index * 0.1}s forwards`}
                      sx={{
                        '@keyframes fadeInUp': {
                          '0%': {
                            opacity: 0,
                            transform: 'translateY(20px)',
                          },
                          '100%': {
                            opacity: 1,
                            transform: 'translateY(0)',
                          },
                        },
                      }}
                    >
                      <Flex
                        justify={message.isTeacher ? 'flex-end' : 'flex-start'}
                      >
                        {!message.isTeacher && (
                          <Avatar size="sm" src={message.avatar} mr={2} />
                        )}
                        <Box
                          maxW="70%"
                          p={3}
                          bg={message.isTeacher ? accentColor : cardBg}
                          color={message.isTeacher ? 'black' : textColor}
                          borderRadius="lg"
                        >
                          <Text fontSize="sm">{message.content}</Text>
                          <Text fontSize="xs" color={message.isTeacher ? 'blackAlpha.700' : mutedColor} mt={1}>
                            {message.timestamp}
                          </Text>
                        </Box>
                        {message.isTeacher && (
                          <Avatar size="sm" src={message.avatar} ml={2} />
                        )}
                      </Flex>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </VStack>

                {/* Message Input */}
                <Box p={4} bg={cardBg} borderTop="1px" borderColor={borderColor}>
                  <InputGroup>
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      bg="brand.dark.secondary"
                      border="none"
                      _placeholder={{ color: mutedColor }}
                      color={textColor}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label="Send message"
                        icon={<FaPaperPlane />}
                        variant="ghost"
                        color={accentColor}
                        _hover={{ bg: hoverBg }}
                        onClick={handleSendMessage}
                      />
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </>
            ) : (
              <Flex
                flex={1}
                justify="center"
                align="center"
                direction="column"
                color={mutedColor}
              >
                <Text fontSize="lg" mb={2}>Select a conversation to start messaging</Text>
                <Text fontSize="sm">Choose from your contacts on the right</Text>
              </Flex>
            )}
          </Flex>

          {/* Conversations List - Now on the right */}
          <Card
            w="350px"
            bg={cardBg}
            borderLeft="1px"
            borderColor={borderColor}
            borderRadius="0"
          >
            <CardBody p={0}>
              <VStack h="full" spacing={0}>
                {/* Header */}
                <Box p={4} w="full">
                  <Heading size="md" color={textColor} mb={4}>
                    Messages
                  </Heading>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaSearch color={mutedColor} />
                    </InputLeftElement>
                    <Input
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      bg="brand.dark.secondary"
                      border="none"
                      _placeholder={{ color: mutedColor }}
                      color={textColor}
                    />
                  </InputGroup>
                </Box>

                <Divider borderColor={borderColor} />

                {/* Conversations List */}
                <VStack
                  flex={1}
                  w="full"
                  spacing={0}
                  overflowY="auto"
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(0, 0, 0, 0.1)',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: accentColor,
                      borderRadius: '4px',
                    },
                  }}
                >
                  {conversations.map((conversation, index) => (
                    <Box
                      key={conversation.id}
                      opacity="0"
                      transform="translateY(20px)"
                      animation={`fadeInUp 0.3s ease-out ${index * 0.1}s forwards`}
                      sx={{
                        '@keyframes fadeInUp': {
                          '0%': {
                            opacity: 0,
                            transform: 'translateY(20px)',
                          },
                          '100%': {
                            opacity: 1,
                            transform: 'translateY(0)',
                          },
                        },
                      }}
                    >
                      <Flex
                        w="full"
                        p={4}
                        alignItems="center"
                        cursor="pointer"
                        bg={selectedConversation === conversation.id ? hoverBg : 'transparent'}
                        _hover={{ bg: hoverBg }}
                        onClick={() => setSelectedConversation(conversation.id)}
                        position="relative"
                      >
                        <Box position="relative">
                          <Avatar size="md" src={conversation.avatar} />
                          {conversation.online && (
                            <Badge
                              position="absolute"
                              bottom="0"
                              right="0"
                              bg="green.500"
                              borderRadius="full"
                              border="2px solid"
                              borderColor={cardBg}
                              boxSize="3"
                            />
                          )}
                        </Box>
                        <VStack ml={3} align="start" flex={1} spacing={0}>
                          <Text color={textColor} fontWeight="bold">
                            {conversation.name}
                          </Text>
                          <Text color={mutedColor} fontSize="sm" noOfLines={1}>
                            {conversation.lastMessage}
                          </Text>
                        </VStack>
                        <VStack align="end" spacing={1}>
                          <Text color={mutedColor} fontSize="xs">
                            {conversation.timestamp}
                          </Text>
                          {conversation.unread > 0 && (
                            <Badge
                              bg={accentColor}
                              color="black"
                              borderRadius="full"
                              px={2}
                              fontSize="xs"
                            >
                              {conversation.unread}
                            </Badge>
                          )}
                        </VStack>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </Flex>
  );
};

export default TeacherMessage;
