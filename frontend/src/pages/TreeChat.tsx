import { Box, VStack, Text, Button, IconButton, Icon, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useToast, Tooltip, Container, Flex, Input, Avatar, Menu, MenuButton, MenuList, MenuItem, Divider, SimpleGrid, Card, CardBody, Badge, Heading, InputGroup, InputRightElement } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsTrash, BsStars, BsSend, BsThreeDotsVertical, BsCopy, BsDownload, BsClock, BsX, BsFileText, BsTable, BsPeople, BsArrowLeft, BsBookmark, BsBookmarkFill, BsUpload, BsCamera } from 'react-icons/bs';
import { IoRefreshOutline } from 'react-icons/io5';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import { useRef, useState, useEffect, useCallback } from 'react';
import TechTreeBackground from '../components/common/TechTreeBackground/TechTreeBackground';
import { keyframes } from '@emotion/react';
import { FaUser, FaRobot, FaFileUpload, FaCamera, FaPaperPlane, FaCrown } from 'react-icons/fa';
import chatService, { Message } from '../services/chatService';
import { ChatInput } from '../components/tree-chat/ChatInput';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionCard = motion(Card);

const typingAnimation = keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`;

const loadingLineKeyframes = keyframes`
  0% {
    left: -20%;
    width: 20%;
  }
  50% {
    width: 40%;
  }
  100% {
    left: 100%;
    width: 20%;
  }
