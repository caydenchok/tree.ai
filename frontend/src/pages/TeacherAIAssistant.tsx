import * as React from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  Heading,
  useColorModeValue,
  HStack,
  VStack,
  IconButton,
  SimpleGrid,
  Input,
  Button,
  useToast,
  Card,
  CardBody,
  Progress,
  CardHeader,
  Spacer,
  Avatar,
  useColorMode,
  Grid,
  GridItem,
  Center,
  InputGroup,
  Collapse,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react';
import { 
  FaRobot, 
  FaUser, 
  FaPaperPlane, 
  FaRegPaperPlane,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaBook,
  FaCalculator,
  FaFlask,
  FaLanguage,
  FaHistory,
  FaSave,
  FaBookmark,
  FaRegBookmark,
  FaRegCopy,
  FaRegWindowClose,
  FaTrash,
  FaArrowLeft,
  FaLightbulb,
  FaHome,
  FaTools,
  FaCog,
  FaSearch,
  FaSpinner,
  FaPuzzlePiece,
  FaFileUpload,
  FaCamera,
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
  FaCode,
  FaChartLine,
  FaBullseye,
  FaBug,
  FaComments,
  FaGlobe,
  FaLandmark,
  FaAtom,
  FaRuler,
  FaMagic,
  FaBrain,
  FaQuestionCircle,
  FaUsers,
  FaClock,
  FaChartBar,
  FaChartPie,
  FaChartArea,
  FaCalendarAlt,
  FaClipboardCheck,
  FaBookReader,
} from 'react-icons/fa';
import { 
  FiSend, 
  FiMic, 
  FiPaperclip, 
  FiMaximize2, 
  FiMinimize2,
  FiSettings,
  FiRefreshCw,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import type { CardProps, BoxProps, FlexProps } from '@chakra-ui/react';
import { chakra, keyframes } from "@emotion/react";
import styled from '@emotion/styled';
import TeacherSidebar from '../components/TeacherSidebar';

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionCardProps = Merge<CardProps, HTMLMotionProps<'div'>>;
type MotionBoxProps = Merge<BoxProps, HTMLMotionProps<'div'>>;
type MotionFlexProps = Merge<FlexProps, HTMLMotionProps<'div'>>;

const MotionCard = motion(Card) as React.ComponentType<MotionCardProps>;
const MotionBox = motion(Box) as React.ComponentType<MotionBoxProps>;
const MotionFlex = motion(Flex) as React.ComponentType<MotionFlexProps>;

const PoweredByText = styled.span`
  background: linear-gradient(to right, #cdf683, #4ae025);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  display: inline-block;
  padding-left: 0.5rem;
`;

interface MessageInterface {
  content: string;
  role: 'assistant' | 'user';
  timestamp: string;
}

interface SavedMessage extends MessageInterface {
  id: string;
  saved: boolean;
}

interface SavedChat {
  id: string;
  title: string;
  messages: MessageInterface[];
  timestamp: string;
}

interface TipProps {
  icon: any;
  text: string;
}

const Tip: React.FC<TipProps> = ({ icon, text }) => {
  return (
    <Flex 
      align="center" 
      gap={2} 
      p={3} 
      bg="whiteAlpha.100" 
      borderRadius="lg" 
      _hover={{ 
        bg: "whiteAlpha.200",
        transform: "translateY(-2px)",
        boxShadow: "lg"
      }}
      transition="all 0.2s"
      cursor="pointer"
      border="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Icon as={icon} color="#cdf683" boxSize={5} />
      <Text fontSize="sm" color="whiteAlpha.900" fontWeight="medium">
        {text}
      </Text>
    </Flex>
  );
};

const TeacherAIAssistant: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [selectedSubject, setSelectedSubject] = React.useState('');
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<MessageInterface[]>([]);
  const [isTyping, setIsTyping] = React.useState(false);
  const [showChatHistory, setShowChatHistory] = React.useState(false);
  const [isQuickTipsExpanded, setIsQuickTipsExpanded] = React.useState(true);
  const [showHistory, setShowHistory] = React.useState(false);
  const [showSavedChats, setShowSavedChats] = React.useState(false);
  const [savedChats, setSavedChats] = React.useState<SavedChat[]>([]);
  const [savedMessages, setSavedMessages] = React.useState<{ [key: string]: boolean }>({});
  const [showSavedMessages, setShowSavedMessages] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Theme colors
  const bgGradient = "linear(to-br, brand.secondary, brand.dark.primary)";
  const cardBg = "rgba(255, 255, 255, 0.05)";
  const hoverBg = "rgba(205, 246, 131, 0.1)";
  const borderColor = "rgba(205, 246, 131, 0.2)";
  const textColor = "brand.white.primary";
  const mutedColor = "whiteAlpha.700";
  const accentColor = "#cdf683";

  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject);
    setIsChatOpen(true);
  };

  const handleSaveMessage = (messageId: string) => {
    setSavedMessages(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const handleDeleteSavedMessage = (id: string) => {
    const updatedSavedMessages = savedMessages.filter(msg => msg.id !== id);
    setSavedMessages(updatedSavedMessages);
    localStorage.setItem('savedMessages', JSON.stringify(updatedSavedMessages));

    toast({
      title: "Message deleted",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const isMessageSaved = (message: MessageInterface) => {
    return savedMessages.some(savedMsg => 
      savedMsg.content === message.content && 
      savedMsg.timestamp === message.timestamp
    );
  };

  const handleSaveChat = () => {
    if (messages.length <= 1) {
      toast({
        title: "Cannot save empty chat",
        description: "Have a conversation first before saving",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newChat: SavedChat = {
      id: Date.now().toString(),
      title: messages[1].content.slice(0, 50) + "...", // Use first user message as title
      messages: [...messages],
      timestamp: new Date().toISOString(),
    };

    const updatedChats = [...savedChats, newChat];
    setSavedChats(updatedChats);
    localStorage.setItem('savedChats', JSON.stringify(updatedChats));

    toast({
      title: "Chat saved",
      description: "You can access this chat from saved chats",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleLoadChat = (chat: SavedChat) => {
    setMessages(chat.messages);
    setShowSavedChats(false);
    toast({
      title: "Chat loaded",
      description: "Previous conversation restored",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteChat = (chatId: string) => {
    const updatedChats = savedChats.filter(chat => chat.id !== chatId);
    setSavedChats(updatedChats);
    localStorage.setItem('savedChats', JSON.stringify(updatedChats));
    toast({
      title: "Chat deleted",
      description: "The conversation has been removed from saved chats",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleViewHistory = () => {
    setShowHistory(prev => !prev);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: MessageInterface = {
      content: input,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: MessageInterface = {
        content: `I'll help you with your ${selectedSubject} task.`,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Flex h="100vh" bg={bgGradient}>
      <TeacherSidebar
        isCollapsed={isSidebarCollapsed}
        onCollapse={setIsSidebarCollapsed}
      />
      
      <Box
        flex="1"
        ml={isSidebarCollapsed ? "60px" : "240px"}
        transition="margin-left 0.3s"
        overflowY="auto"
        position="relative"
      >
        <Box h="100vh" display="flex" flexDirection="column">
          {/* Header */}
          <Box 
            p={4} 
            borderBottom="1px solid" 
            borderColor={borderColor}
            bg="rgba(0, 0, 0, 0.2)"
          >
            <Flex justify="space-between" align="center">
              <Heading color={textColor} size="lg">
                Teacher AI Assistant
              </Heading>
              <Text 
                fontSize="sm" 
                fontWeight="medium"
                display="flex"
                alignItems="center"
              >
                <PoweredByText>
                  Powered by Tree8 AI
                </PoweredByText>
              </Text>
            </Flex>
          </Box>

          {/* Content Area */}
          <Box flex="1" p={8} overflowY="auto">
            <VStack spacing={8} align="stretch" maxW="1400px" mx="auto">
              <Flex justify="space-between" align="center">
                <Text color={mutedColor}>
                  Your AI teaching assistant to help you excel in education
                </Text>
                <HStack spacing={2}>
                  <Button
                    leftIcon={<FaSave />}
                    size="sm"
                    colorScheme="brand"
                    onClick={() => setShowSavedChats(true)}
                    isDisabled={savedChats.length === 0}
                  >
                    Saved Chats
                  </Button>
                  <Button
                    leftIcon={<FaBookmark />}
                    size="sm"
                    colorScheme="brand"
                    onClick={() => setShowSavedMessages(true)}
                  >
                    Saved Messages
                  </Button>
                  <Button
                    leftIcon={<FaHistory />}
                    size="sm"
                    colorScheme="brand"
                    onClick={() => setShowHistory(true)}
                    variant="outline"
                  >
                    History
                  </Button>
                </HStack>
              </Flex>

              {/* Teaching Support Cards */}
              {!isChatOpen && (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
                  {[
                    {
                      title: "Lesson Planning",
                      description: "Create engaging lesson plans",
                      icon: FaBook,
                      gradient: "linear-gradient(to right, blue.400, purple.500)",
                      delay: 0
                    },
                    {
                      title: "Assessment Tools",
                      description: "Design effective assessments",
                      icon: FaClipboardCheck,
                      gradient: "linear-gradient(to right, green.400, teal.500)",
                      delay: 0.1
                    },
                    {
                      title: "Teaching Resources",
                      description: "Access teaching materials",
                      icon: FaGraduationCap,
                      gradient: "linear-gradient(to right, orange.400, red.500)",
                      delay: 0.2
                    },
                    {
                      title: "Student Support",
                      description: "Get help with student needs",
                      icon: FaUsers,
                      gradient: "linear-gradient(to right, pink.400, purple.500)",
                      delay: 0.3
                    },
                    {
                      title: "Curriculum Development",
                      description: "Design and improve curriculum",
                      icon: FaBrain,
                      gradient: "linear-gradient(to right, cyan.400, blue.500)",
                      delay: 0.4
                    },
                    {
                      title: "Interactive Activities",
                      description: "Create engaging activities",
                      icon: FaMagic,
                      gradient: "linear-gradient(to right, yellow.400, orange.500)",
                      delay: 0.5
                    },
                    {
                      title: "Language Support",
                      description: "Multi-language teaching help",
                      icon: FaLanguage,
                      gradient: "linear-gradient(to right, purple.400, pink.500)",
                      delay: 0.6
                    },
                    {
                      title: "Math Teaching",
                      description: "Mathematics teaching strategies",
                      icon: FaCalculator,
                      gradient: "linear-gradient(to right, green.400, blue.500)",
                      delay: 0.7
                    },
                    {
                      title: "Science Labs",
                      description: "Plan science experiments",
                      icon: FaFlask,
                      gradient: "linear-gradient(to right, red.400, orange.500)",
                      delay: 0.8
                    }
                  ].map((card, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: card.delay,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Box
                        as="button"
                        w="full"
                        h="200px"
                        p={6}
                        borderRadius="xl"
                        overflow="hidden"
                        position="relative"
                        onClick={() => {
                          setInput(`I need help with ${card.title.toLowerCase()}`);
                          setIsChatOpen(true);
                          handleSubjectClick(card.title);
                        }}
                        role="group"
                      >
                        {/* Animated background gradient */}
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          right={0}
                          bottom={0}
                          bgGradient={card.gradient}
                          opacity={0.9}
                          transition="all 0.3s"
                          _groupHover={{
                            opacity: 1,
                            transform: "scale(1.1) rotate(2deg)"
                          }}
                        />

                        {/* Content */}
                        <Flex
                          direction="column"
                          align="center"
                          justify="center"
                          h="full"
                          position="relative"
                          color="white"
                          textAlign="center"
                        >
                          <MotionBox
                            initial={{ scale: 1 }}
                            animate={{
                              scale: [1, 1.1, 1],
                              transition: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }
                            }}
                          >
                            <Icon
                              as={card.icon}
                              boxSize={12}
                              mb={4}
                              filter="drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))"
                            />
                          </MotionBox>
                          <MotionBox
                            initial={{ y: 0 }}
                            _groupHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Heading
                              size="md"
                              mb={2}
                              fontWeight="bold"
                              textShadow="0px 2px 4px rgba(0, 0, 0, 0.2)"
                            >
                              {card.title}
                            </Heading>
                          </MotionBox>
                          <MotionBox
                            initial={{ opacity: 0.8, y: 0 }}
                            _groupHover={{
                              opacity: 1,
                              y: -5,
                              transition: { delay: 0.1 }
                            }}
                          >
                            <Text
                              fontSize="sm"
                              opacity={0.9}
                              textShadow="0px 1px 2px rgba(0, 0, 0, 0.2)"
                            >
                              {card.description}
                            </Text>
                          </MotionBox>

                          {/* Floating particles effect */}
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            width="full"
                            height="full"
                            opacity={0}
                            _groupHover={{ opacity: 0.5 }}
                            transition="all 0.3s"
                          >
                            {[...Array(3)].map((_, i) => (
                              <MotionBox
                                key={i}
                                position="absolute"
                                width="8px"
                                height="8px"
                                borderRadius="full"
                                bg="white"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                  opacity: [0, 1, 0],
                                  scale: [0, 1.5, 0],
                                  x: [-20, 20, -20],
                                  y: [-20, 20, -20],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </Box>
                        </Flex>
                      </Box>
                    </MotionBox>
                  ))}
                </SimpleGrid>
              )}

              {/* Course cards with matching gradients */}
              {!isChatOpen && (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
                  {[
                    {
                      title: 'Mathematics',
                      description: 'Create engaging math lessons and assessments',
                      icon: FaCalculator,
                      gradient: 'linear(to-br, #FF6B6B, #FF8E8E)',
                    },
                    {
                      title: 'Science',
                      description: 'Design interactive science experiments and lessons',
                      icon: FaFlask,
                      gradient: 'linear(to-br, #4ECDC4, #6EE7B7)',
                    },
                    {
                      title: 'English',
                      description: 'Develop comprehensive English language curricula',
                      icon: FaLanguage,
                      gradient: 'linear(to-br, #A78BFA, #C4B5FD)',
                    },
                    {
                      title: 'Bahasa Melayu',
                      description: 'Rancang pengajaran dan pembelajaran Bahasa Melayu',
                      icon: FaBook,
                      gradient: 'linear(to-br, #F59E0B, #FCD34D)',
                    },
                  ].map((card, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Box
                        as="button"
                        w="full"
                        h="200px"
                        p={6}
                        borderRadius="xl"
                        overflow="hidden"
                        position="relative"
                        onClick={() => {
                          setInput(`I need help with ${card.title.toLowerCase()}`);
                          setIsChatOpen(true);
                          handleSubjectClick(card.title);
                        }}
                        role="group"
                      >
                        {/* Animated background gradient */}
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          right={0}
                          bottom={0}
                          bgGradient={card.gradient}
                          opacity={0.9}
                          transition="all 0.3s"
                          _groupHover={{
                            opacity: 1,
                            transform: "scale(1.1) rotate(2deg)"
                          }}
                        />

                        {/* Content */}
                        <Flex
                          direction="column"
                          align="center"
                          justify="center"
                          h="full"
                          position="relative"
                          color="white"
                          textAlign="center"
                        >
                          <MotionBox
                            initial={{ scale: 1 }}
                            animate={{
                              scale: [1, 1.1, 1],
                              transition: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }
                            }}
                          >
                            <Icon
                              as={card.icon}
                              boxSize={12}
                              mb={4}
                              filter="drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))"
                            />
                          </MotionBox>
                          <MotionBox
                            initial={{ y: 0 }}
                            _groupHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Heading
                              size="md"
                              mb={2}
                              fontWeight="bold"
                              textShadow="0px 2px 4px rgba(0, 0, 0, 0.2)"
                            >
                              {card.title}
                            </Heading>
                          </MotionBox>
                          <MotionBox
                            initial={{ opacity: 0.8, y: 0 }}
                            _groupHover={{
                              opacity: 1,
                              y: -5,
                              transition: { delay: 0.1 }
                            }}
                          >
                            <Text
                              fontSize="sm"
                              opacity={0.9}
                              textShadow="0px 1px 2px rgba(0, 0, 0, 0.2)"
                            >
                              {card.description}
                            </Text>
                          </MotionBox>

                          {/* Floating particles effect */}
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            width="full"
                            height="full"
                            opacity={0}
                            _groupHover={{ opacity: 0.5 }}
                            transition="all 0.3s"
                          >
                            {[...Array(3)].map((_, i) => (
                              <MotionBox
                                key={i}
                                position="absolute"
                                width="8px"
                                height="8px"
                                borderRadius="full"
                                bg="white"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                  opacity: [0, 1, 0],
                                  scale: [0, 1.5, 0],
                                  x: [-20, 20, -20],
                                  y: [-20, 20, -20],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </Box>
                        </Flex>
                      </Box>
                    </MotionBox>
                  ))}
                </SimpleGrid>
              )}

              {/* Chat Interface */}
              {isChatOpen && (
                <Box
                  position="fixed"
                  top={0}
                  right={0}
                  bottom={0}
                  left={0}
                  ml={isSidebarCollapsed ? "60px" : "240px"}
                  bg="#1a1f17"
                  zIndex={20}
                  display="flex"
                  flexDirection="column"
                >
                  {/* Chat Header */}
                  <Flex
                    px={6}
                    py={4}
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.100"
                    align="center"
                    justify="space-between"
                    bg="rgba(0, 0, 0, 0.2)"
                    backdropFilter="blur(10px)"
                  >
                    <HStack spacing={4}>
                      <IconButton
                        aria-label="Go back"
                        icon={<FaArrowLeft />}
                        variant="ghost"
                        onClick={() => setIsChatOpen(false)}
                        color="whiteAlpha.900"
                        _hover={{ bg: "whiteAlpha.200" }}
                      />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="lg" fontWeight="bold" color="whiteAlpha.900">
                          {selectedSubject}
                        </Text>
                        <Text fontSize="sm" color="whiteAlpha.600">
                          Teacher AI Assistant
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Save chat"
                        icon={<FaSave />}
                        variant="ghost"
                        color="whiteAlpha.900"
                        onClick={handleSaveChat}
                        _hover={{ bg: "whiteAlpha.200" }}
                      />
                      <IconButton
                        aria-label="View history"
                        icon={<FaHistory />}
                        variant="ghost"
                        color="whiteAlpha.900"
                        onClick={handleViewHistory}
                        _hover={{ bg: "whiteAlpha.200" }}
                      />
                    </HStack>
                  </Flex>

                  {/* Quick Tips */}
                  <Box 
                    mx={6}
                    mt={4}
                    bg="rgba(0, 0, 0, 0.2)"
                    borderRadius="xl" 
                    p={4} 
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    backdropFilter="blur(8px)"
                  >
                    <Flex justify="space-between" align="center" mb={4}>
                      <Flex align="center" gap={2}>
                        <Icon as={FaLightbulb} color="#cdf683" boxSize={5} />
                        <Text fontSize="lg" fontWeight="bold" color="whiteAlpha.900">
                          Quick Tips
                        </Text>
                      </Flex>
                      <IconButton
                        aria-label={isQuickTipsExpanded ? "Collapse tips" : "Expand tips"}
                        icon={isQuickTipsExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        onClick={() => setIsQuickTipsExpanded(!isQuickTipsExpanded)}
                        variant="ghost"
                        color="whiteAlpha.900"
                        _hover={{ bg: "whiteAlpha.200" }}
                      />
                    </Flex>
                    
                    <Collapse in={isQuickTipsExpanded} animateOpacity>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <Tip
                          icon={FaGraduationCap}
                          text="Generate a detailed lesson plan with learning objectives and activities"
                        />
                        <Tip
                          icon={FaClipboardCheck}
                          text="Create assessment questions with varying difficulty levels"
                        />
                        <Tip
                          icon={FaUsers}
                          text="Get strategies for managing different learning styles in your classroom"
                        />
                        <Tip
                          icon={FaChartLine}
                          text="Track student progress and generate performance reports"
                        />
                        <Tip
                          icon={FaPuzzlePiece}
                          text="Design engaging interactive activities and games"
                        />
                        <Tip
                          icon={FaBook}
                          text="Get recommendations for educational resources and materials"
                        />
                      </SimpleGrid>
                    </Collapse>
                  </Box>

                  {/* Messages Area */}
                  <Box
                    flex={1}
                    overflowY="auto"
                    px={6}
                    py={4}
                    css={{
                      '&::-webkit-scrollbar': {
                        width: '4px',
                      },
                      '&::-webkit-scrollbar-track': {
                        width: '6px',
                        background: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '24px',
                      },
                    }}
                  >
                    <Box flex={1} overflowY="auto" px={4} py={6}>
                      {messages.map((message, index) => (
                        <Box
                          key={index}
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
                          <Box
                            p={4}
                            bgGradient={
                              message.role === 'assistant'
                                ? "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))"
                                : "linear(to-r, rgba(205, 246, 131, 0.15), rgba(205, 246, 131, 0.1))"
                            }
                            borderRadius="xl"
                            borderWidth="1px"
                            borderColor={message.role === 'assistant' ? "whiteAlpha.100" : "rgba(205, 246, 131, 0.2)"}
                            mb={4}
                            maxW="850px"
                            mx="auto"
                            backdropFilter="blur(8px)"
                            boxShadow="lg"
                            _hover={{
                              transform: "translateY(-2px)",
                              boxShadow: "xl",
                            }}
                            transition="all 0.2s"
                          >
                            <HStack spacing={4} align="start">
                              <Avatar
                                size="sm"
                                icon={message.role === 'assistant' ? <FaRobot /> : <FaUser />}
                                bg={message.role === 'assistant' ? "green.500" : "blue.500"}
                              />
                              <VStack align="start" flex={1} spacing={1}>
                                <HStack spacing={2}>
                                  <Text fontSize="sm" fontWeight="bold" color="whiteAlpha.900">
                                    {message.role === 'assistant' ? "Teacher AI" : "You"}
                                  </Text>
                                  <Text fontSize="xs" color="whiteAlpha.600">
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                  </Text>
                                </HStack>
                                <Text color="whiteAlpha.900">{message.content}</Text>
                              </VStack>
                              <HStack>
                                {message.role === 'assistant' && (
                                  <>
                                    <IconButton
                                      aria-label={savedMessages[index] ? "Unsave message" : "Save message"}
                                      icon={savedMessages[index] ? <FaBookmark /> : <FaRegBookmark />}
                                      variant="ghost"
                                      size="sm"
                                      color={savedMessages[index] ? "#cdf683" : "whiteAlpha.600"}
                                      _hover={{ 
                                        color: "#cdf683",
                                        bg: "whiteAlpha.200" 
                                      }}
                                      onClick={() => handleSaveMessage(index.toString())}
                                    />
                                    <IconButton
                                      aria-label="Copy message"
                                      icon={<FaRegCopy />}
                                      variant="ghost"
                                      size="sm"
                                      color="whiteAlpha.600"
                                      _hover={{ 
                                        color: "whiteAlpha.900",
                                        bg: "whiteAlpha.200" 
                                      }}
                                      onClick={() => {
                                        navigator.clipboard.writeText(message.content);
                                        toast({
                                          title: "Message copied",
                                          status: "success",
                                          duration: 2000,
                                        });
                                      }}
                                    />
                                  </>
                                )}
                              </HStack>
                            </HStack>
                          </Box>
                        </Box>
                      ))}
                      {isTyping && (
                        <Box p={4} maxW="850px" mx="auto">
                          <Progress
                            size="xs"
                            isIndeterminate
                            bg="whiteAlpha.100"
                            colorScheme="green"
                          />
                        </Box>
                      )}
                      <div ref={messagesEndRef} />
                    </Box>
                  </Box>

                  {/* Input Area */}
                  <Box
                    p={6}
                    bgGradient="linear(to-r, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3))"
                    borderTop="1px solid"
                    borderColor="whiteAlpha.100"
                    backdropFilter="blur(10px)"
                  >
                    <Box maxW="850px" mx="auto">
                      <HStack spacing={4}>
                        <HStack spacing={2}>
                          <IconButton
                            aria-label="Upload file"
                            icon={<FaFileUpload />}
                            variant="ghost"
                            color="whiteAlpha.900"
                            _hover={{ 
                              bg: "whiteAlpha.200",
                              transform: "translateY(-2px)",
                            }}
                            transition="all 0.2s"
                          />
                          <IconButton
                            aria-label="Camera"
                            icon={<FaCamera />}
                            variant="ghost"
                            color="whiteAlpha.900"
                            _hover={{ 
                              bg: "whiteAlpha.200",
                              transform: "translateY(-2px)",
                            }}
                            transition="all 0.2s"
                          />
                        </HStack>
                        <Input
                          flex={1}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder={`Ask about ${selectedSubject.toLowerCase()}...`}
                          bg="whiteAlpha.50"
                          border="1px solid"
                          borderColor="whiteAlpha.200"
                          color="whiteAlpha.900"
                          _focus={{
                            borderColor: "#cdf683",
                            boxShadow: "0 0 0 1px #cdf683",
                          }}
                          _hover={{
                            borderColor: "whiteAlpha.300"
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <IconButton
                          aria-label="Send message"
                          icon={<FaPaperPlane />}
                          onClick={handleSendMessage}
                          bg="#cdf683"
                          color="gray.800"
                          _hover={{ 
                            bg: "#bef55f",
                            transform: "translateY(-2px)",
                          }}
                          _active={{
                            transform: "translateY(0)",
                          }}
                          transition="all 0.2s"
                          isLoading={isTyping}
                          boxShadow="md"
                        />
                      </HStack>
                    </Box>
                  </Box>
                </Box>
              )}
            </VStack>
          </Box>
        </Box>
      </Box>

      {/* Modern Popout Modal for History */}
      <Modal isOpen={showHistory} onClose={() => setShowHistory(false)} size="2xl">
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.700" />
        <ModalContent
          bg="transparent"
          boxShadow="none"
          maxW="850px"
          mx="auto"
        >
          <ModalBody p={8}>
            <VStack spacing={4} align="stretch">
              {/* Header */}
              <HStack justify="space-between" align="center" mb={2}>
                <HStack spacing={3}>
                  <Icon as={FaHistory} color="#cdf683" boxSize={5} />
                  <Text fontSize="lg" fontWeight="bold" color="whiteAlpha.900">
                    Chat History
                  </Text>
                </HStack>
                <IconButton
                  aria-label="Close"
                  icon={<FaRegWindowClose />}
                  variant="ghost"
                  size="sm"
                  color="whiteAlpha.900"
                  onClick={() => setShowHistory(false)}
                  _hover={{ 
                    color: "#cdf683",
                    transform: "scale(1.1)",
                  }}
                  transition="all 0.2s"
                />
              </HStack>

              {/* History List */}
              {messages.map((message, index) => (
                <Box
                  key={index}
                  p={4}
                  bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="whiteAlpha.100"
                  backdropFilter="blur(8px)"
                  boxShadow="lg"
                  _hover={{
                    transform: "translateY(-2px)",
                    transition: "all 0.2s",
                  }}
                >
                  <HStack spacing={4} align="start">
                    <Avatar
                      size="sm"
                      icon={message.role === 'assistant' ? <FaRobot /> : <FaUser />}
                      bg={message.role === 'assistant' ? "green.500" : "blue.500"}
                    />
                    <VStack align="start" flex={1} spacing={1}>
                      <HStack spacing={2}>
                        <Text fontSize="sm" fontWeight="bold" color="whiteAlpha.900">
                          {message.role === 'assistant' ? 'AI Assistant' : 'You'}
                        </Text>
                        <Text fontSize="xs" color="whiteAlpha.600">
                          {new Date(message.timestamp).toLocaleString()}
                        </Text>
                      </HStack>
                      <Text fontSize="xs" color="whiteAlpha.900">
                        {message.content}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modern Popout Modal for Saved Chats */}
      <Modal isOpen={showSavedChats} onClose={() => setShowSavedChats(false)} size="2xl">
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.700" />
        <ModalContent
          bg="transparent"
          boxShadow="none"
          maxW="850px"
          mx="auto"
        >
          <ModalBody p={8}>
            <VStack spacing={4} align="stretch">
              {/* Header */}
              <HStack justify="space-between" align="center" mb={2}>
                <HStack spacing={3}>
                  <Icon as={FaSave} color="#cdf683" boxSize={5} />
                  <Text fontSize="lg" fontWeight="bold" color="whiteAlpha.900">
                    Saved Chats
                  </Text>
                </HStack>
                <IconButton
                  aria-label="Close"
                  icon={<FaRegWindowClose />}
                  variant="ghost"
                  size="sm"
                  color="whiteAlpha.900"
                  onClick={() => setShowSavedChats(false)}
                  _hover={{ 
                    color: "#cdf683",
                    transform: "scale(1.1)",
                  }}
                  transition="all 0.2s"
                />
              </HStack>

              {/* Saved Chats List */}
              {savedChats.length === 0 ? (
                <Box
                  p={4}
                  bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="whiteAlpha.100"
                  backdropFilter="blur(8px)"
                >
                  <Text color="whiteAlpha.600" fontSize="sm" textAlign="center">
                    No saved chats yet. Save a chat to see it here!
                  </Text>
                </Box>
              ) : (
                savedChats.map((chat) => (
                  <Box
                    key={chat.id}
                    p={4}
                    bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="whiteAlpha.100"
                    backdropFilter="blur(8px)"
                    boxShadow="lg"
                    _hover={{
                      transform: "translateY(-2px)",
                      transition: "all 0.2s",
                    }}
                  >
                    <HStack spacing={4} align="start">
                      <Avatar
                        size="sm"
                        icon={<FaRobot />}
                        bg="green.500"
                      />
                      <VStack align="start" flex={1} spacing={1}>
                        <HStack spacing={2}>
                          <Text fontSize="sm" fontWeight="bold" color="whiteAlpha.900">
                            {chat.title}
                          </Text>
                          <Text fontSize="xs" color="whiteAlpha.600">
                            {new Date(chat.timestamp).toLocaleString()}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="whiteAlpha.900" noOfLines={2}>
                          {chat.messages[chat.messages.length - 1]?.content || "No messages"}
                        </Text>
                      </VStack>
                      <IconButton
                        aria-label="Delete chat"
                        icon={<FaTrash />}
                        variant="ghost"
                        size="sm"
                        color="red.400"
                        onClick={() => handleDeleteChat(chat.id)}
                        _hover={{ 
                          color: "red.300",
                          bg: "whiteAlpha.200" 
                        }}
                      />
                    </HStack>
                  </Box>
                ))
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modern Popout Modal for Saved Messages */}
      <Modal isOpen={showSavedMessages} onClose={() => setShowSavedMessages(false)} size="2xl">
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.700" />
        <ModalContent
          bg="transparent"
          boxShadow="none"
          maxW="850px"
          mx="auto"
        >
          <ModalBody p={8}>
            <VStack spacing={4} align="stretch">
              {/* Header */}
              <HStack justify="space-between" align="center" mb={2}>
                <HStack spacing={3}>
                  <Icon as={FaSave} color="#cdf683" boxSize={5} />
                  <Text fontSize="lg" fontWeight="bold" color="whiteAlpha.900">
                    Saved Messages
                  </Text>
                </HStack>
                <IconButton
                  aria-label="Close"
                  icon={<FaRegWindowClose />}
                  variant="ghost"
                  size="sm"
                  color="whiteAlpha.900"
                  onClick={() => setShowSavedMessages(false)}
                  _hover={{ 
                    color: "#cdf683",
                    transform: "scale(1.1)",
                  }}
                  transition="all 0.2s"
                />
              </HStack>

              {/* Saved Messages List */}
              {savedMessages.length === 0 ? (
                <Box
                  p={4}
                  bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="whiteAlpha.100"
                  backdropFilter="blur(8px)"
                >
                  <Text color="whiteAlpha.600" fontSize="sm" textAlign="center">
                    No saved messages yet. Save a message to see it here!
                  </Text>
                </Box>
              ) : (
                Object.keys(savedMessages).map((messageId) => (
                  <Box
                    key={messageId}
                    p={4}
                    bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="whiteAlpha.100"
                    backdropFilter="blur(8px)"
                    boxShadow="lg"
                    _hover={{
                      transform: "translateY(-2px)",
                      transition: "all 0.2s",
                    }}
                  >
                    <HStack spacing={4} align="start">
                      <Avatar
                        size="sm"
                        icon={messages[parseInt(messageId)].role === 'assistant' ? <FaRobot /> : <FaUser />}
                        bg={messages[parseInt(messageId)].role === 'assistant' ? "green.500" : "blue.500"}
                      />
                      <VStack align="start" flex={1} spacing={1}>
                        <HStack spacing={2}>
                          <Text fontSize="sm" fontWeight="bold" color="whiteAlpha.900">
                            {messages[parseInt(messageId)].role === 'assistant' ? 'AI Assistant' : 'You'}
                          </Text>
                          <Text fontSize="xs" color="whiteAlpha.600">
                            {new Date(messages[parseInt(messageId)].timestamp).toLocaleString()}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="whiteAlpha.900">
                          {messages[parseInt(messageId)].content}
                        </Text>
                      </VStack>
                      <IconButton
                        aria-label="Delete message"
                        icon={<FaTrash />}
                        variant="ghost"
                        size="sm"
                        color="red.400"
                        onClick={() => handleDeleteSavedMessage(messageId)}
                        _hover={{ 
                          color: "red.300",
                          bg: "whiteAlpha.200" 
                        }}
                      />
                    </HStack>
                  </Box>
                ))
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default TeacherAIAssistant;
