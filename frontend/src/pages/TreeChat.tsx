import { Box, VStack, Text, Button, IconButton, Icon, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useToast, Tooltip, Container, Flex, Input, Avatar, Menu, MenuButton, MenuList, MenuItem, Divider, SimpleGrid, Card, CardBody, Badge, Heading, InputGroup, InputRightElement } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsTrash, BsStars, BsSend, BsThreeDotsVertical, BsCopy, BsDownload, BsClock, BsX, BsFileText, BsTable, BsPeople, BsArrowLeft, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { IoRefreshOutline } from 'react-icons/io5';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import { useRef, useState, useEffect, useCallback } from 'react';
import TechTreeBackground from '../components/common/TechTreeBackground/TechTreeBackground';
import { keyframes } from '@emotion/react';
import { FaUser, FaRobot, FaFileUpload, FaCamera, FaPaperPlane, FaCrown } from 'react-icons/fa';
import chatService, { Message } from '../services/chatService';

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

  const recentChats = [
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
  ];

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

  const popularTopics = [
    {
      id: 1,
      title: "How to make pasta carbonara? ",
      icon: FiClock,
      gradient: "linear(to-r, #FF6B6B, #FF8E8E)"
    },
    {
      id: 2,
      title: "Best places to visit in Japan ",
      icon: FiClock,
      gradient: "linear(to-r, #4FACFE, #00F2FE)"
    },
    {
      id: 3,
      title: "How to start working out at home? ",
      icon: FiClock,
      gradient: "linear(to-r, #43E97B, #38F9D7)"
    },
    {
      id: 4,
      title: "Tips for better sleep ",
      icon: FiClock,
      gradient: "linear(to-r, #FA709A, #FEE140)"
    }
  ];

  const limeGreenColors = {
    primary: "#CDF683",
    darker: "#65a234",
    lighter: "#9ed368",
    gradient: 'linear-gradient(135deg, #CDF683 0%, #65a234 100%)',
    glowShadow: '0 4px 20px rgba(130, 205, 71, 0.3)',
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

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

      // Get response from API
      const response = await chatService.sendMessage(userMessage.content);
      setMessages(prev => [...prev, response]);
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

  const WelcomeContent = () => (
    <Box textAlign="center" mb={2}>
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
    </Box>
  );

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

      {/* Content wrapper */}
      <Box position="relative" zIndex={2}>
        {/* Saved Messages Overlay */}
        <Modal isOpen={isAllSavedOpen} onClose={onAllSavedClose} size="4xl" motionPreset="slideInBottom">
          <ModalOverlay 
            bg="blackAlpha.700" 
            backdropFilter="blur(10px)"
          />
          <ModalContent 
            bg="rgba(0, 0, 0, 0.8)"
            maxH="85vh"
            boxShadow="dark-lg"
            mx={4}
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            backdropFilter="blur(16px)"
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
                background: 'rgba(0,0,0,0.1)',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(205, 246, 131, 0.5)',
                borderRadius: '24px',
              },
            }}
          >
            <ModalHeader 
              color="#CDF683"
              fontSize="xl" 
              fontWeight="bold"
              borderBottom="1px solid"
              borderColor="whiteAlpha.200"
              pb={4}
            >
              <HStack color="#CDF683">
                <Icon as={BsBookmarkFill} />
                <Text fontWeight="bold">
                  Saved Messages
                </Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody py={6}>
              <VStack spacing={4} align="stretch" w="100%">
                {savedMessages.map((msg) => (
                  <Box
                    key={msg.id}
                    p={4}
                    bg="whiteAlpha.50"
                    borderRadius="lg"
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
                      <HStack justify="space-between" width="100%">
                        <Badge
                          colorScheme="green"
                          bg="rgba(205, 246, 131, 0.1)"
                          color="#CDF683"
                          px={2}
                          py={1}
                          borderRadius="full"
                        >
                          {msg.topic}
                        </Badge>
                        <HStack>
                          <Text fontSize="xs" color="whiteAlpha.600">
                            {msg.timestamp}
                          </Text>
                          <IconButton
                            aria-label="Remove saved message"
                            icon={<Icon as={BsTrash} />}
                            size="xs"
                            variant="ghost"
                            color="red.300"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSavedMessages(prev => prev.filter(m => m.id !== msg.id));
                              toast({
                                title: "Message removed",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                              });
                            }}
                            _hover={{
                              bg: "rgba(255, 69, 58, 0.1)",
                              color: "red.400"
                            }}
                          />
                        </HStack>
                      </HStack>
                      <Text fontSize="sm" color="whiteAlpha.900" lineHeight="1.6">
                        {msg.content}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Container 
          maxW="container.xl" 
          py={{ base: 2, md: 4 }}
          px={{ base: 2, md: 6 }}
          h="calc(100vh - 80px)"  
        >
          <Flex direction="column" h="100%" py={2}>  
            <VStack 
              spacing={8} 
              align="stretch" 
              w="100%"
              h={{ base: "100vh", md: "calc(100vh - 140px)" }}
              justify={{ base: "center", md: "flex-start" }}
              pt={{ base: 0, md: 2 }}
            >
              {showWelcome ? (
                <VStack spacing={2} flex="1" w="100%" position="relative">
                  {/* Glassy Background Card */}
                  <Box
                    position="absolute"
                    top={-8}
                    left={{ base: -8, md: -16 }}
                    right={{ base: -8, md: -16 }}
                    bottom={-25}
                    bg="rgba(0, 0, 0, 0.3)"
                    borderRadius="2xl"
                    borderWidth="1px"
                    borderColor="whiteAlpha.100"
                    backdropFilter="blur(10px)"
                    boxShadow="dark-lg"
                    overflow="hidden"
                    zIndex={0}
                  />
                  
                  {/* Main Content */}
                  <Flex
                    direction="column"
                    flex="1"
                    p={{ base: 6, md: 6 }}
                    position="relative"
                    zIndex={1}
                    w="100%"
                  >
                    <VStack spacing={6} w="100%" align="stretch">
                      {/* Badge and Greeting */}
                      <VStack 
                        spacing={4} 
                        align="center" 
                        w="100%"
                        minH={{ base: "calc(100vh - 200px)", md: "auto" }}
                        justify={{ base: "center", md: "flex-start" }}
                      >
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

                      {/* Cards Section - Hidden on mobile by default */}
                      <Box 
                        display={{ base: showMobileCards ? 'block' : 'none', md: 'block' }}
                        w="100%" 
                        position={{ base: 'fixed', md: 'relative' }}
                        top={{ base: 0, md: 'auto' }}
                        left={{ base: 0, md: 'auto' }}
                        right={{ base: 0, md: 'auto' }}
                        bottom={{ base: 0, md: 'auto' }}
                        bg={{ base: 'rgba(0, 0, 0, 0.95)', md: 'transparent' }}
                        zIndex={{ base: 1000, md: 1 }}
                        overflowY={{ base: 'auto', md: 'visible' }}
                        pb="35px"
                        px={{ base: 4, md: 0 }}
                      >
                        {/* Recent Chats Section */}
                        <Box w="100%" px={4} pt={{ base: 16, md: 0 }}>
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
                                    onClick={onRecentChatsOpen}
                                    variant="ghost"
                                    size="sm"
                                    color="#CDF683"
                                    _hover={{
                                      bg: "rgba(205, 246, 131, 0.1)",
                                      transform: "translateX(-5px)"
                                    }}
                                    transition="all 0.3s"
                                    pl={4}
                                    pr={6}
                                    borderRadius="full"
                                    bgGradient="linear(to-r, rgba(205, 246, 131, 0.1), transparent)"
                                  >
                                    View All
                                  </Button>
                                </HStack>
                                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} w="100%">
                                  {recentChats.map((chat) => (
                                    <Box
                                      key={chat.id}
                                      p={4}
                                      bg="whiteAlpha.50"
                                      borderRadius="lg"
                                      borderWidth="1px"
                                      borderColor="whiteAlpha.200"
                                      cursor="pointer"
                                      _hover={{
                                        bg: "whiteAlpha.100",
                                        borderColor: "#CDF683"
                                      }}
                                      transition="all 0.2s"
                                      onClick={() => setShowWelcome(false)}
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
                                </SimpleGrid>
                              </VStack>
                            </CardBody>
                          </Card>
                        </Box>

                        {/* Saved Messages and Popular Topics Cards */}
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} px={4} w="100%" mt={4} mb={0}> 
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
                          >
                            <CardBody>
                              <VStack align="start" spacing={4}>
                                <HStack justify="space-between" align="center" width="100%" mb={4}>
                                  <HStack color="#CDF683">
                                    <Icon as={BsBookmarkFill} />
                                    <Text fontWeight="bold">
                                      Saved Messages
                                    </Text>
                                  </HStack>
                                  <Button
                                    onClick={onAllSavedOpen}
                                    variant="ghost"
                                    size="sm"
                                    color="#CDF683"
                                    _hover={{
                                      bg: "rgba(205, 246, 131, 0.1)",
                                      transform: "translateX(-5px)"
                                    }}
                                    transition="all 0.3s"
                                    pl={4}
                                    pr={6}
                                    borderRadius="full"
                                    bgGradient="linear(to-r, rgba(205, 246, 131, 0.1), transparent)"
                                  >
                                    View All
                                  </Button>
                                </HStack>
                                <VStack align="stretch" spacing={3} w="100%">
                                  {savedMessages.slice(0, 3).map((msg) => (
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
                                      <VStack align="start" spacing={1}>
                                        <HStack justify="space-between" width="100%">
                                          <Text fontSize="sm" fontWeight="bold" color="white">
                                            {msg.topic}
                                          </Text>
                                          <Text fontSize="xs" color="whiteAlpha.600">
                                            {msg.timestamp}
                                          </Text>
                                        </HStack>
                                        <Text fontSize="sm" color="whiteAlpha.800" noOfLines={2}>
                                          {msg.content}
                                        </Text>
                                      </VStack>
                                    </Box>
                                  ))}
                                </VStack>
                              </VStack>
                            </CardBody>
                          </Card>

                          {/* Popular Topics Card */}
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
                              <VStack align="start" spacing={4}>
                                <HStack color="#CDF683">
                                  <Icon as={FiClock} />
                                  <Text fontWeight="bold">Popular Topics</Text>
                                </HStack>
                                <VStack align="stretch" spacing={2} w="100%">
                                  {popularTopics.map((topic, index) => (
                                    <Box
                                      key={index}
                                      bg="whiteAlpha.50"
                                      borderRadius="lg"
                                      borderWidth="1px"
                                      borderColor="whiteAlpha.100"
                                      transition="all 0.2s"
                                      _hover={{
                                        bg: "whiteAlpha.100",
                                        borderColor: "whiteAlpha.200",
                                        transform: "translateX(4px)"
                                      }}
                                      cursor="pointer"
                                      onClick={() => setInputValue(`Tell me about ${topic.title}`)}
                                    >
                                      <HStack spacing={3} p={3}>
                                        <Icon 
                                          as={FiClock} 
                                          color="whiteAlpha.700" 
                                          boxSize={4}
                                        />
                                        <Text 
                                          fontSize="sm" 
                                          color="white"
                                          fontWeight="medium"
                                        >
                                          {topic.title}
                                        </Text>
                                      </HStack>
                                    </Box>
                                  ))}
                                </VStack>
                              </VStack>
                            </CardBody>
                          </Card>
                        </SimpleGrid>
                      </Box>
                    </VStack>
                  </Flex>
                </VStack>
              ) : (
                <VStack spacing={2} flex="1" w="100%" position="relative">
                  {/* Glassy Background Card */}
                  <Box
                    position="absolute"
                    top={-8}
                    left={{ base: -8, md: -16 }}
                    right={{ base: -8, md: -16 }}
                    bottom={-25}
                    bg="rgba(0, 0, 0, 0.3)"
                    borderRadius="2xl"
                    borderWidth="1px"
                    borderColor="whiteAlpha.100"
                    backdropFilter="blur(10px)"
                    boxShadow="dark-lg"
                    overflow="hidden"
                    zIndex={0}
                  />
                  
                  {/* Chat Content */}
                  <Flex
                    direction="column"
                    flex="1"
                    p={{ base: 6, md: 6 }}
                    position="relative"
                    zIndex={1}
                    w="100%"
                  >
                    <VStack spacing={6} w="100%" align="stretch">
                      {/* Back Button and Messages */}
                      <Box w="100%" mb={2}>
                        <Button
                          leftIcon={<Icon as={BsArrowLeft} />}
                          variant="ghost"
                          color="#CDF683"
                          onClick={handleBackToHome}
                          _hover={{
                            bg: "rgba(205, 246, 131, 0.1)",
                            transform: "translateX(-5px)"
                          }}
                          transition="all 0.3s"
                          position="relative"
                          pl={4}
                          pr={6}
                          borderRadius="full"
                          bgGradient="linear(to-r, rgba(205, 246, 131, 0.1), transparent)"
                          float="right"
                        >
                          Back
                        </Button>
                      </Box>
                      
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
                          mb={4}
                          backdropFilter="blur(8px)"
                          boxShadow="lg"
                          _hover={{
                            transform: "translateY(-2px)",
                            boxShadow: "xl",
                          }}
                          transition="all 0.2s"
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
                      
                      {/* AI Typing Indicator */}
                      {isLoading && (
                        <Box position="relative" w="100%" h="2px" mt={4}>
                          <Box
                            position="absolute"
                            h="2px"
                            bg="#CDF683"
                            animation={loadingLineAnimation}
                          />
                        </Box>
                      )}
                      <div ref={messagesEndRef} />
                    </VStack>
                  </Flex>
                </VStack>
              )}
            </VStack>

            {/* Floating Input Card */}
            <Box
              position="fixed"
              bottom={0}
              left={0}
              right={0}
              py={4}
              px={{ base: 4, md: 6 }}
              bg="transparent"
              backdropFilter="blur(10px)"
              borderTop="1px solid"
              borderColor="whiteAlpha.100"
              style={{
                position: '-webkit-sticky',
                WebkitTransform: 'translate3d(0,0,0)',
                zIndex: 1000
              }}
            >
              <Container maxW="container.xl">
                <Flex align="center">
                  <InputGroup size="lg" flex={1}>
                    <Input
                      placeholder={isRateLimited ? `Please wait ${formatTimeRemaining(rateLimitEndTime!)}...` : "How can Tree AI help you today?"}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      bg="rgba(255, 255, 255, 0.03)"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      _hover={{
                        borderColor: "whiteAlpha.300",
                        bg: "rgba(255, 255, 255, 0.05)"
                      }}
                      _focus={{
                        borderColor: "#CDF683",
                        boxShadow: "0 0 0 1px #CDF683"
                      }}
                      color="white"
                      _placeholder={{ color: "whiteAlpha.500" }}
                      style={{
                        WebkitAppearance: 'none',
                        fontSize: '16px'
                      }}
                    />
                  </InputGroup>
                  
                  {/* Action Buttons */}
                  <HStack spacing={2} ml={4} display={{ base: "none", md: "flex" }}>
                    <AnimatePresence mode="wait">
                      {!inputValue && (
                        <MotionBox
                          key="default-actions"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <HStack spacing={2}>
                            <IconButton
                              aria-label="Upload file"
                              icon={<FaFileUpload />}
                              variant="ghost"
                              colorScheme="whiteAlpha"
                              _hover={{ bg: "whiteAlpha.200" }}
                              onClick={() => {/* Handle file upload */}}
                            />
                            <IconButton
                              aria-label="Take photo"
                              icon={<FaCamera />}
                              variant="ghost"
                              colorScheme="whiteAlpha"
                              _hover={{ bg: "whiteAlpha.200" }}
                              onClick={() => {/* Handle camera */}}
                            />
                          </HStack>
                        </MotionBox>
                      )}
                      {inputValue && (
                        <MotionBox
                          key="send-button"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <IconButton
                            aria-label="Send message"
                            icon={<FaPaperPlane />}
                            colorScheme="green"
                            variant="solid"
                            bg="#CDF683"
                            color="black"
                            _hover={{ bg: "#CDF683" }}
                            onClick={handleSendMessage}
                            isLoading={isLoading}
                            isDisabled={!inputValue.trim() || isRateLimited}
                          />
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </HStack>
                  
                  {/* Mobile Action Buttons */}
                  <Box display={{ base: "block", md: "none" }} ml={2}>
                    <AnimatePresence mode="wait">
                      {!inputValue && (
                        <MotionBox
                          key="mobile-default-actions"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <HStack spacing={2}>
                            <IconButton
                              aria-label="Upload file"
                              icon={<FaFileUpload />}
                              variant="ghost"
                              colorScheme="whiteAlpha"
                              _hover={{ bg: "whiteAlpha.200" }}
                              onClick={() => {/* Handle file upload */}}
                            />
                            <IconButton
                              aria-label="Take photo"
                              icon={<FaCamera />}
                              variant="ghost"
                              colorScheme="whiteAlpha"
                              _hover={{ bg: "whiteAlpha.200" }}
                              onClick={() => {/* Handle camera */}}
                            />
                          </HStack>
                        </MotionBox>
                      )}
                      {inputValue && (
                        <MotionBox
                          key="mobile-send"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <IconButton
                            aria-label="Send message"
                            icon={<FaPaperPlane />}
                            colorScheme="green"
                            variant="solid"
                            bg="#CDF683"
                            color="black"
                            _hover={{ bg: "#CDF683" }}
                            onClick={handleSendMessage}
                            isLoading={isLoading}
                            isDisabled={!inputValue.trim() || isRateLimited}
                          />
                        </MotionBox>
                      )}
                    </AnimatePresence>
                  </Box>
                </Flex>
              </Container>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Chat Toggle Button */}
      <Button
        onClick={() => setShowMobileCards(!showMobileCards)}
        variant="ghost"
        position="fixed"
        top={{ base: "16px", md: "24px" }}
        right={{ base: "16px", md: "24px" }}
        size="md"
        colorScheme="green"
        bg={showMobileCards ? "rgba(0, 0, 0, 0.3)" : "#CDF683"}
        color={showMobileCards ? "white" : "black"}
        boxShadow="lg"
        _hover={{ transform: "scale(1.05)", bg: showMobileCards ? "rgba(0, 0, 0, 0.4)" : "#bfe572" }}
        display={{ base: showWelcome ? "flex" : "none", md: "none" }}
        zIndex={1000}
        fontWeight="600"
      >
        {showMobileCards ? (
          <Icon as={BsX} boxSize={4} />
        ) : (
          <HStack spacing={2}>
            <Icon as={FiClock} />
            <Text>Chats</Text>
          </HStack>
        )}
      </Button>
    </Box>
  );
};

export default TreeChat;