`;

const loadingLineAnimation = `${loadingLineKeyframes} 1.5s ease-in-out infinite`;

const TypingIndicator = () => (
  <HStack spacing={1}>
    <Box
      as="span"
      w="4px"
      h="4px"
      borderRadius="full"
      bg="white"
      animation={`${typingAnimation} 1.4s infinite linear`}
      sx={{ animationDelay: '0s' }}
    />
    <Box
      as="span"
      w="4px"
      h="4px"
      borderRadius="full"
      bg="white"
      animation={`${typingAnimation} 1.4s infinite linear`}
      sx={{ animationDelay: '0.2s' }}
    />
    <Box
      as="span"
      w="4px"
      h="4px"
      borderRadius="full"
      bg="white"
      animation={`${typingAnimation} 1.4s infinite linear`}
      sx={{ animationDelay: '0.4s' }}
    />
  </HStack>
);

const TreeChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitEndTime, setRateLimitEndTime] = useState<Date | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSavedMessages, setShowSavedMessages] = useState(false);
  const [showMobileCards, setShowMobileCards] = useState(false);

  const handleBackToHome = () => {
    setShowWelcome(true);
    setMessages([]);
  };

  useEffect(() => {
    try {
      loadChatHistory();
    } catch (error) {
      console.error('Failed to initialize chat:', error);
    }
  }, []);

  const [recentChats, setRecentChats] = useState([
    {
      id: 1,
      title: "Python Programming ",
      preview: "Last conversation about Python basics...",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "JavaScript Help ",
      preview: "Discussion about React hooks...",
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      title: "Database Design ",
      preview: "SQL query optimization tips...",
      timestamp: "1 day ago"
    }
  ]);

  const quickActions = [
    { title: 'Summarize study notes', icon: BsFileText },
    { title: 'Generate practice questions', icon: BsTable },
    { title: 'Get homework help', icon: BsPeople },
  ];

  const quickTips = [
    { icon: BsStars, text: "Ask me to explain any concept" },
    { icon: BsTable, text: "I can help with data analysis" },
    { icon: BsFileText, text: "Get help with writing and editing" },
    { icon: BsPeople, text: "Learn about any topic or field" }
  ];

  const aiFeatures = [
    {
      id: 1,
      title: "Academic Assistant",
      description: "Get help with homework, research, and study materials",
      icon: "📚",
      gradient: "linear(to-r, #4FACFE, #00F2FE)",
      titleColor: "gray.800",
      actions: ["Explain concepts", "Solve problems", "Create study guides"]
    },
    {
      id: 2,
      title: "Code Companion",
      description: "Your programming and development partner",
      icon: "💻",
      gradient: "linear(to-r, #43E97B, #38F9D7)",
      titleColor: "gray.900",
      actions: ["Debug code", "Explain algorithms", "Suggest improvements"]
    },
    {
      id: 3,
      title: "Writing Assistant",
      description: "Perfect your writing and communication",
      icon: "✍️",
      gradient: "linear(to-r, #FA709A, #FEE140)",
      titleColor: "gray.800",
      actions: ["Grammar check", "Style suggestions", "Content organization"]
    },
    {
      id: 4,
      title: "Research Helper",
      description: "Analyze data and find information efficiently",
      icon: "🔍",
      gradient: "linear(to-r, #764BA2, #667EEA)",
      titleColor: "gray.900",
      actions: ["Data analysis", "Research summaries", "Source verification"]
    }
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showMobileOverlay, setShowMobileOverlay] = useState(false);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    if (diff <= 0) return "0:00";
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleRateLimit = useCallback(() => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 1);
    setRateLimitEndTime(endTime);
    setIsRateLimited(true);

    toast({
      title: "",
      description: (
        <VStack align="start" spacing={2}>
          <Text>You've reached the free plan limit.</Text>
          <Text>Upgrade to continue chatting!</Text>
        </VStack>
      ),
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  }, [formatTimeRemaining]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (rateLimitEndTime) {
      timer = setInterval(() => {
        if (new Date() >= rateLimitEndTime) {
          setIsRateLimited(false);
          setRateLimitEndTime(null);
          toast({
            title: "You're back!",
            description: "You can now continue chatting.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [rateLimitEndTime]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || isRateLimited) return;

    try {
      setIsLoading(true);
      setShowWelcome(false);
      
      // Add user message immediately
      const userMessage: Message = {
        role: 'user',
        content: inputValue.trim()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      
      // Blur input to dismiss keyboard on mobile
      inputRef.current?.blur();
      
      // Scroll after user message
      scrollToBottom();

      // Get response from API
      const response = await chatService.sendMessage(userMessage.content);
      setMessages(prev => [...prev, response]);
      
      // Scroll after AI response
      scrollToBottom();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return '🌙 Happy late night';
    if (hour < 12) return '🌅 Good morning';
    if (hour < 17) return '☀️ Good afternoon';
    if (hour < 22) return '🌆 Good evening';
    return '🌙 Happy late night';
  };

  const getLateNightMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 5) {
      return "✨ Ask me anything... I know everything (even at this hour!)";
    }
    return "✨ Ask me anything... I know everything";
  };

  const toast = useToast();
  const { isOpen, onOpen: handleOpen, onClose } = useDisclosure();

  // Sample saved messages
  const [savedMessages, setSavedMessages] = useState([
    {
      id: 1,
      content: "Here's how to implement a binary search tree...",
      timestamp: "2 days ago",
      topic: "Data Structures"
    },
    {
      id: 2,
      content: "The key principles of object-oriented programming are...",
      timestamp: "1 week ago",
      topic: "OOP Concepts"
    },
    {
      id: 3,
      content: "To optimize your SQL queries, consider these tips...",
      timestamp: "2 weeks ago",
      topic: "Database Tips"
    },
    {
      id: 4,
      content: "React hooks best practices: 1. Always follow the rules of hooks 2. Don't call hooks inside loops or conditions 3. Use custom hooks for reusable logic 4. Keep hooks simple and focused...",
      timestamp: "3 days ago",
      topic: "React Development"
    },
    {
      id: 5,
      content: "Machine Learning workflow: 1. Data collection 2. Data preprocessing 3. Feature engineering 4. Model selection 5. Training 6. Evaluation 7. Deployment...",
      timestamp: "5 days ago",
      topic: "Machine Learning"
    }
  ]);

  const isMessageSaved = (content: string) => {
    return savedMessages.some(msg => msg.content === content);
  };

  const handleSaveMessage = (content: string, topic: string = "Saved Message") => {
    if (isMessageSaved(content)) {
      // Remove the message if it's already saved
      setSavedMessages(prev => prev.filter(msg => msg.content !== content));
      toast({
        title: "Message Unsaved",
        description: "Message removed from saved messages.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Add the message if it's not saved
      const newSavedMessage = {
        id: savedMessages.length + 1,
        content,
        timestamp: "Just now",
        topic
      };
      setSavedMessages(prev => [newSavedMessage, ...prev]);
      toast({
        title: "Message Saved",
        description: "You can find this message in your saved messages.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Add state for recent chats modal
  const { isOpen: isRecentChatsOpen, onOpen: onRecentChatsOpen, onClose: onRecentChatsClose } = useDisclosure();

  // Add state for saved message modal
  const { isOpen: isSavedMessageOpen, onOpen: onSavedMessageOpen, onClose: onSavedMessageClose } = useDisclosure();
  const [selectedMessage, setSelectedMessage] = useState<string>("");

  // Add state for all saved messages modal
  const { isOpen: isAllSavedOpen, onOpen: onAllSavedOpen, onClose: onAllSavedClose } = useDisclosure();

  // Load chat history when component mounts
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const history = await chatService.getConversationHistory();
        if (history.length > 0) {
          setMessages(history);
          setShowWelcome(false);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load chat history",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
      }
    };
    loadChatHistory();
  }, [toast]);

  const handleDeleteRecentChat = (chatId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the chat selection
    setRecentChats(prev => prev.filter(chat => chat.id !== chatId));
    toast({
      title: "Chat Deleted",
      description: "The chat has been removed from your history",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteSavedMessage = (messageId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the message modal
    setSavedMessages(prev => prev.filter(msg => msg.id !== messageId));
    toast({
      title: "Message Deleted",
      description: "The message has been removed from your saved items",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleOpenMobileOverlay = () => {
    setShowMobileOverlay(true);
  };

  const handleCloseMobileOverlay = () => {
    setShowMobileOverlay(false);
  };

  return (
    <Box
      position="relative"
      minH="100vh"
      w="100%"
      overflow="hidden"
      bg="black"
      css={{
        background: 'radial-gradient(circle at 50% 50%, rgba(205, 246, 131, 0.03), rgba(0, 0, 0, 1))',
      }}
    >
      <TechTreeBackground />
      <Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <TechTreeBackground />
      </Box>

      {/* Background overlay */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-b, rgba(0,0,0,0.7) 0%, rgba(24,26,15,0.8) 100%)"
        backdropFilter="blur(5px)"
        zIndex={1}
        pointerEvents="none"
      />

      {/* Mobile History Overlay */}
      <AnimatePresence>
        {showMobileOverlay && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '100%',
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)',
              zIndex: 2100,
              overflowY: 'auto'
            }}
          >
            <VStack spacing={6} px={4} py={4}>
              {/* Header with close button */}
              <HStack justify="flex-end" w="100%" mb={2}>
                <IconButton
                  aria-label="Close menu"
                  icon={<BsX size={24} />}
                  onClick={handleCloseMobileOverlay}
                  variant="solid"
                  color="black"
                  bg="#CDF683"
                  size="lg"
                  _hover={{
                    bg: "#CDF683",
                    transform: "rotate(90deg)"
                  }}
                  transition="all 0.3s"
                  rounded="full"
                  boxShadow="lg"
                />
              </HStack>

              {/* Recent Chats Card */}
              <Card
                bg="whiteAlpha.50"
                borderColor="whiteAlpha.200"
                borderWidth={1}
                _hover={{ 
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(205, 246, 131, 0.15)"
                }}
                transition="all 0.2s"
                w="100%"
              >
                <CardBody>
                  <VStack align="start" spacing={4} w="100%">
                    <HStack justify="space-between" width="100%" mb={2}>
                      <HStack color="#CDF683">
                        <Icon as={FiClock} />
                        <Text fontWeight="bold">Recent Chats</Text>
                      </HStack>
                      <Button
                        onClick={() => {
                          onRecentChatsOpen();
                          handleCloseMobileOverlay();
                        }}
                        variant="ghost"
                        size="sm"
                        color="#CDF683"
                        _hover={{
                          bg: "rgba(205, 246, 131, 0.1)",
                        }}
                      >
                        View All
                      </Button>
                    </HStack>
                    <SimpleGrid columns={1} spacing={4} w="100%">
                      {recentChats.slice(0, 1).map((chat) => (
                        <Box
                          key={chat.id}
                          p={4}
                          bg="whiteAlpha.50"
                          borderRadius="lg"
                          borderWidth="1px"
                          borderColor="whiteAlpha.200"
                          cursor="pointer"
                          onClick={() => {
                            handleCloseMobileOverlay();
                            setShowWelcome(false);
                          }}
                          _hover={{
                            bg: "whiteAlpha.100",
                            borderColor: "rgba(205, 246, 131, 0.4)"
                          }}
                        >
                          <VStack align="start" spacing={2}>
                            <Text fontWeight="bold" color="white">
                              {chat.title}
                            </Text>
                            <Text fontSize="sm" color="whiteAlpha.700">
                              {chat.preview}
                            </Text>
                            <Text fontSize="xs" color="whiteAlpha.600">
                              {chat.timestamp}
                            </Text>
                          </VStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </VStack>
                </CardBody>
              </Card>

              {/* Saved Messages Card */}
              <Card
                bg="whiteAlpha.50"
                borderColor="whiteAlpha.200"
                borderWidth={1}
                _hover={{ 
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(205, 246, 131, 0.15)"
                }}
                transition="all 0.2s"
                w="100%"
                pb={6}
              >
                <CardBody>
                  <VStack align="start" spacing={4} w="100%">
                    <HStack justify="space-between" width="100%" mb={2}>
                      <HStack color="#CDF683">
                        <Icon as={BsBookmarkFill} />
                        <Text fontWeight="bold">Saved Messages</Text>
                      </HStack>
                      <Button
                        onClick={() => {
                          onAllSavedOpen();
                          handleCloseMobileOverlay();
                        }}
                        variant="ghost"
                        size="sm"
                        color="#CDF683"
                        _hover={{
                          bg: "rgba(205, 246, 131, 0.1)",
                        }}
                      >
                        View All
                      </Button>
                    </HStack>
                    <SimpleGrid columns={1} spacing={4} w="100%">
                      {savedMessages.slice(0, 1).map((msg) => (
                        <Box
                          key={msg.id}
                          p={4}
                          bg="whiteAlpha.50"
                          borderRadius="lg"
                          borderWidth="1px"
                          borderColor="whiteAlpha.200"
                          cursor="pointer"
                          onClick={() => {
                            setSelectedMessage(msg.content);
                            onSavedMessageOpen();
                            handleCloseMobileOverlay();
                          }}
                          _hover={{
                            bg: "whiteAlpha.100",
                            borderColor: "rgba(205, 246, 131, 0.4)"
                          }}
                        >
                          <VStack align="start" spacing={2}>
                            <Text fontWeight="bold" color="white">
                              {msg.topic}
                            </Text>
                            <Text fontSize="sm" color="whiteAlpha.700" noOfLines={2}>
                              {msg.content}
                            </Text>
                            <Text fontSize="xs" color="whiteAlpha.600">
                              {msg.timestamp}
                            </Text>
                          </VStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content wrapper */}
      <Box position="relative" zIndex={2}>
        <Container maxW="container.xl" pt={{ base: 4, md: 6 }}>
          <Flex direction="column" minH="calc(100vh - 80px)">
            <VStack spacing={6} flex="1" w="100%" position="relative">
              {showWelcome && (
                <VStack spacing={8} w="100%" pt={{ base: 8, md: 12 }}>
                  {/* Badge and Greeting */}
                  <VStack 
                    spacing={4} 
                    align="center" 
                    w="100%"
                    minH={{ base: "calc(100vh - 200px)", md: "auto" }}
                    justify={{ base: "center", md: "flex-start" }}
                    position="relative"
                  >
                    {/* History button */}
                    <Button
                      position="fixed"
                      top={3}
                      right={4}
                      onClick={handleOpenMobileOverlay}
                      display={{ base: 'flex', md: 'none' }}
                      alignItems="center"
                      bg="rgba(13, 16, 22, 0.7)"
                      backdropFilter="blur(10px)"
                      border="1px solid"
                      borderColor="#CDF683"
                      color="white"
                      px={4}
                      h="42px"
                      zIndex={2000}
                      _hover={{
                        bg: "rgba(13, 16, 22, 0.8)",
                        transform: "translateY(-1px)",
                        shadow: "lg",
                      }}
                      _active={{
                        bg: "rgba(13, 16, 22, 0.9)",
                        transform: "translateY(0)",
                      }}
                      transition="all 0.2s"
                      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    >
                      <HStack spacing={2}>
                        <Icon as={BsClock} color="#CDF683" boxSize={4} />
                        <Text>Chats</Text>
                        <Box
                          bg="#CDF683"
                          color="black"
                          px={2}
                          py={0.5}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="bold"
                          minW="20px"
                          textAlign="center"
                        >
                          {recentChats.length}
                        </Box>
                      </HStack>
                    </Button>

                    <Badge
                      colorScheme="green"
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      gap={2}
                      fontSize="sm"
                      bg="rgba(255, 255, 255, 0.03)"
                      color="#CDF683"
                      borderWidth={1}
                      borderColor="#CDF683"
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{
                        bg: "rgba(255, 255, 255, 0.06)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 20px rgba(130, 205, 71, 0.3)"
                      }}
                      onClick={() => {/* Handle upgrade click */}}
                    >
                      <Icon as={FaCrown} />
                      Using limited free plan • Upgrade
                    </Badge>
                    
                    <Flex 
                      align="center" 
                      gap={2}
                      direction="column"
                    >
                      <Box as="span" color="#CDF683">✧</Box>
                      <Heading 
                        color="white" 
                        fontSize="3xl" 
                        textAlign="center"
                      >
                        {getGreeting()}
                      </Heading>
                      <Text 
                        color="whiteAlpha.800" 
                        fontSize="lg"
                        textAlign="center"
                      >
                        {getLateNightMessage()}
                      </Text>
                    </Flex>
                  </VStack>

                  {/* Desktop Cards Layout */}
                  <Box display={{ base: 'none', md: 'block' }} w="100%" px={4}>
                    {/* Two Column Layout for Recent Chats and Saved Messages */}
                    <SimpleGrid columns={2} spacing={6} w="100%" mb={6} display={{ base: 'none', md: 'grid' }}>
                      {/* Recent Chats Card */}
                      <Card
                        bg="whiteAlpha.50"
                        borderColor="whiteAlpha.200"
                        borderWidth={1}
                        _hover={{ 
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(205, 246, 131, 0.15)"
                        }}
                        transition="all 0.2s"
                      >
                        <CardBody>
                          <VStack align="start" spacing={4}>
                            <HStack justify="space-between" width="100%">
                              <HStack color="#CDF683">
                                <Icon as={FiClock} />
                                <Text fontWeight="bold">Recent Chats</Text>
                              </HStack>
                              <Button
                                onClick={onRecentChatsOpen}
                                variant="ghost"
                                size="sm"
                                color="#CDF683"
                                _hover={{
                                  bg: "rgba(205, 246, 131, 0.1)",
                                }}
                              >
                                View All
                              </Button>
                            </HStack>
                            <VStack align="stretch" spacing={3} w="100%">
                              {recentChats.slice(0, 1).map((chat) => (
                                <Box
                                  key={chat.id}
                                  p={3}
                                  bg="whiteAlpha.50"
                                  borderRadius="md"
                                  borderWidth="1px"
                                  borderColor="whiteAlpha.200"
                                  cursor="pointer"
                                  onClick={() => setShowWelcome(false)}
                                  _hover={{
                                    bg: "whiteAlpha.100",
                                    borderColor: "#CDF683"
                                  }}
                                >
                                  <VStack align="start" spacing={2}>
                                    <Text fontWeight="bold" color="white">
                                      {chat.title}
                                    </Text>
                                    <Text fontSize="sm" color="whiteAlpha.700" noOfLines={2}>
                                      {chat.preview}
                                    </Text>
                                    <Text fontSize="xs" color="whiteAlpha.600">
                                      {chat.timestamp}
                                    </Text>
                                  </VStack>
                                </Box>
                              ))}
                            </VStack>
                          </VStack>
                        </CardBody>
                      </Card>

                      {/* Saved Messages Card */}
                      <Card
                        bg="whiteAlpha.50"
                        borderColor="whiteAlpha.200"
                        borderWidth={1}
                        _hover={{ 
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(205, 246, 131, 0.15)"
                        }}
                        transition="all 0.2s"
                      >
                        <CardBody>
                          <VStack align="start" spacing={4}>
                            <HStack justify="space-between" width="100%">
                              <HStack color="#CDF683">
                                <Icon as={BsBookmarkFill} />
                                <Text fontWeight="bold">Saved Messages</Text>
                              </HStack>
                              <Button
                                onClick={onAllSavedOpen}
                                variant="ghost"
                                size="sm"
                                color="#CDF683"
                                _hover={{
                                  bg: "rgba(205, 246, 131, 0.1)",
                                }}
                              >
                                View All
                              </Button>
                            </HStack>
                            <VStack align="stretch" spacing={3} w="100%">
                              {savedMessages.slice(0, 1).map((msg) => (
                                <Box
                                  key={msg.id}
                                  p={3}
                                  bg="whiteAlpha.50"
                                  borderRadius="md"
                                  borderWidth="1px"
                                  borderColor="whiteAlpha.100"
                                  _hover={{
                                    bg: "whiteAlpha.100",
                                    borderColor: "#CDF683"
                                  }}
                                  transition="all 0.2s"
                                  cursor="pointer"
                                  onClick={() => {
                                    setSelectedMessage(msg.content);
                                    onSavedMessageOpen();
                                  }}
                                >
                                  <VStack align="start" spacing={2}>
                                    <Text color="white" noOfLines={2}>
                                      {msg.content}
                                    </Text>
                                    <HStack justify="space-between" width="100%">
                                      <Badge
                                        colorScheme="green"
                                        bg="rgba(205, 246, 131, 0.1)"
                                        color="#CDF683"
                                      >
                                        {msg.topic}
                                      </Badge>
                                      <Text fontSize="xs" color="whiteAlpha.600">
                                        {msg.timestamp}
                                      </Text>
                                    </HStack>
                                  </VStack>
                                </Box>
                              ))}
                            </VStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>

                    {/* AI Features */}
                    <SimpleGrid 
                      columns={{ base: 1, md: 2 }} 
                      spacing={4}
                      display={{ base: 'none', md: 'grid' }}
                    >
                      {aiFeatures.map((feature) => (
                        <MotionCard
                          key={feature.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          bgGradient={feature.gradient}
                          borderRadius="xl"
                          overflow="hidden"
                          _hover={{ transform: 'translateY(-5px)' }}
                        >
                          <CardBody>
                            <VStack align="start" spacing={4}>
                              <HStack spacing={3}>
                                <Text fontSize="2xl">{feature.icon}</Text>
                                <Heading size="md" color={feature.titleColor} fontWeight="bold">
                                  {feature.title}
                                </Heading>
                              </HStack>
                              <Text color="gray.800">
                                {feature.description}
                              </Text>
                              <SimpleGrid columns={2} spacing={2} w="full">
                                {feature.actions.map((action, idx) => (
                                  <Badge
                                    key={idx}
                                    bg="whiteAlpha.200"
                                    color="white"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                    fontSize="sm"
                                  >
                                    {action}
                                  </Badge>
                                ))}
                              </SimpleGrid>
                            </VStack>
                          </CardBody>
                        </MotionCard>
                      ))}
                    </SimpleGrid>
                  </Box>

                  {/* Mobile Cards Layout */}
                  <Box display={{ base: 'block', md: 'none' }} w="100%" px={4} position="fixed" top="0" right="0" p={4} zIndex={2}>
                    <VStack spacing={4} align="flex-end">
                      <HStack spacing={2}>
                        <IconButton
                          aria-label="Recent Chats"
                          icon={<BsClock />}
                          onClick={() => setShowMobileCards(true)}
                          variant="solid"
                          colorScheme="whiteAlpha"
                          size="sm"
                        />
                        <IconButton
                          aria-label="Saved Messages"
                          icon={<BsBookmark />}
                          onClick={() => setShowSavedMessages(true)}
                          variant="solid"
                          colorScheme="whiteAlpha"
                          size="sm"
                        />
                      </HStack>
                    </VStack>
                  </Box>
                </VStack>
              )}
              {!showWelcome && (
                // Chat screen content
                <VStack spacing={4} align="stretch" width="100%" position="relative">
                  {/* Back button and menu button container */}
                  <Box
                    position="fixed"
                    top={0}
                    left={0}
                    right={0}
                    py={{ base: 3, md: 4 }}
                    px={{ base: 4, md: 6 }}
                    bg="rgba(0, 0, 0, 0.3)"
                    backdropFilter="blur(10px)"
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.200"
                    zIndex={1000}
                  >
                    <Container maxW="container.xl">
                      <HStack justify="space-between" align="center">
                        <IconButton
                          aria-label="Back to welcome"
                          icon={<BsArrowLeft />}
                          onClick={handleBackToHome}
                          variant="ghost"
                          color="#CDF683"
                          _hover={{
                            bg: "rgba(205, 246, 131, 0.1)",
                            transform: "translateX(-5px)"
                          }}
                          transition="all 0.2s"
                        />
                        {/* Menu button for mobile */}
                        <IconButton
                          aria-label="Show menu"
                          icon={<BsThreeDotsVertical />}
                          onClick={() => setShowMobileOverlay(true)}
                          variant="ghost"
                          color="#CDF683"
                          display={{ base: 'flex', md: 'none' }}
                          _hover={{
                            bg: "rgba(205, 246, 131, 0.1)",
                          }}
                        />
                      </HStack>
                    </Container>
                  </Box>

                  {/* Chat messages container */}
                  <Box
                    ref={chatContainerRef}
                    flex={1}
                    width="100%"
                    position="relative"
                    mt="60px"
                    maxH="calc(100vh - 180px)"
                    overflowY="auto"
                    css={{
                      '&::-webkit-scrollbar': {
                        display: 'none'
                      },
                      'msOverflowStyle': 'none',
                      'scrollbarWidth': 'none'
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
                                    aria-label={isMessageSaved(message.content) ? "Unsave message" : "Save message"}
                                    icon={<Icon as={isMessageSaved(message.content) ? BsBookmarkFill : BsBookmark} />}
                                    size="sm"
                                    variant="ghost"
                                    color="#CDF683"
                                    _hover={{
                                      bg: "rgba(205, 246, 131, 0.1)",
                                      transform: "scale(1.1)"
                                    }}
                                    onClick={() => handleSaveMessage(message.content)}
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

                  {/* Floating button for mobile */}
                  <IconButton
                    aria-label="Scroll to bottom"
                    icon={<BsArrowLeft style={{ transform: 'rotate(-90deg)' }} />}
                    position="fixed"
                    bottom={{ base: "80px", md: "120px" }}
                    right={4}
                    colorScheme="green"
                    bg="#CDF683"
                    color="black"
                    rounded="full"
                    size="lg"
                    shadow="lg"
                    zIndex={2000}
                    onClick={scrollToBottom}
                    display={showScrollButton ? { base: 'flex', md: 'none' } : 'none'}
                    opacity={0.8}
                    _hover={{ opacity: 1 }}
                  />
                </VStack>
              )}
            </VStack>

            {/* Input Container */}
            <Box
              position="fixed"
              bottom={0}
              left={0}
              right={0}
              zIndex={1000}
            >
              <ChatInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default TreeChat;
