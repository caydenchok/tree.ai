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
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  Badge,
  Circle,
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
  FaDna,
  FaLayerGroup,
  FaCheckCircle,
  FaPlay,
  FaClipboardList,
  FaFileAlt,
  FaLaptopCode,
  FaArrowUp,
  FaTimes
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
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import type { CardProps, BoxProps, FlexProps } from '@chakra-ui/react';
import { chakra, keyframes } from "@emotion/react";
import styled from '@emotion/styled';
import StudentSidebar from '../components/layout/StudentSidebar/StudentSidebar';
import { useSidebar } from '../contexts/SidebarContext';

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<BoxProps, HTMLMotionProps<'div'>>;
type MotionFlexProps = Merge<FlexProps, HTMLMotionProps<'div'>>;
type MotionCardProps = Merge<CardProps, HTMLMotionProps<'div'>>;

const MotionCard = motion(Card) as React.ComponentType<MotionCardProps>;
const MotionBox = motion(Box) as React.ComponentType<MotionBoxProps>;
const MotionFlex = motion(Flex) as React.ComponentType<MotionFlexProps>;

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 }
};

// Typing animation
const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: currentColor;
  margin-left: 2px;
  animation: ${blink} 1s infinite;
  vertical-align: middle;
`;

const PoweredByText = styled.span`
  background: linear-gradient(to right, #cdf683, #4ae025);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  display: inline-block;
  padding-left: 0.5rem;
`;

interface Message {
  content: string;
  sender: 'user' | 'assistant';
}

interface SavedChat {
  id: string;
  name: string;
  messages: Message[];
  timestamp: number;
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

const SubjectCard: React.FC<{ 
  subject: { 
    name: string; 
    icon: IconType; 
    description: string; 
    gradient: string; 
    shadowColor: string; 
  }; 
  onSelect: (subject: string) => void; 
}> = React.memo(({ subject, onSelect }) => {
  return (
    <MotionCard
      onClick={() => onSelect(subject)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ willChange: 'transform' }}
    >
      <Box
        p={6}
        borderRadius="xl"
        bgGradient={subject.gradient}
        boxShadow={`0 4px 20px ${subject.shadowColor}`}
        cursor="pointer"
        _hover={{
          transform: 'translateY(-5px)',
          boxShadow: `0 6px 24px ${subject.shadowColor}`
        }}
        transition="all 0.3s"
      >
        <HStack spacing={4}>
          <Icon 
            as={subject.icon} 
            boxSize={8} 
            color="white"
            _groupHover={{ transform: 'rotate(10deg)' }}
            transition="transform 0.3s"
          />
          <VStack align="start" spacing={1}>
            <Text color="white" fontWeight="bold" fontSize="xl">
              {subject.name}
            </Text>
            <Text color="whiteAlpha.900" fontSize="sm">
              {subject.description}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </MotionCard>
  );
});

const StudentAIAssistant: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [selectedSubject, setSelectedSubject] = React.useState('');
  const [newMessage, setNewMessage] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isTyping, setIsTyping] = React.useState(false);
  const [showChatHistory, setShowChatHistory] = React.useState(false);
  const [isQuickTipsExpanded, setIsQuickTipsExpanded] = React.useState(true);
  const [showHistory, setShowHistory] = React.useState(false);
  const [showSavedChats, setShowSavedChats] = React.useState(false);
  const [savedChats, setSavedChats] = React.useState<SavedChat[]>([]);
  const [showSavedMessages, setShowSavedMessages] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('malaysian');
  const [selectedLevel, setSelectedLevel] = React.useState('secondary');
  const [savedMessages, setSavedMessages] = React.useState<{ [key: string]: Message & { saved: boolean } }>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const toast = useToast();
  const { colorMode } = useColorMode();

  // Constants for limits
  const MAX_MESSAGES = 50;
  const MAX_SAVED_CHATS = 20;

  // Theme colors
  const bgGradient = useColorModeValue("linear(to-br, #cdf683, #4ae025)", "linear(to-br, #1a1f17, #1a1f17)");
  const cardBg = useColorModeValue("rgba(255, 255, 255, 0.95)", "rgba(26, 32, 44, 0.95)");
  const hoverBg = useColorModeValue("rgba(100, 200, 255, 0.1)", "rgba(100, 200, 255, 0.1)");
  const borderColor = useColorModeValue("rgba(100, 200, 255, 0.2)", "rgba(100, 200, 255, 0.2)");
  const textColor = useColorModeValue("black", "white");
  const mutedColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const accentColor = useColorModeValue("#64c8ff", "#64c8ff");

  // Cleanup function for messages
  const addMessage = React.useCallback((newMessage: Message) => {
    setMessages(prev => [...prev.slice(-MAX_MESSAGES), newMessage]);
  }, []);

  // Cleanup function for saved chats
  const saveChat = React.useCallback(() => {
    if (messages.length === 0) return;

    const newSavedChat: SavedChat = {
      id: Date.now().toString(),
      name: `Chat ${savedChats.length + 1}`,
      messages: [...messages],
      timestamp: Date.now(),
    };

    setSavedChats(prev => [...prev.slice(-MAX_SAVED_CHATS), newSavedChat]);
    toast({
      title: 'Chat Saved',
      description: 'Your chat has been saved successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [messages, savedChats.length, toast]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file);
    }
  };

  const handleCameraClick = () => {
    // Handle camera activation logic here
    console.log('Camera clicked');
  };

  const handleSendMessage = React.useCallback(() => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      content: newMessage,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const assistantMessage: Message = {
        content: `Here's a response about ${selectedSubject}...`,
        sender: 'assistant'
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  }, [newMessage, selectedSubject]);

  const handleSaveMessage = (messageId: string) => {
    const message = messages[parseInt(messageId)];
    if (!message) return;

    setSavedMessages(prev => ({
      ...prev,
      [messageId]: {
        ...message,
        saved: !prev[messageId]?.saved
      }
    }));

    toast({
      title: prev[messageId]?.saved ? "Message removed from saved" : "Message saved",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteSavedMessage = (id: string) => {
    setSavedMessages(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    toast({
      title: "Message removed from saved",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteChat = (chatId: string) => {
    const updatedChats = savedChats.filter(chat => chat.id !== chatId);
    setSavedChats(updatedChats);
    toast({
      title: "Chat removed from saved",
      description: "The conversation has been removed from saved chats",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Optimized header styles with better performance
  const headerStyle = {
    background: 'linear-gradient(180deg, rgba(205, 246, 131, 0.15) 0%, rgba(181, 232, 83, 0.1) 100%)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(205, 246, 131, 0.2)',
    padding: '1.5rem',
    position: 'relative' as const,
    willChange: 'transform',
  };

  const iconContainerStyle = {
    position: 'relative' as const,
    padding: '0.5rem',
    borderRadius: '0.75rem',
    background: 'rgba(205, 246, 131, 0.08)',
    border: '1px solid rgba(205, 246, 131, 0.15)',
    willChange: 'transform',
  };

  const iconStyle = {
    color: '#CDF683',
    transition: 'transform 0.2s ease',
    _hover: {
      transform: 'scale(1.05)',
    }
  };

  const badgeStyle = {
    background: 'rgba(205, 246, 131, 0.08)',
    borderRadius: '9999px',
    padding: '0.5rem 1rem',
    border: '1px solid rgba(205, 246, 131, 0.2)',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
    _hover: {
      background: 'rgba(205, 246, 131, 0.12)',
      transform: 'translateY(-1px)',
    }
  };

  const typingAnimation = keyframes`
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  `;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Button styles
  const limeButtonStyle = {
    bg: '#CDF683',
    color: 'rgba(26, 32, 44, 0.95)',
    size: 'sm',
    fontWeight: 'medium',
    transition: 'all 0.2s',
    _hover: {
      bg: '#B5E853',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(205, 246, 131, 0.3)',
    },
    _active: {
      bg: '#98D626',
      transform: 'translateY(0)',
    }
  };

  const outlineLimeButtonStyle = {
    bg: 'transparent',
    color: '#CDF683',
    size: 'sm',
    fontWeight: 'medium',
    border: '1px solid',
    borderColor: '#CDF683',
    transition: 'all 0.2s',
    _hover: {
      bg: 'rgba(205, 246, 131, 0.1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(205, 246, 131, 0.15)',
    },
    _active: {
      bg: 'rgba(205, 246, 131, 0.2)',
      transform: 'translateY(0)',
    }
  };

  const cardStyle = React.useMemo(() => ({ willChange: 'transform' }), []);
  const messageStyle = React.useMemo(() => ({ willChange: 'opacity, transform' }), []);

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
        {/* Background Pattern */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.4}
          bg="url('/pattern.svg')"
          backgroundRepeat="repeat"
          pointerEvents="none"
        />

        {/* Main Content */}
        <Box
          position="relative"
          zIndex={1}
          h="100vh"
          display="flex"
          flexDirection="column"
        >
          {/* Header */}
          <Box
            w="full"
            {...headerStyle}
          >
            <Flex justify="space-between" align="center" maxW="1800px" mx="auto" w="100%" px={6}>
              <HStack spacing={4}>
                <Box {...iconContainerStyle}>
                  <Icon 
                    as={FaBrain} 
                    {...iconStyle}
                    boxSize={6}
                  />
                </Box>
                <VStack align="start" spacing={0}>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color="#CDF683"
                  >
                    AI Study Assistant
                  </Text>
                  <Text
                    fontSize="sm"
                    color="rgba(205, 246, 131, 0.8)"
                  >
                    Your Personal Learning Companion
                  </Text>
                </VStack>
              </HStack>

              <HStack spacing={4}>
                <Button
                  leftIcon={<FaSave />}
                  onClick={() => setShowSavedChats(true)}
                  isDisabled={savedChats.length === 0}
                  {...limeButtonStyle}
                >
                  Saved Chats
                </Button>
                <Button
                  leftIcon={<FaBookmark />}
                  onClick={() => setShowSavedMessages(true)}
                  isDisabled={Object.values(savedMessages).filter(msg => msg.saved).length === 0}
                  {...limeButtonStyle}
                >
                  Saved Messages
                </Button>
                <Button
                  leftIcon={<FaHistory />}
                  onClick={() => setShowHistory(true)}
                  {...outlineLimeButtonStyle}
                >
                  History
                </Button>
                <Box {...badgeStyle}>
                  <HStack spacing={2}>
                    <Text
                      fontSize="sm"
                      color="rgba(205, 246, 131, 0.7)"
                      fontStyle="italic"
                    >
                      Powered by
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      color="#CDF683"
                    >
                      Tree AI
                    </Text>
                  </HStack>
                </Box>
              </HStack>
            </Flex>
          </Box>

          {/* Content Area */}
          <Box flex="1" p={4} overflowY="auto">
            <VStack spacing={8} align="stretch" maxW="1400px" mx="auto">
              <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} mb={16}>
                {/* Left Side - Learning Dashboard */}
                <Box>
                  <VStack spacing={4} align="start" mb={6}>
                    <Text color="#CDF683" fontWeight="bold">LEARNING DASHBOARD</Text>
                    <Heading color="white" size="lg">Your Study Tools</Heading>
                  </VStack>

                  {/* Main Stats Row */}
                  <SimpleGrid columns={{ base: 2, xl: 2 }} spacing={4} mb={6}>
                    <Box
                      p={4}
                      bg="rgba(205, 246, 131, 0.1)"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="rgba(205, 246, 131, 0.2)"
                    >
                      <VStack spacing={1} align="start">
                        <Text color="whiteAlpha.700" fontSize="sm">Study Time Today</Text>
                        <Text color="white" fontSize="2xl" fontWeight="bold">2.5 hrs</Text>
                        <HStack spacing={1}>
                          <Icon as={FaArrowUp} color="#CDF683" boxSize={3} />
                          <Text color="#CDF683" fontSize="sm">12% from yesterday</Text>
                        </HStack>
                      </VStack>
                    </Box>
                    <Box
                      p={4}
                      bg="rgba(205, 246, 131, 0.1)"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="rgba(205, 246, 131, 0.2)"
                    >
                      <VStack spacing={1} align="start">
                        <Text color="whiteAlpha.700" fontSize="sm">Topics Covered</Text>
                        <Text color="white" fontSize="2xl" fontWeight="bold">12</Text>
                        <HStack spacing={1}>
                          <Icon as={FaCheckCircle} color="#CDF683" boxSize={3} />
                          <Text color="#CDF683" fontSize="sm">4 completed today</Text>
                        </HStack>
                      </VStack>
                    </Box>
                  </SimpleGrid>

                  {/* Study Timer */}
                  <Box
                    p={6}
                    mb={6}
                    bg="rgba(0, 0, 0, 0.3)"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="rgba(205, 246, 131, 0.15)"
                  >
                    <VStack spacing={4} align="start" width="100%">
                      <HStack justify="space-between" width="100%">
                        <HStack spacing={3}>
                          <Icon as={FaClock} color="#CDF683" boxSize={5} />
                          <Text color="white" fontWeight="bold" fontSize="lg">Pomodoro Timer</Text>
                        </HStack>
                        <Text color="#CDF683" fontSize="2xl" fontWeight="bold">25:00</Text>
                      </HStack>
                      <Progress
                        value={60}
                        size="sm"
                        width="100%"
                        borderRadius="full"
                        bg="rgba(205, 246, 131, 0.1)"
                        sx={{
                          '& > div': {
                            background: '#CDF683'
                          }
                        }}
                      />
                      <HStack spacing={3}>
                        <Button
                          leftIcon={<FaPlay />}
                          bg="#CDF683"
                          color="gray.800"
                          _hover={{ bg: '#bde472' }}
                          size="sm"
                        >
                          Start
                        </Button>
                        <Button
                          variant="outline"
                          borderColor="#CDF683"
                          color="#CDF683"
                          _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                          size="sm"
                        >
                          Reset
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>

                  {/* Tools Grid */}
                  <SimpleGrid columns={{ base: 2, xl: 2 }} spacing={4} mb={6}>
                    {[
                      {
                        title: "Flashcards",
                        description: "Review with spaced repetition",
                        icon: FaLayerGroup,
                        count: "32 cards"
                      },
                      {
                        title: "Practice Quiz",
                        description: "Test your knowledge",
                        icon: FaClipboardCheck,
                        count: "8 quizzes"
                      },
                      {
                        title: "Study Notes",
                        description: "Your saved notes",
                        icon: FaBook,
                        count: "15 notes"
                      },
                      {
                        title: "Progress",
                        description: "Track your learning",
                        icon: FaChartLine,
                        count: "View stats"
                      }
                    ].map((tool, index) => (
                      <Box
                        key={index}
                        p={4}
                        bg="rgba(0, 0, 0, 0.3)"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="rgba(205, 246, 131, 0.15)"
                        cursor="pointer"
                        _hover={{
                          bg: 'rgba(205, 246, 131, 0.05)',
                          borderColor: 'rgba(205, 246, 131, 0.3)'
                        }}
                        transition="all 0.2s"
                      >
                        <VStack align="start" spacing={3}>
                          <Icon as={tool.icon} color="#CDF683" boxSize={5} />
                          <VStack align="start" spacing={0}>
                            <Text color="white" fontWeight="bold">{tool.title}</Text>
                            <Text color="whiteAlpha.700" fontSize="sm">{tool.description}</Text>
                          </VStack>
                          <Text color="#CDF683" fontSize="sm">{tool.count}</Text>
                        </VStack>
                      </Box>
                    ))}
                  </SimpleGrid>

                  {/* Recent Activity */}
                  <Box
                    p={6}
                    bg="rgba(0, 0, 0, 0.3)"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="rgba(205, 246, 131, 0.15)"
                  >
                    <VStack align="start" spacing={4}>
                      <HStack spacing={3}>
                        <Icon as={FaHistory} color="#CDF683" boxSize={5} />
                        <Text color="white" fontWeight="bold" fontSize="lg">Recent Activity</Text>
                      </HStack>
                      <VStack align="start" spacing={3} width="100%">
                        {[
                          {
                            action: "Completed Quiz",
                            subject: "Mathematics",
                            time: "2 hours ago",
                            icon: FaCheckCircle
                          },
                          {
                            action: "Created Flashcards",
                            subject: "Physics",
                            time: "4 hours ago",
                            icon: FaLayerGroup
                          },
                          {
                            action: "Study Session",
                            subject: "Chemistry",
                            time: "Yesterday",
                            icon: FaClock
                          }
                        ].map((activity, index) => (
                          <HStack
                            key={index}
                            justify="space-between"
                            width="100%"
                            p={3}
                            bg="rgba(205, 246, 131, 0.05)"
                            borderRadius="md"
                          >
                            <HStack spacing={3}>
                              <Icon as={activity.icon} color="#CDF683" boxSize={4} />
                              <VStack align="start" spacing={0}>
                                <Text color="white" fontSize="sm">{activity.action}</Text>
                                <Text color="whiteAlpha.700" fontSize="xs">{activity.subject}</Text>
                              </VStack>
                            </HStack>
                            <Text color="whiteAlpha.600" fontSize="xs">{activity.time}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    </VStack>
                  </Box>
                </Box>

                {/* Right Side - Subjects */}
                <Box>
                  <VStack spacing={4} align="start" mb={6}>
                    <Text color="#CDF683" fontWeight="bold">SUBJECTS</Text>
                    <Heading color="white" size="lg">Choose Your Subject</Heading>
                    
                    {/* Education System Tabs */}
                    <Tabs 
                      variant="soft-rounded" 
                      colorScheme="green" 
                      onChange={(index) => setSelectedTab(index === 0 ? 'malaysian' : 'other')}
                      defaultIndex={0}
                      width="100%"
                    >
                      <TabList mb={4} bg="whiteAlpha.100" p={1} borderRadius="full">
                        <Tab 
                          _selected={{ 
                            bg: '#CDF683', 
                            color: 'gray.800' 
                          }}
                          color="white"
                          flex={1}
                        >
                          Malaysian
                        </Tab>
                        <Tab 
                          _selected={{ 
                            bg: '#CDF683', 
                            color: 'gray.800' 
                          }}
                          color="white"
                          flex={1}
                        >
                          Other
                        </Tab>
                      </TabList>
                      <TabPanels>
                        {/* Malaysian Subjects Panel */}
                        <TabPanel p={0}>
                          {/* Education Level Selector */}
                          <Box mb={6}>
                            <Tabs 
                              variant="soft-rounded" 
                              size="sm" 
                              onChange={(index) => {
                                const levels = ['primary', 'secondary', 'university'];
                                setSelectedLevel(levels[index]);
                              }}
                              defaultIndex={1}
                            >
                              <TabList bg="whiteAlpha.50" p={1} borderRadius="full" mb={4}>
                                <Tab 
                                  _selected={{ bg: 'whiteAlpha.200', color: '#CDF683' }}
                                  color="white"
                                  flex={1}
                                >
                                  Primary School
                                </Tab>
                                <Tab 
                                  _selected={{ bg: 'whiteAlpha.200', color: '#CDF683' }}
                                  color="white"
                                  flex={1}
                                >
                                  Secondary School
                                </Tab>
                                <Tab 
                                  _selected={{ bg: 'whiteAlpha.200', color: '#CDF683' }}
                                  color="white"
                                  flex={1}
                                >
                                  University
                                </Tab>
                              </TabList>
                              <TabPanels>
                                {/* Primary School Subjects */}
                                <TabPanel p={0}>
                                  <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6}>
                                    {[
                                      {
                                        name: "Bahasa Melayu",
                                        icon: FaLanguage,
                                        description: "Pemahaman, Penulisan, dan Tatabahasa",
                                        gradient: "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)",
                                        shadowColor: "rgba(255, 153, 102, 0.4)"
                                      },
                                      {
                                        name: "Matematik",
                                        icon: FaCalculator,
                                        description: "Nombor, Geometri, dan Pengukuran",
                                        gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
                                        shadowColor: "rgba(255, 107, 107, 0.4)"
                                      },
                                      {
                                        name: "Sains",
                                        icon: FaFlask,
                                        description: "Dunia Sains dan Teknologi",
                                        gradient: "linear-gradient(135deg, #11998E 0%, #38EF7D 100%)",
                                        shadowColor: "rgba(17, 153, 142, 0.4)"
                                      },
                                      {
                                        name: "Pendidikan Islam",
                                        icon: FaBook,
                                        description: "Asas Fardhu Ain dan Akhlak",
                                        gradient: "linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)",
                                        shadowColor: "rgba(0, 180, 219, 0.4)"
                                      },
                                      {
                                        name: "Bahasa Inggeris",
                                        icon: FaLanguage,
                                        description: "Reading, Writing, and Grammar",
                                        gradient: "linear-gradient(135deg, #834D9B 0%, #D04ED6 100%)",
                                        shadowColor: "rgba(131, 77, 155, 0.4)"
                                      }
                                    ].map((subject, index) => (
                                      <SubjectCard key={index} subject={subject} onSelect={() => {
                                        setSelectedSubject(subject.name);
                                        setIsChatOpen(true);
                                      }} />
                                    ))}
                                  </SimpleGrid>
                                </TabPanel>

                                {/* Secondary School Subjects */}
                                <TabPanel p={0}>
                                  <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6}>
                                    {[
                                      {
                                        name: "Matematik",
                                        icon: FaCalculator,
                                        description: "Algebra, Geometri, Statistik, dan Kebarangkalian",
                                        gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
                                        shadowColor: "rgba(255, 107, 107, 0.4)"
                                      },
                                      {
                                        name: "Matematik Tambahan",
                                        icon: FaCalculator,
                                        description: "Fungsi, Kalkulus, dan Matriks",
                                        gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
                                        shadowColor: "rgba(255, 107, 107, 0.4)"
                                      },
                                      {
                                        name: "Fizik",
                                        icon: FaAtom,
                                        description: "Mekanik, Elektrik, Gelombang, dan Fizik Moden",
                                        gradient: "linear-gradient(135deg, #4E54C8 0%, #8F94FB 100%)",
                                        shadowColor: "rgba(78, 84, 200, 0.4)"
                                      },
                                      {
                                        name: "Kimia",
                                        icon: FaFlask,
                                        description: "Kimia Organik, Tak Organik, dan Fizik",
                                        gradient: "linear-gradient(135deg, #11998E 0%, #38EF7D 100%)",
                                        shadowColor: "rgba(17, 153, 142, 0.4)"
                                      },
                                      {
                                        name: "Biologi",
                                        icon: FaDna,
                                        description: "Genetik, Ekologi, dan Biologi Manusia",
                                        gradient: "linear-gradient(135deg, #F857A6 0%, #FF5858 100%)",
                                        shadowColor: "rgba(248, 87, 166, 0.4)"
                                      },
                                      {
                                        name: "Sejarah",
                                        icon: FaLandmark,
                                        description: "Sejarah Malaysia dan Tamadun Dunia",
                                        gradient: "linear-gradient(135deg, #834D9B 0%, #D04ED6 100%)",
                                        shadowColor: "rgba(131, 77, 155, 0.4)"
                                      },
                                      {
                                        name: "Bahasa Melayu",
                                        icon: FaLanguage,
                                        description: "Tatabahasa, Karangan, dan Kesusasteraan",
                                        gradient: "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)",
                                        shadowColor: "rgba(255, 153, 102, 0.4)"
                                      },
                                      {
                                        name: "Pendidikan Islam",
                                        icon: FaBook,
                                        description: "Akidah, Ibadah, dan Akhlak",
                                        gradient: "linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)",
                                        shadowColor: "rgba(0, 180, 219, 0.4)"
                                      }
                                    ].map((subject, index) => (
                                      <SubjectCard key={index} subject={subject} onSelect={() => {
                                        setSelectedSubject(subject.name);
                                        setIsChatOpen(true);
                                      }} />
                                    ))}
                                  </SimpleGrid>
                                </TabPanel>

                                {/* University Subjects */}
                                <TabPanel p={0}>
                                  <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6}>
                                    {[
                                      {
                                        name: "Kalkulus",
                                        icon: FaCalculator,
                                        description: "Kalkulus Asas, Vektor, dan Analisis Kompleks",
                                        gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
                                        shadowColor: "rgba(255, 107, 107, 0.4)"
                                      },
                                      {
                                        name: "Fizik Kejuruteraan",
                                        icon: FaAtom,
                                        description: "Mekanik, Termodinamik, dan Elektromagnetik",
                                        gradient: "linear-gradient(135deg, #4E54C8 0%, #8F94FB 100%)",
                                        shadowColor: "rgba(78, 84, 200, 0.4)"
                                      },
                                      {
                                        name: "Pengaturcaraan",
                                        icon: FaLaptopCode,
                                        description: "Java, Python, dan Struktur Data",
                                        gradient: "linear-gradient(135deg, #6B66FF 0%, #A183FF 100%)",
                                        shadowColor: "rgba(107, 102, 255, 0.4)"
                                      },
                                      {
                                        name: "Statistik",
                                        icon: FaChartLine,
                                        description: "Statistik Gunaan dan Analisis Data",
                                        gradient: "linear-gradient(135deg, #11998E 0%, #38EF7D 100%)",
                                        shadowColor: "rgba(17, 153, 142, 0.4)"
                                      },
                                      {
                                        name: "Ekonomi",
                                        icon: FaChartLine,
                                        description: "Mikroekonomi dan Makroekonomi",
                                        gradient: "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)",
                                        shadowColor: "rgba(255, 153, 102, 0.4)"
                                      },
                                      {
                                        name: "Pengurusan",
                                        icon: FaLayerGroup,
                                        description: "Pengurusan Strategik dan Organisasi",
                                        gradient: "linear-gradient(135deg, #834D9B 0%, #D04ED6 100%)",
                                        shadowColor: "rgba(131, 77, 155, 0.4)"
                                      }
                                    ].map((subject, index) => (
                                      <SubjectCard key={index} subject={subject} onSelect={() => {
                                        setSelectedSubject(subject.name);
                                        setIsChatOpen(true);
                                      }} />
                                    ))}
                                  </SimpleGrid>
                                </TabPanel>
                              </TabPanels>
                            </Tabs>
                          </Box>
                        </TabPanel>

                        {/* Other Subjects Panel */}
                        <TabPanel p={0}>
                          <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6}>
                            {[
                              {
                                name: "Mathematics",
                                icon: FaCalculator,
                                description: "Algebra, Calculus, Geometry, and Statistics",
                                gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
                                shadowColor: "rgba(255, 107, 107, 0.4)"
                              },
                              {
                                name: "Physics",
                                icon: FaAtom,
                                description: "Mechanics, Electricity, Waves, and Modern Physics",
                                gradient: "linear-gradient(135deg, #4E54C8 0%, #8F94FB 100%)",
                                shadowColor: "rgba(78, 84, 200, 0.4)"
                              },
                              {
                                name: "Chemistry",
                                icon: FaFlask,
                                description: "Organic, Inorganic, and Physical Chemistry",
                                gradient: "linear-gradient(135deg, #11998E 0%, #38EF7D 100%)",
                                shadowColor: "rgba(17, 153, 142, 0.4)"
                              },
                              {
                                name: "Biology",
                                icon: FaDna,
                                description: "Genetics, Ecology, and Human Biology",
                                gradient: "linear-gradient(135deg, #F857A6 0%, #FF5858 100%)",
                                shadowColor: "rgba(248, 87, 166, 0.4)"
                              },
                              {
                                name: "Computer Science",
                                icon: FaLaptopCode,
                                description: "Programming, Data Structures, and Algorithms",
                                gradient: "linear-gradient(135deg, #6B66FF 0%, #A183FF 100%)",
                                shadowColor: "rgba(107, 102, 255, 0.4)"
                              },
                              {
                                name: "Languages",
                                icon: FaLanguage,
                                description: "English, Spanish, French, and More",
                                gradient: "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)",
                                shadowColor: "rgba(255, 153, 102, 0.4)"
                              },
                              {
                                name: "History",
                                icon: FaLandmark,
                                description: "World History, Civilizations, and Cultural Studies",
                                gradient: "linear-gradient(135deg, #834D9B 0%, #D04ED6 100%)",
                                shadowColor: "rgba(131, 77, 155, 0.4)"
                              },
                              {
                                name: "Geography",
                                icon: FaGlobe,
                                description: "Physical Geography, Maps, and Earth Science",
                                gradient: "linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)",
                                shadowColor: "rgba(86, 204, 242, 0.4)"
                              }
                            ].map((subject, index) => (
                              <SubjectCard key={index} subject={subject} onSelect={() => {
                                setSelectedSubject(subject.name);
                                setIsChatOpen(true);
                              }} />
                            ))}
                          </SimpleGrid>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </VStack>
                </Box>
              </Grid>

              {/* Chat Interface */}
              {isChatOpen && (
                <Box
                  position="fixed"
                  top={0}
                  right={0}
                  bottom={0}
                  left={0}
                  ml={isCollapsed ? "60px" : "240px"}
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
                    borderColor="rgba(205, 246, 131, 0.2)"
                    align="center"
                    justify="space-between"
                    bg="linear-gradient(180deg, rgba(205, 246, 131, 0.15) 0%, rgba(181, 232, 83, 0.1) 100%)"
                    backdropFilter="blur(20px)"
                    boxShadow="0 4px 30px rgba(0, 0, 0, 0.2)"
                  >
                    <HStack spacing={4}>
                      <IconButton
                        aria-label="Go back"
                        icon={<FaArrowLeft />}
                        variant="ghost"
                        color="#CDF683"
                        onClick={() => {
                          setIsChatOpen(false);
                          setSelectedSubject('');
                          setMessages([]);
                        }}
                        _hover={{
                          bg: 'rgba(205, 246, 131, 0.1)',
                          transform: 'scale(1.1)',
                        }}
                      />
                      <HStack spacing={3}>
                        <Icon
                          as={
                            selectedSubject === "Mathematics" ? FaCalculator :
                            selectedSubject === "Physics" ? FaAtom :
                            selectedSubject === "Chemistry" ? FaFlask :
                            selectedSubject === "Biology" ? FaDna :
                            selectedSubject === "Computer Science" ? FaLaptopCode :
                            selectedSubject === "Languages" ? FaLanguage :
                            selectedSubject === "History" ? FaLandmark :
                            selectedSubject === "Geography" ? FaGlobe :
                            FaBook
                          }
                          boxSize={6}
                          color="#CDF683"
                        />
                        <VStack align="start" spacing={0}>
                          <Text fontSize="lg" fontWeight="bold" color="#CDF683">
                            {selectedSubject}
                          </Text>
                          <Text fontSize="sm" color="rgba(205, 246, 131, 0.8)">
                            Student AI Assistant
                          </Text>
                        </VStack>
                      </HStack>
                    </HStack>

                    <HStack spacing={3}>
                      <Tooltip label="Save Chat" placement="top">
                        <IconButton
                          aria-label="Save chat"
                          icon={<FaSave />}
                          variant="solid"
                          onClick={saveChat}
                          bg="rgba(205, 246, 131, 0.15)"
                          color="#CDF683"
                          _hover={{
                            bg: 'rgba(205, 246, 131, 0.25)',
                            transform: 'translateY(-2px)',
                          }}
                          _active={{
                            bg: 'rgba(205, 246, 131, 0.3)',
                            transform: 'translateY(0)',
                          }}
                        />
                      </Tooltip>
                      <Tooltip label="View History" placement="top">
                        <IconButton
                          aria-label="View history"
                          icon={<FaHistory />}
                          variant="solid"
                          onClick={() => setShowHistory(true)}
                          bg="rgba(205, 246, 131, 0.15)"
                          color="#CDF683"
                          _hover={{
                            bg: 'rgba(205, 246, 131, 0.25)',
                            transform: 'translateY(-2px)',
                          }}
                          _active={{
                            bg: 'rgba(205, 246, 131, 0.3)',
                            transform: 'translateY(0)',
                          }}
                        />
                      </Tooltip>
                      <Tooltip label="Saved Messages" placement="top">
                        <IconButton
                          aria-label="Saved messages"
                          icon={<FaBookmark />}
                          variant="solid"
                          onClick={() => setShowSavedMessages(true)}
                          bg="rgba(205, 246, 131, 0.15)"
                          color="#CDF683"
                          _hover={{
                            bg: 'rgba(205, 246, 131, 0.25)',
                            transform: 'translateY(-2px)',
                          }}
                          _active={{
                            bg: 'rgba(205, 246, 131, 0.3)',
                            transform: 'translateY(0)',
                          }}
                        />
                      </Tooltip>
                      <Tooltip label="Settings" placement="top">
                        <IconButton
                          aria-label="Settings"
                          icon={<FiSettings />}
                          variant="solid"
                          bg="rgba(205, 246, 131, 0.15)"
                          color="#CDF683"
                          _hover={{
                            bg: 'rgba(205, 246, 131, 0.25)',
                            transform: 'translateY(-2px)',
                          }}
                          _active={{
                            bg: 'rgba(205, 246, 131, 0.3)',
                            transform: 'translateY(0)',
                          }}
                        />
                      </Tooltip>
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
                        <Icon as={FaLightbulb} color="#cdf683" boxSize={5} sx={iconStyle} />
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
                        _hover={{ 
                          color: "#cdf683",
                          transform: "scale(1.1)",
                        }}
                        transition="all 0.2s"
                      />
                    </Flex>
                    
                    <Collapse in={isQuickTipsExpanded} animateOpacity>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <Tip
                          icon={FaLightbulb}
                          text="Ask specific questions about topics you don't understand"
                        />
                        <Tip
                          icon={FaQuestionCircle}
                          text="Request step-by-step explanations for complex problems"
                        />
                        <Tip
                          icon={FaBook}
                          text="Practice with sample questions to test your understanding"
                        />
                        <Tip
                          icon={FaSave}
                          text="Save important explanations to review later"
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
                          p={4}
                          bgGradient={
                            message.sender === 'assistant'
                              ? "linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))"
                              : "linear(to-r, rgba(205, 246, 131, 0.15), rgba(205, 246, 131, 0.1))"
                          }
                          borderRadius="xl"
                          borderWidth="1px"
                          borderColor={message.sender === 'assistant' ? "whiteAlpha.100" : "rgba(205, 246, 131, 0.2)"}
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
                          style={messageStyle}
                        >
                          <HStack spacing={4} align="start">
                            <Avatar
                              size="sm"
                              icon={message.sender === 'assistant' ? <FaRobot /> : <FaUser />}
                              bg={message.sender === 'assistant' ? "green.500" : "blue.500"}
                            />
                            <VStack align="start" flex={1} spacing={1}>
                              <HStack spacing={2}>
                                <Text fontSize="sm" fontWeight="bold" color="whiteAlpha.900">
                                  {message.sender === 'assistant' ? "Student AI" : "You"}
                                </Text>
                                <Text fontSize="xs" color="whiteAlpha.600">
                                  {new Date().toLocaleTimeString()}
                                </Text>
                              </HStack>
                              <Text color="whiteAlpha.900">{message.content}</Text>
                            </VStack>
                            <HStack>
                              {message.sender === 'assistant' && (
                                <>
                                  <IconButton
                                    aria-label={savedMessages[index]?.saved ? "Unsave message" : "Save message"}
                                    icon={savedMessages[index]?.saved ? <FaBookmark /> : <FaRegBookmark />}
                                    variant="ghost"
                                    size="sm"
                                    color={savedMessages[index]?.saved ? "#cdf683" : "whiteAlpha.600"}
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
                                    color="whiteAlpha.900"
                                    _hover={{ color: "#cdf683" }}
                                  />
                                </>
                              )}
                            </HStack>
                          </HStack>
                        </Box>
                      ))}
                      
                      {/* Typing indicator */}
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
                    borderTop="1px solid"
                    borderColor="whiteAlpha.100"
                    bg="rgba(0, 0, 0, 0.2)"
                    backdropFilter="blur(10px)"
                  >
                    <HStack spacing={4}>
                      <IconButton
                        aria-label="Upload file"
                        icon={<Icon as={FaFileUpload} />}
                        variant="ghost"
                        color="#CDF683"
                        onClick={() => fileInputRef.current?.click()}
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                      />
                      <IconButton
                        aria-label="Open camera"
                        icon={<Icon as={FaCamera} />}
                        variant="ghost"
                        color="#CDF683"
                        onClick={handleCameraClick}
                      />
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        bg="rgba(0, 0, 0, 0.3)"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        _hover={{ borderColor: "whiteAlpha.300" }}
                        _focus={{ borderColor: "#64c8ff", boxShadow: "none" }}
                        color="whiteAlpha.900"
                        _placeholder={{ color: "whiteAlpha.400" }}
                      />
                      <IconButton
                        aria-label="Send message"
                        icon={<FaPaperPlane />}
                        onClick={handleSendMessage}
                        isDisabled={!newMessage.trim()}
                        sx={limeButtonStyle}
                      />
                    </HStack>
                  </Box>
                </Box>
              )}
            </VStack>
          </Box>
        </Box>
      </Box>

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
                  <Icon as={FaBookmark} color="#cdf683" boxSize={5} />
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
              {Object.entries(savedMessages).length === 0 ? (
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
                Object.entries(savedMessages).map(([id, message]) => {
                  if (!message.saved) return null;
                  return (
                    <Box
                      key={id}
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
                          <Text color="whiteAlpha.900">
                            {message.content}
                          </Text>
                        </VStack>
                        <IconButton
                          aria-label="Delete message"
                          icon={<FaTrash />}
                          variant="ghost"
                          size="sm"
                          color="red.400"
                          onClick={() => handleDeleteSavedMessage(id)}
                          _hover={{ 
                            color: "red.300",
                            bg: "whiteAlpha.200" 
                          }}
                        />
                      </HStack>
                    </Box>
                  );
                })
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

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
                  <Icon as={FaHistory} color="#cdf683" boxSize={5} sx={iconStyle} />
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
              {messages.length === 0 ? (
                <Box
                  p={4}
                  bgGradient="linear(to-r, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="whiteAlpha.100"
                  backdropFilter="blur(8px)"
                >
                  <Text color="whiteAlpha.600" fontSize="sm" textAlign="center">
                    No chat history yet. Start a conversation to see it here!
                  </Text>
                </Box>
              ) : (
                messages.map((msg, index) => (
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
                        icon={msg.sender === 'assistant' ? <FaRobot /> : <FaUser />}
                        bg={msg.sender === 'assistant' ? "green.500" : "blue.500"}
                      />
                      <VStack align="start" flex={1} spacing={1}>
                        <HStack spacing={2}>
                          <Text fontSize="sm" fontWeight="bold" color="whiteAlpha.900">
                            {msg.sender === 'assistant' ? 'AI Assistant' : 'You'}
                          </Text>
                          <Text fontSize="xs" color="whiteAlpha.600">
                            {new Date().toLocaleString()}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="whiteAlpha.900">
                          {msg.content}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))
              )}
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
                  <Icon as={FaSave} color="#cdf683" boxSize={5} sx={iconStyle} />
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
                    cursor="pointer"
                    onClick={() => {
                      setMessages(chat.messages);
                      setShowSavedChats(false);
                    }}
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
                            {chat.name}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChat(chat.id);
                        }}
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

export default React.memo(StudentAIAssistant);
