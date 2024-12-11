import { Box, VStack, Text, Button, IconButton, Icon, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useToast, Container, Flex, Avatar, SimpleGrid, Card, CardBody, Badge, Heading, Divider } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsStars, BsSend, BsThreeDotsVertical, BsFileText, BsTable, BsPeople, BsArrowLeft, BsBookmark, BsBookmarkFill, BsClock, BsGear, BsCreditCard, BsPersonCircle, BsList, BsX, BsQuestionCircle } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
import { useRef, useState, useEffect, useCallback } from 'react';
import TechTreeBackground from '../components/common/TechTreeBackground/TechTreeBackground';
import { keyframes } from '@emotion/react';
import { FaUser, FaRobot, FaCrown, FaList, FaCog, FaHistory, FaPalette, FaBell } from 'react-icons/fa';
import chatService, { Message } from '../services/chatService';
import { ChatInput } from '../components/tree-chat/ChatInput';
import { Sidebar } from '../components/tree-chat/Sidebar';

const MotionCard = motion(Card);

const typingAnimation = keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`;

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 50,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      delay: i * 0.1
    }
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      delay: i * 0.1
    }
  })
};

const TreeChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitEndTime, setRateLimitEndTime] = useState<Date | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showMobileOverlay, setShowMobileOverlay] = useState(false);
  const [selectedMode, setSelectedMode] = useState('default');
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 1024);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const handleBackToHome = useCallback(() => {
    setShowWelcome(true);
    setSelectedMode('default');
    setMessages([]);
    setInputValue('');
  }, []);

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
      id: 'default',
      title: "General Chat",
      description: "Versatile AI assistance for any topic",
      icon: "🤖",
      gradient: "linear(to-r, #4FACFE, #00F2FE)",
      titleColor: "gray.800",
      actions: ["Ask questions", "Get help", "Learn new things"]
    },
    {
      id: 'creative',
      title: "Creative",
      description: "More creative and imaginative responses",
      icon: "🧠",
      gradient: "linear(to-r, #43E97B, #38F9D7)",
      titleColor: "gray.900",
      actions: ["Generate ideas", "Creative writing", "Brainstorming"]
    },
    {
      id: 'tutor',
      title: "Tutor",
      description: "Focused on teaching and explaining concepts",
      icon: "👨‍🏫",
      gradient: "linear(to-r, #FF9A9E, #FAD0C4)",
      titleColor: "gray.800",
      actions: ["Learn concepts", "Get explanations", "Practice"]
    },
    {
      id: 'coder',
      title: "Coder",
      description: "Specialized in programming and technical tasks",
      icon: "💻",
      gradient: "linear(to-r, #764BA2, #667EEA)",
      titleColor: "gray.900",
      actions: ["Debug code", "Explain code", "Get solutions"]
    },
    {
      id: 'writer',
      title: "Writer",
      description: "Helps with writing and content creation",
      icon: "✍️",
      gradient: "linear(to-r, #F6D365, #FDA085)",
      titleColor: "gray.800",
      actions: ["Write content", "Edit text", "Get ideas"]
    },
    {
      id: 'analyst',
      title: "Analyst",
      description: "Focused on data analysis and insights",
      icon: "📊",
      gradient: "linear(to-r, #A8BFFF, #884D80)",
      titleColor: "gray.900",
      actions: ["Analyze data", "Get insights", "Make reports"]
    },
    {
      id: 'gamer',
      title: "Gaming",
      description: "Helps with game strategies and character builds",
      icon: "🎮",
      gradient: "linear(to-r, #FFA62E, #EA4D2C)",
      titleColor: "gray.800",
      actions: ["Game guides", "Character builds", "Strategy help"]
    },
    {
      id: 'designer',
      title: "Designer",
      description: "Generate architectural & interior design images",
      icon: "🎨",
      gradient: "linear(to-r, #FF3CAC, #784BA0)",
      titleColor: "gray.900",
      actions: ["Design spaces", "Generate ideas", "Get inspiration"]
    },
    {
      id: 'education',
      title: "Education",
      description: "Interactive learning and study assistance",
      icon: "📚",
      gradient: "linear(to-r, #B465DA, #CF6CC9)",
      titleColor: "gray.800",
      actions: ["Study help", "Practice exercises", "Learn concepts"]
    }
  ];

  const modes = aiFeatures;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      // setShowScrollButton(!isNearBottom);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activeTab, setActiveTab] = useState<'history' | 'saved'>('history');
  const [savedMessages, setSavedMessages] = useState([
    {
      id: 1,
      content: "Here's how to implement a binary search tree...",
      timestamp: "1 day ago",
      topic: "Data Structures"
    },
    {
      id: 2,
      content: "The key principles of React hooks are...",
      timestamp: "2 days ago",
      topic: "React"
    },
    {
      id: 3,
      content: "To optimize your database queries, consider...",
      timestamp: "3 days ago",
      topic: "Database"
    }
  ]);

  const handleSaveMessage = (message: string, topic: string = "General") => {
    setSavedMessages(prev => [{
      id: prev.length + 1,
      content: message,
      timestamp: "Just now",
      topic
    }, ...prev]);
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

      {/* Top Bar with History Button */}
      <Box
        position="fixed"
        top={0}
        right={0}
        p={4}
        zIndex={50}
        pointerEvents="auto"
      >
        <IconButton
          aria-label="View Chats"
          icon={<Icon as={BsClock} boxSize={5} />}
          onClick={() => onModalOpen()}
          bg="rgba(205, 246, 131, 0.1)"
          _hover={{ bg: 'rgba(205, 246, 131, 0.2)' }}
          color="#CDF683"
          size="lg"
          borderWidth="1px"
          borderColor="rgba(205, 246, 131, 0.3)"
          borderRadius="xl"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
          transition="all 0.2s"
        />
      </Box>

      {/* Main Content Area */}
      <Box
        flex={1}
        position="relative"
        height="100vh"
        overflowY="auto"
        zIndex={5}
      >
        <Container 
          maxW={{ base: "100%", md: "4xl", lg: "6xl" }}
          h="100%"
          mx="auto"
          px={{ base: 4, md: 8 }}
        >
          <Flex direction="column" h="100%" position="relative">
            <VStack spacing={8} align="stretch" width="100%" flex={1}>
              {showWelcome && (
                // Welcome screen content
                <VStack spacing={8} align="stretch" pt={8}>
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
                      onClick={onModalOpen}
                      display="none"
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
                        <Icon as={FiClock} color="#CDF683" boxSize={4} />
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
                  <Box 
                    display={{ base: 'none', md: 'block' }} 
                    w="100%" 
                    px={4}
                    h="calc(100vh - 250px)"
                    overflow="hidden"
                  >
                    {/* AI Features */}
                    <SimpleGrid 
                      columns={{ base: 1, md: 3, lg: 3 }} 
                      spacing={2}
                      h="100%"
                    >
                      {aiFeatures.map((feature, index) => (
                        <MotionCard
                          key={feature.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          bgGradient={feature.gradient}
                          borderRadius="xl"
                          overflow="hidden"
                          _hover={{ 
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 16px -6px rgba(0, 0, 0, 0.3)'
                          }}
                          transition="all 0.3s ease"
                          position="relative"
                          minH="160px"
                          maxH="180px"
                        >
                          <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            bg="blackAlpha.100"
                            opacity={0.7}
                            pointerEvents="none"
                          />
                          <CardBody position="relative" zIndex={1} py={4} px={5}>
                            <VStack align="start" spacing={3}>
                              <HStack spacing={2} justify="space-between" width="full">
                                <HStack>
                                  <Text fontSize="xl">{feature.icon}</Text>
                                  <Text 
                                    fontSize="lg" 
                                    fontWeight="bold" 
                                    color={feature.titleColor}
                                    fontFamily="'Space Grotesk', sans-serif"
                                    letterSpacing="tight"
                                  >
                                    {feature.title}
                                  </Text>
                                </HStack>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  color={feature.titleColor}
                                  p={1}
                                  height="auto"
                                  minW="auto"
                                  _hover={{
                                    bg: "blackAlpha.200"
                                  }}
                                  onClick={() => {
                                    setShowWelcome(false);
                                    setSelectedMode(feature.id);
                                  }}
                                >
                                  <Icon as={BsQuestionCircle} boxSize={4} />
                                </Button>
                              </HStack>
                              <Text 
                                fontSize="sm" 
                                color="black" 
                                noOfLines={2}
                                fontFamily="'Inter', sans-serif"
                                letterSpacing="wide"
                              >
                                {feature.description}
                              </Text>
                              <Flex wrap="wrap" gap={2} mt={1}>
                                {feature.actions.map((action, idx) => (
                                  <Badge
                                    key={idx}
                                    fontSize="xs"
                                    color="black"
                                    bg="blackAlpha.200"
                                    px={2}
                                    py={1}
                                    borderRadius="md"
                                    fontFamily="'Inter', sans-serif"
                                    fontWeight="medium"
                                    letterSpacing="wide"
                                  >
                                    {action}
                                  </Badge>
                                ))}
                              </Flex>
                            </VStack>
                          </CardBody>
                        </MotionCard>
                      ))}
                    </SimpleGrid>
                  </Box>

                  {/* Mobile Cards Layout */}
                  {/* Removed duplicate mobile buttons */}
                </VStack>
              )}
              {!showWelcome && (
                // Chat screen content
                <VStack spacing={4} align="stretch" width="100%" position="relative">
                  {/* Chat messages container */}
                  <Box
                    position="relative"
                    h="calc(100vh - 80px)"
                    overflow="hidden"
                  >
                    {/* Back Button */}
                    <Box
                      position="fixed"
                      top={4}
                      left="304px"
                      zIndex={50}
                      pointerEvents="auto"
                    >
                      <IconButton
                        aria-label="Back to topics"
                        icon={<Icon as={BsArrowLeft} boxSize={5} />}
                        onClick={() => {
                          setShowWelcome(true);
                          setSelectedMode('default');
                          setMessages([]);
                          setInputValue('');
                        }}
                        variant="ghost"
                        color="#CDF683"
                        _hover={{
                          bg: "rgba(205, 246, 131, 0.1)",
                          transform: "translateX(-5px)"
                        }}
                        transition="all 0.2s"
                      />
                    </Box>

                    <Box
                      ref={chatContainerRef}
                      overflowY="auto"
                      h="100%"
                      pb={24}
                      pt={16}
                      px={4}
                      css={{
                        '&::-webkit-scrollbar': {
                          width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                          background: 'transparent',
                        },
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
                  </Box>
                </VStack>
              )}
            </VStack>
          </Flex>
        </Container>

        {/* Input Container */}
        <Box
          position="fixed"
          bottom={0}
          left="304px"
          right={0}
          zIndex={50}
        >
          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            selectedMode={selectedMode}
            onModeChange={mode => setSelectedMode(mode)}
            onKeyPress={handleKeyPress}
            inputRef={inputRef}
          />
        </Box>
      </Box>

      {/* Sidebar Container */}
      <Box
        position="fixed"
        left={0}
        top={0}
        height="100vh"
        width="100vw"
        pointerEvents="none"
        zIndex={40}
      >
        <Box
          position="absolute"
          left={0}
          top={0}
          height="100%"
          width={{ base: "270px", lg: "300px" }}
          pointerEvents={isSidebarOpen ? "auto" : "none"}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </Box>
      </Box>

      {/* Reopen Sidebar Button */}
      <Box
        position="fixed"
        left={4}
        top={4}
        width="48px"
        height="48px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={45}
        pointerEvents={isSidebarOpen ? "none" : "auto"}
        opacity={isSidebarOpen ? 0 : 1}
        transition="opacity 0.3s ease-in-out"
      >
        <IconButton
          aria-label="Open Sidebar"
          icon={<Icon as={BsList} boxSize={5} />}
          onClick={() => setIsSidebarOpen(true)}
          bg="rgba(205, 246, 131, 0.1)"
          _hover={{ bg: 'rgba(205, 246, 131, 0.2)' }}
          color="#CDF683"
          size="lg"
          borderWidth="1px"
          borderColor="rgba(205, 246, 131, 0.3)"
          borderRadius="xl"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
          transition="all 0.2s"
        />
      </Box>

      {/* Chat History Modal */}
      <Modal isOpen={isModalOpen} onClose={onModalClose} size="xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent
          bg="rgba(0, 0, 0, 0.8)"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="rgba(205, 246, 131, 0.2)"
          boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
          mx={4}
        >
          <ModalHeader color="whiteAlpha.900" pb={0}>Message History</ModalHeader>
          <ModalCloseButton color="whiteAlpha.600" />
          <ModalBody pb={6}>
            <HStack spacing={4} mb={4}>
              <Button
                variant={activeTab === 'history' ? 'solid' : 'ghost'}
                onClick={() => setActiveTab('history')}
                color="#CDF683"
                bg={activeTab === 'history' ? "rgba(205, 246, 131, 0.1)" : "transparent"}
                _hover={{
                  bg: "rgba(205, 246, 131, 0.2)"
                }}
              >
                <HStack>
                  <Icon as={BsClock} />
                  <Text>Recent Chats</Text>
                </HStack>
              </Button>
              <Button
                variant={activeTab === 'saved' ? 'solid' : 'ghost'}
                onClick={() => setActiveTab('saved')}
                color="#CDF683"
                bg={activeTab === 'saved' ? "rgba(205, 246, 131, 0.1)" : "transparent"}
                _hover={{
                  bg: "rgba(205, 246, 131, 0.2)"
                }}
              >
                <HStack>
                  <Icon as={BsBookmark} />
                  <Text>Saved Messages</Text>
                </HStack>
              </Button>
            </HStack>

            <VStack spacing={4} align="stretch">
              {activeTab === 'history' ? (
                // Recent Chats
                recentChats.map((chat, index) => (
                  <Box
                    key={index}
                    p={4}
                    bg="rgba(205, 246, 131, 0.05)"
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="rgba(205, 246, 131, 0.1)"
                    _hover={{
                      borderColor: "rgba(205, 246, 131, 0.3)",
                      transform: "translateY(-2px)",
                      cursor: "pointer"
                    }}
                    transition="all 0.2s"
                  >
                    <VStack align="start" spacing={2}>
                      <Text color="whiteAlpha.900" fontWeight="bold">{chat.title}</Text>
                      <Text color="whiteAlpha.700" fontSize="sm">{chat.preview}</Text>
                      <Text color="whiteAlpha.500" fontSize="xs">{chat.timestamp}</Text>
                    </VStack>
                  </Box>
                ))
              ) : (
                // Saved Messages
                savedMessages.map((msg, index) => (
                  <Box
                    key={index}
                    p={4}
                    bg="rgba(205, 246, 131, 0.05)"
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="rgba(205, 246, 131, 0.1)"
                    _hover={{
                      borderColor: "rgba(205, 246, 131, 0.3)",
                      transform: "translateY(-2px)",
                      cursor: "pointer"
                    }}
                    transition="all 0.2s"
                  >
                    <VStack align="start" spacing={2}>
                      <HStack justify="space-between" width="100%">
                        <Badge
                          colorScheme="green"
                          bg="rgba(205, 246, 131, 0.1)"
                          color="#CDF683"
                        >
                          {msg.topic}
                        </Badge>
                        <Text color="whiteAlpha.500" fontSize="xs">{msg.timestamp}</Text>
                      </HStack>
                      <Text color="whiteAlpha.900">{msg.content}</Text>
                    </VStack>
                  </Box>
                ))
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TreeChat;
