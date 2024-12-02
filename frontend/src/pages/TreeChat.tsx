import { Box, VStack, Text, Button, IconButton, Icon, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useToast, Tooltip, Container, Flex, Input, Avatar, Menu, MenuButton, MenuList, MenuItem, Divider, SimpleGrid, Card, CardBody, Badge, Heading, InputGroup, InputRightElement } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsTrash, BsStars, BsSend, BsThreeDotsVertical, BsCopy, BsDownload, BsClock, BsChat, BsFileText, BsTable, BsPeople, BsX, BsArrowLeft, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { IoRefreshOutline } from 'react-icons/io5';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';
import TechTreeBackground from '../components/common/TechTreeBackground/TechTreeBackground';
import { keyframes } from '@emotion/react';
import { FaUser, FaRobot, FaFileUpload, FaCamera, FaPaperPlane, FaCrown } from 'react-icons/fa';

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
  const [messages, setMessages] = useState<Array<{ role: string; content: string; id?: number }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitEndTime, setRateLimitEndTime] = useState<Date | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSavedMessages, setShowSavedMessages] = useState(false);

  const recentChats = [
    {
      id: 1,
      title: "Python Programming",
      preview: "Last conversation about Python basics...",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "JavaScript Help",
      preview: "Discussion about React hooks...",
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      title: "Database Design",
      preview: "SQL query optimization tips...",
      timestamp: "1 day ago"
    }
  ];

  const handleBackToHome = () => {
    setShowWelcome(true);
    setMessages([]);
  };

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
      title: "How to make pasta carbonara?",
      icon: BsTable,
      gradient: "linear(to-r, #FF6B6B, #FF8E8E)"
    },
    {
      id: 2,
      title: "Best places to visit in Japan",
      icon: BsChat,
      gradient: "linear(to-r, #4FACFE, #00F2FE)"
    },
    {
      id: 3,
      title: "How to start working out at home?",
      icon: BsFileText,
      gradient: "linear(to-r, #43E97B, #38F9D7)"
    },
    {
      id: 4,
      title: "Tips for better sleep",
      icon: BsPeople,
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  const handleRateLimit = () => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 1);
    setRateLimitEndTime(endTime);
    setIsRateLimited(true);

    toast({
      title: "💡 Rate Limit Reached",
      description: (
        <VStack align="start" spacing={2}>
          <Text>You've reached the free plan limit.</Text>
          <Text fontSize="sm" color="gray.300">
            Try again in: <Text as="span" color="#CDF683" fontWeight="bold">
              {formatTimeRemaining(endTime)}
            </Text>
          </Text>
          <Button
            size="sm"
            variant="outline"
            colorScheme="green"
            onClick={() => {/* Handle upgrade */}}
          >
            Upgrade for unlimited access →
          </Button>
        </VStack>
      ),
      status: "info",
      duration: null,
      isClosable: true,
      position: "top",
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (rateLimitEndTime) {
      timer = setInterval(() => {
        if (new Date() >= rateLimitEndTime) {
          setIsRateLimited(false);
          setRateLimitEndTime(null);
          toast({
            title: "✨ You're back!",
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

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading || isRateLimited) return;

    setShowWelcome(false); // Show chat view when sending message
    setInputValue('');
    setIsLoading(true);

    // Add user message
    const userMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Simulate AI response (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add AI response
      const aiMessage = { role: 'assistant', content: 'This is a sample response from Tree AI.' };
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      
      // Handle rate limiting
      if (error instanceof Error && error.message.includes('rate limit')) {
        setIsRateLimited(true);
        const endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + 1);
        setRateLimitEndTime(endTime);
        
        setTimeout(() => {
          setIsRateLimited(false);
          setRateLimitEndTime(null);
        }, 60000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return 'Happy late night';
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    if (hour < 22) return 'Good evening';
    return 'Happy late night';
  };

  const getLateNightMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 5) {
      return "🌙 Ask me anything... I know everything (even at this hour!)";
    }
    return "✨ Ask me anything... I know everything";
  };

  const messagesEndRef = useRef(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(8px)" />
          <ModalContent 
            bg="transparent"
            maxH="85vh"
            boxShadow="none"
            mx={4}
          >
            <ModalHeader px={6} pt={6} pb={4}>
              <HStack justify="space-between" align="center">
                <HStack spacing={3}>
                  <Icon as={BsBookmark} color="#CDF683" boxSize={5} />
                  <Text color="white" fontSize="xl" fontWeight="semibold">Saved Messages</Text>
                </HStack>
                <IconButton
                  aria-label="Close"
                  icon={<Icon as={BsX} />}
                  onClick={onClose}
                  variant="ghost"
                  color="#CDF683"
                  _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                  size="sm"
                />
              </HStack>
            </ModalHeader>
            <ModalBody p={6}>
              <VStack spacing={4} align="stretch">
                {savedMessages.length === 0 ? (
                  <Box
                    py={12}
                    px={6}
                    bg="transparent"
                    borderRadius="xl"
                    textAlign="center"
                    border="1px dashed"
                    borderColor="whiteAlpha.200"
                  >
                    <Text color="whiteAlpha.600" fontSize="md">
                      No saved messages yet. Save a message to see it here!
                    </Text>
                  </Box>
                ) : (
                  savedMessages.map((msg) => (
                    <MotionBox
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Box
                        p={4}
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
                        <VStack align="stretch" spacing={3}>
                          <HStack justify="space-between">
                            <VStack align="start" spacing={1}>
                              <Text color="white" fontWeight="semibold">
                                {msg.topic}
                              </Text>
                              <HStack spacing={2} color="whiteAlpha.600">
                                <Icon as={FiClock} boxSize={4} />
                                <Text fontSize="sm">
                                  {msg.timestamp}
                                </Text>
                              </HStack>
                            </VStack>
                            
                            <IconButton
                              aria-label="Delete message"
                              icon={<Icon as={FiTrash2} boxSize={4} />}
                              variant="ghost"
                              colorScheme="red"
                              size="sm"
                              color="whiteAlpha.600"
                              _hover={{
                                bg: "red.500",
                                color: "white"
                              }}
                              onClick={() => {
                                setSavedMessages(prev => prev.filter(m => m.id !== msg.id));
                                toast({
                                  title: "Message Removed",
                                  status: "info",
                                  duration: 2000,
                                });
                              }}
                            />
                          </HStack>
                          <Text color="whiteAlpha.800" fontSize="md" lineHeight="tall">
                            {msg.content}
                          </Text>
                        </VStack>
                      </Box>
                    </MotionBox>
                  ))
                )}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Recent Chats Modal */}
        <Modal isOpen={isRecentChatsOpen} onClose={onRecentChatsClose} size="4xl">
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(8px)" />
          <ModalContent 
            bg="transparent"
            maxH="85vh"
            boxShadow="none"
            mx={4}
          >
            <ModalHeader px={6} pt={6} pb={4}>
              <HStack justify="space-between" align="center">
                <HStack spacing={3}>
                  <Icon as={BsClock} color="#CDF683" boxSize={5} />
                  <Text color="white" fontSize="xl" fontWeight="semibold">Recent Chats</Text>
                </HStack>
                <IconButton
                  aria-label="Close"
                  icon={<Icon as={BsX} />}
                  onClick={onRecentChatsClose}
                  variant="ghost"
                  color="#CDF683"
                  _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                  size="sm"
                />
              </HStack>
            </ModalHeader>
            <ModalBody p={6}>
              <VStack spacing={4} align="stretch">
                {messages.length === 0 ? (
                  <Box
                    py={12}
                    px={6}
                    bg="transparent"
                    borderRadius="xl"
                    textAlign="center"
                    border="1px dashed"
                    borderColor="whiteAlpha.200"
                  >
                    <Text color="whiteAlpha.600" fontSize="md">
                      No chat history yet. Start a conversation to see it here!
                    </Text>
                  </Box>
                ) : (
                  messages.map((msg, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      whileHover={{ scale: 1.01 }}
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
                        <VStack align="stretch" spacing={2}>
                          <HStack justify="space-between">
                            <VStack align="start" spacing={1}>
                              <Text fontSize="sm" fontWeight="bold" color="white">
                                {msg.role === 'assistant' ? 'AI Assistant' : 'You'}
                              </Text>
                              <Text fontSize="xs" color="whiteAlpha.600">
                                Just now
                              </Text>
                            </VStack>
                          </HStack>
                          <Text color="whiteAlpha.800" fontSize="md" noOfLines={2}>
                            {msg.content}
                          </Text>
                        </VStack>
                      </Box>
                    </MotionBox>
                  ))
                )}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Saved Message Modal */}
        <Modal isOpen={isSavedMessageOpen} onClose={onSavedMessageClose} size="4xl">
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(8px)" />
          <ModalContent 
            bg="transparent"
            maxH="85vh"
            boxShadow="none"
            mx={4}
          >
            <ModalHeader px={6} pt={6} pb={4}>
              <HStack justify="space-between" align="center">
                <HStack spacing={3}>
                  <Icon as={BsBookmark} color="#CDF683" boxSize={5} />
                  <Text color="white" fontSize="xl" fontWeight="semibold">Saved Message</Text>
                </HStack>
                <IconButton
                  aria-label="Close"
                  icon={<Icon as={BsX} />}
                  onClick={onSavedMessageClose}
                  variant="ghost"
                  color="#CDF683"
                  _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                  size="sm"
                />
              </HStack>
            </ModalHeader>
            <ModalBody p={6}>
              <Box
                p={4}
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
                <VStack align="stretch" spacing={3}>
                  <Text color="whiteAlpha.800" fontSize="md" lineHeight="tall" whiteSpace="pre-wrap">
                    {selectedMessage}
                  </Text>
                  <HStack spacing={2} justify="flex-end">
                    <Button
                      leftIcon={<Icon as={BsCopy} boxSize={4} />}
                      variant="ghost"
                      color="#CDF683"
                      _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedMessage);
                        toast({
                          title: "Copied to clipboard",
                          status: "success",
                          duration: 2000,
                          isClosable: true,
                        });
                      }}
                    >
                      Copy
                    </Button>
                    <Button
                      leftIcon={<Icon as={BsChat} boxSize={4} />}
                      variant="ghost"
                      color="#CDF683"
                      _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                      size="sm"
                      onClick={() => {
                        setInputValue(selectedMessage);
                        onSavedMessageClose();
                        setShowWelcome(false);
                      }}
                    >
                      Continue Chat
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* View All Saved Messages Modal */}
        <Modal isOpen={isAllSavedOpen} onClose={onAllSavedClose} size="4xl">
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(8px)" />
          <ModalContent 
            bg="transparent"
            maxH="85vh"
            boxShadow="none"
            mx={4}
          >
            <ModalHeader px={6} pt={6} pb={4}>
              <HStack justify="space-between" align="center">
                <HStack spacing={3}>
                  <Icon as={BsBookmark} color="#CDF683" boxSize={5} />
                  <Text color="white" fontSize="xl" fontWeight="semibold">All Saved Messages</Text>
                </HStack>
                <IconButton
                  aria-label="Close"
                  icon={<Icon as={BsX} />}
                  onClick={onAllSavedClose}
                  variant="ghost"
                  color="#CDF683"
                  _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                  size="sm"
                />
              </HStack>
            </ModalHeader>
            <ModalBody p={6}>
              <VStack spacing={4} align="stretch">
                {savedMessages.length === 0 ? (
                  <Box
                    py={12}
                    px={6}
                    bg="transparent"
                    borderRadius="xl"
                    textAlign="center"
                    border="1px dashed"
                    borderColor="whiteAlpha.200"
                  >
                    <Text color="whiteAlpha.600" fontSize="md">
                      No saved messages yet. Save a message to see it here!
                    </Text>
                  </Box>
                ) : (
                  savedMessages.map((msg) => (
                    <MotionBox
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Box
                        p={4}
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
                        <VStack align="stretch" spacing={3}>
                          <HStack justify="space-between">
                            <VStack align="start" spacing={1}>
                              <Text color="white" fontWeight="semibold">
                                {msg.topic}
                              </Text>
                              <HStack spacing={2} color="whiteAlpha.600">
                                <Icon as={FiClock} boxSize={4} />
                                <Text fontSize="sm">
                                  {msg.timestamp}
                                </Text>
                              </HStack>
                            </VStack>
                            <HStack>
                              <IconButton
                                aria-label="Copy message"
                                icon={<Icon as={BsCopy} boxSize={4} />}
                                variant="ghost"
                                color="#CDF683"
                                _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(msg.content);
                                  toast({
                                    title: "Copied to clipboard",
                                    status: "success",
                                    duration: 2000,
                                    isClosable: true,
                                  });
                                }}
                              />
                              <IconButton
                                aria-label="Continue chat"
                                icon={<Icon as={BsChat} boxSize={4} />}
                                variant="ghost"
                                color="#CDF683"
                                _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                                size="sm"
                                onClick={() => {
                                  setInputValue(msg.content);
                                  onAllSavedClose();
                                  setShowWelcome(false);
                                }}
                              />
                              <IconButton
                                aria-label="Delete message"
                                icon={<Icon as={FiTrash2} boxSize={4} />}
                                variant="ghost"
                                colorScheme="red"
                                size="sm"
                                color="whiteAlpha.600"
                                _hover={{
                                  bg: "red.500",
                                  color: "white"
                                }}
                                onClick={() => {
                                  setSavedMessages(prev => prev.filter(m => m.id !== msg.id));
                                  toast({
                                    title: "Message Removed",
                                    status: "info",
                                    duration: 2000,
                                  });
                                }}
                              />
                            </HStack>
                          </HStack>
                          <Text color="whiteAlpha.800" fontSize="md" lineHeight="tall">
                            {msg.content}
                          </Text>
                        </VStack>
                      </Box>
                    </MotionBox>
                  ))
                )}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Container maxW="container.xl" h="100vh" px={6}>
          <Flex direction="column" h="100%" py={2}>
            <VStack spacing={4} flex="1" w="100%" position="relative">
              {/* Glassy Background Card */}
              <Box
                position="absolute"
                top={0}
                left={-6}
                right={-6}
                bottom={28}
                bg="rgba(0, 0, 0, 0.3)"
                borderRadius="lg"
                borderWidth="1px"
                borderColor="whiteAlpha.100"
                backdropFilter="blur(10px)"
                boxShadow="dark-lg"
                overflow="hidden"
                zIndex={0}
              />
              
              <Flex
                direction="column"
                flex="1"
                p={6}
                position="relative"
                zIndex={1}
                w="100%"
              >
                {showWelcome ? (
                  <VStack spacing={6} align="center" w="100%" h="100%" overflowY="auto">
                    {/* Badge and Greeting */}
                    <VStack spacing={4} align="center" w="100%">
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
                          color="whiteAlpha.700" 
                          fontSize="md"
                          textAlign="center"
                        >
                          {getLateNightMessage()}
                        </Text>
                      </Flex>
                    </VStack>

                    {/* Recent Chats Section */}
                    <Box w="100%" px={4}>
                      <HStack justify="space-between" mb={2}>
                        <Text fontWeight="bold" color="#CDF683">Recent Chats</Text>
                        <Button
                          onClick={onRecentChatsOpen}
                          variant="ghost"
                          size="sm"
                          color="#CDF683"
                          _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                          transition="all 0.2s"
                          position="relative"
                          pl={4}
                          pr={6}
                          borderRadius="full"
                          bgGradient="linear(to-r, rgba(205, 246, 131, 0.1), transparent)"
                        >
                          View All
                        </Button>
                      </HStack>
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
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
                    </Box>

                    {/* Saved Messages and Recent Topics Cards */}
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} px={4} w="100%">
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
                            <HStack justify="space-between" width="100%">
                              <HStack color="#CDF683">
                                <Icon as={BsBookmark} />
                                <Text fontWeight="bold">Saved Messages</Text>
                              </HStack>
                              <Button
                                onClick={onAllSavedOpen}
                                variant="ghost"
                                size="sm"
                                color="#CDF683"
                                _hover={{
                                  bg: "rgba(205, 246, 131, 0.1)"
                                }}
                                transition="all 0.2s"
                                position="relative"
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

                      {/* Recent Topics Card */}
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
                              <Icon as={BsClock} />
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
                                      as={topic.icon} 
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
                  </VStack>
                ) : (
                  <VStack spacing={4} w="100%" flex={1} overflowY="auto">
                    {/* Creative Back Button */}
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
                  </VStack>
                )}
              </Flex>
            </VStack>

            {/* Floating Input Card */}
            <Box
              position="fixed"
              bottom={6}
              left={6}
              right={6}
              maxW="container.xl"
              mx="auto"
              bg="rgba(0, 0, 0, 0.3)"
              borderRadius="lg"
              p={4}
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              backdropFilter="blur(10px)"
              boxShadow="dark-lg"
              zIndex={2}
            >
              <Flex>
                <InputGroup size="lg" flex={1}>
                  <Input
                    placeholder={isRateLimited ? `Please wait ${formatTimeRemaining(rateLimitEndTime!)}...` : "How can Tree AI help you today?"}
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _hover={{ borderColor: "#CDF683" }}
                    _focus={{ 
                      borderColor: "#CDF683",
                      boxShadow: "0 0 0 1px #CDF683"
                    }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    isDisabled={isRateLimited || isLoading}
                  />
                </InputGroup>
                
                {/* Action Buttons */}
                <HStack spacing={2} ml={4}>
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
                  <IconButton
                    aria-label="Send message"
                    icon={<FaPaperPlane />}
                    colorScheme="green"
                    variant="solid"
                    bg="#CDF683"
                    color="black"
                    _hover={{ bg: "#CDF683" }}
                    onClick={() => handleSendMessage(inputValue)}
                    isLoading={isLoading}
                    isDisabled={!inputValue.trim() || isRateLimited}
                  />
                </HStack>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default TreeChat;
