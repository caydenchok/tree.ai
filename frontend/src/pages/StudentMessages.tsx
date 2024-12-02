import React from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Divider,
  Avatar,
  Badge,
  IconButton,
  Card,
  CardBody,
  Button,
  Heading,
  useToast,
  Textarea,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaPaperPlane,
  FaSearch,
  FaEllipsisV,
  FaCircle,
  FaImage,
  FaPaperclip,
  FaSmile,
} from 'react-icons/fa';
import StudentSidebar from '../components/layout/StudentSidebar/StudentSidebar';
import { useSidebar } from '../contexts/SidebarContext';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isUnread: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

const StudentMessages: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const [selectedConversation, setSelectedConversation] = React.useState<string | null>('1'); // Default to first conversation
  const [messageInput, setMessageInput] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const toast = useToast();

  // Sample data
  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      avatar: 'https://bit.ly/sage-adebayo',
      lastMessage: 'Great progress on your assignment!',
      timestamp: '10:30 AM',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      avatar: 'https://bit.ly/ryan-florence',
      lastMessage: 'The next class will cover...',
      timestamp: 'Yesterday',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '3',
      name: 'Study Group - Physics',
      avatar: 'https://bit.ly/prosper-baba',
      lastMessage: "Let's meet at the library at 3 PM",
      timestamp: 'Yesterday',
      unreadCount: 5,
      isOnline: true,
    },
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Dr. Sarah Wilson',
      avatar: 'https://bit.ly/sage-adebayo',
      content: 'Hi! How\'s your progress with the assignment?',
      timestamp: '10:15 AM',
      isUnread: true,
    },
    {
      id: '2',
      sender: 'You',
      avatar: 'https://bit.ly/dan-abramov',
      content: 'I\'ve completed most of it. Just reviewing the final section.',
      timestamp: '10:20 AM',
      isUnread: false,
    },
    {
      id: '3',
      sender: 'Dr. Sarah Wilson',
      avatar: 'https://bit.ly/sage-adebayo',
      content: 'Great progress! Let me know if you need any help.',
      timestamp: '10:30 AM',
      isUnread: true,
    },
  ];

  // Theme colors
  const bgGradient = "linear(to-br, brand.secondary, brand.dark.primary)";
  const cardBg = "rgba(255, 255, 255, 0.05)";
  const hoverBg = "rgba(205, 246, 131, 0.1)";
  const borderColor = "rgba(205, 246, 131, 0.2)";
  const textColor = "brand.white.primary";
  const mutedColor = "whiteAlpha.700";
  const accentColor = "#cdf683";

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      toast({
        title: 'Message sent',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Flex h="100vh" bg={bgGradient} overflow="hidden">
      <StudentSidebar />
      <Box
        flex="1"
        ml={isCollapsed ? "60px" : "240px"}
        transition="all 0.3s"
        w={`calc(100% - ${isCollapsed ? "60px" : "240px"})`}
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
                      {conversations.find(c => c.id === selectedConversation)?.isOnline
                        ? 'Online'
                        : 'Offline'}
                    </Text>
                  </Box>
                </Flex>

                {/* Messages */}
                <VStack flex={1} p={4} spacing={4} overflowY="auto" align="stretch">
                  {messages.map((message) => (
                    <Flex
                      key={message.id}
                      justify={message.sender === 'You' ? 'flex-end' : 'flex-start'}
                    >
                      {message.sender !== 'You' && (
                        <Avatar size="sm" src={message.avatar} mr={2} />
                      )}
                      <Box
                        maxW="70%"
                        p={3}
                        bg={message.sender === 'You' ? accentColor : cardBg}
                        color={message.sender === 'You' ? 'black' : textColor}
                        borderRadius="lg"
                      >
                        <Text fontSize="sm">{message.content}</Text>
                        <Text fontSize="xs" color={message.sender === 'You' ? 'blackAlpha.700' : mutedColor} mt={1}>
                          {message.timestamp}
                        </Text>
                      </Box>
                      {message.sender === 'You' && (
                        <Avatar size="sm" src={message.avatar} ml={2} />
                      )}
                    </Flex>
                  ))}
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
                  {conversations.map((conversation) => (
                    <Flex
                      key={conversation.id}
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
                        {conversation.isOnline && (
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
                        {conversation.unreadCount > 0 && (
                          <Badge
                            bg={accentColor}
                            color="black"
                            borderRadius="full"
                            px={2}
                          >
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </VStack>
                    </Flex>
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

export default StudentMessages;
