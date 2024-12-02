import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Textarea,
  Progress,
  Container,
  Divider,
  useToken,
  Grid,
  GridItem,
  Badge,
  Icon,
  Collapse,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import {
  FiSend,
  FiMic,
  FiPaperclip,
  FiImage,
  FiMoreVertical,
  FiCopy,
  FiShare2,
  FiBookmark,
  FiEdit3,
  FiTrash2,
  FiMaximize2,
} from 'react-icons/fi';
import {
  FaRobot,
  FaUserCircle,
  FaRegLightbulb,
  FaChartLine,
  FaTools,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaBook,
  FaBrain,
  FaUsers,
  FaChevronUp,
  FaChevronDown,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import DigitalTree from './DigitalTree';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionBadge = motion(Badge);

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  attachments?: Array<{
    type: 'image' | 'file';
    url: string;
    name: string;
  }>;
}

interface Tool {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
  gradient: string;
  stats?: {
    value: string;
    label: string;
  };
}

interface AITeachingAssistantProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const AITeachingAssistant: React.FC<AITeachingAssistantProps> = ({ isOpen, onOpen, onClose }) => {
  const { isOpen: isToolsOpen, onToggle: onToolsToggle } = useDisclosure({ defaultIsOpen: true });
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<{
    id: string;
    title: string;
    timestamp: string;
    type: 'performance' | 'suggestions' | 'resources' | 'curriculum' | 'collaboration' | 'ai-insights';
  }[]>([
    {
      id: '1',
      title: 'Student Performance Analysis',
      timestamp: 'Today',
      type: 'performance'
    },
    {
      id: '2',
      title: 'Lesson Planning Help',
      timestamp: 'Yesterday',
      type: 'curriculum'
    }
  ]);

  const [currentTip, setCurrentTip] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const quickTips = [
    {
      icon: FaChartLine,
      title: "Performance Analysis",
      description: "Track student progress and get insights",
      color: "#FF6B6B"
    },
    {
      icon: FaGraduationCap,
      title: "Learning Goals",
      description: "Set and monitor learning objectives",
      color: "#4ECDC4"
    },
    {
      icon: FaTools,
      title: "Teaching Tools",
      description: "Access educational resources and tools",
      color: "#FFD93D"
    },
    {
      icon: FaBrain,
      title: "AI Insights",
      description: "Get AI-powered teaching recommendations",
      color: "#95E1D3"
    }
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Theme colors
  const bgColor = useColorModeValue("gray.900", "gray.900");
  const cardBg = useColorModeValue("whiteAlpha.50", "whiteAlpha.50");
  const textColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");
  const mutedColor = useColorModeValue("whiteAlpha.600", "whiteAlpha.600");
  const accentColor = "#CDF683";
  const hoverBg = useColorModeValue("whiteAlpha.100", "whiteAlpha.100");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % quickTips.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessageWithTyping = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm here to help you with teaching! I can assist with lesson planning, student performance analysis, or any other teaching-related questions.",
        sender: 'ai',
        timestamp: new Date(),
        status: 'sent'
      };
      setIsTyping(false);
      setMessages(prev => [...prev, aiResponse]);
      scrollToBottom();
    }, 1500);
  };

  const handleNewConversation = (type: Tool['id']) => {
    const tool = tools.find(t => t.id === type);
    if (!tool) return;

    const newId = Date.now().toString();
    const newConversation = {
      id: newId,
      title: `New ${tool.name}`,
      timestamp: 'Just now',
      type: type as any
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversation(newId);
    setMessages([]);
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      status: 'success',
      duration: 2000,
      position: 'top',
    });
  };

  const tools: Tool[] = [
    {
      id: 'performance',
      name: 'Performance Analysis',
      icon: FaChartLine,
      description: 'Analyze student performance trends and insights',
      color: '#FF6B6B',
      gradient: 'linear(to-r, #FF6B6B, #FF8E8E)',
      stats: {
        value: '+24%',
        label: 'Improvement',
      },
    },
    {
      id: 'suggestions',
      name: 'Teaching Suggestions',
      icon: FaRegLightbulb,
      description: 'Get AI-powered teaching recommendations',
      color: '#4ECDC4',
      gradient: 'linear(to-r, #4ECDC4, #6EE7E7)',
      stats: {
        value: '12',
        label: 'New Ideas',
      },
    },
    {
      id: 'resources',
      name: 'Learning Resources',
      icon: FaBook,
      description: 'Access curated teaching materials',
      color: '#FFD93D',
      gradient: 'linear(to-r, #FFD93D, #FFE566)',
      stats: {
        value: '250+',
        label: 'Resources',
      },
    },
    {
      id: 'curriculum',
      name: 'Curriculum Planning',
      icon: FaChalkboardTeacher,
      description: 'Smart curriculum development assistance',
      color: '#FF9A9E',
      gradient: 'linear(to-r, #FF9A9E, #FECFEF)',
      stats: {
        value: '4',
        label: 'Templates',
      },
    },
    {
      id: 'collaboration',
      name: 'Team Collaboration',
      icon: FaUsers,
      description: 'Collaborate with other educators',
      color: '#A8E6CF',
      gradient: 'linear(to-r, #A8E6CF, #DDFFD6)',
      stats: {
        value: '15',
        label: 'Active Users',
      },
    },
    {
      id: 'ai-insights',
      name: 'AI Insights',
      icon: FaBrain,
      description: 'Advanced AI-driven teaching insights',
      color: '#FFB347',
      gradient: 'linear(to-r, #FFB347, #FFCC8F)',
      stats: {
        value: 'Real-time',
        label: 'Analysis',
      },
    },
  ];

  return (
    <>
      <IconButton
        aria-label="Open AI Assistant"
        icon={<FaRobot size={24} />}
        position="fixed"
        bottom="4"
        right="4"
        size="lg"
        bg={accentColor}
        color="black"
        onClick={onOpen}
        borderRadius="full"
        boxShadow="lg"
        _hover={{
          transform: 'scale(1.1)',
          bg: accentColor,
        }}
        transition="all 0.2s"
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="xl"
      >
        <DrawerOverlay backdropFilter="blur(10px)" bg="rgba(26, 32, 44, 0.3)" />
        <DrawerContent bg={bgColor}>
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-b, rgba(205, 246, 131, 0.05), rgba(26, 32, 44, 0.95))"
            pointerEvents="none"
          />
          <DigitalTree />

          <DrawerBody p={0}>
            <Flex h="100%" direction="column">
              {/* Header with Quick Tip */}
              <Box p={4} borderBottom="1px" borderColor={borderColor}>
                <VStack spacing={4} align="stretch">
                  <HStack spacing={3} justify="space-between">
                    <HStack>
                      <Icon as={FaRobot} color={accentColor} boxSize={6} />
                      <Text color={textColor} fontSize="xl">TREE8 AI Teaching Assistant</Text>
                    </HStack>
                    <DrawerCloseButton position="relative" top={0} right={0} />
                  </HStack>

                  {/* Quick Tip Section */}
                  <Box
                    p={4}
                    bg="rgba(205, 246, 131, 0.05)"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor={accentColor}
                    transition="all 0.3s"
                  >
                    <HStack spacing={4}>
                      <Icon 
                        as={quickTips[currentTip].icon} 
                        boxSize={8} 
                        color={quickTips[currentTip].color} 
                      />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" color={textColor}>
                          {quickTips[currentTip].title}
                        </Text>
                        <Text fontSize="sm" color={mutedColor}>
                          {quickTips[currentTip].description}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </VStack>
              </Box>

              {/* Main Content Area */}
              <Flex flex={1} overflow="hidden">
                {/* Left Sidebar */}
                <Box w="300px" borderRight="1px" borderColor={borderColor} h="100%" position="relative">
                  <Flex direction="column" h="100%">
                    <Box flex="1" overflowY="auto" p={4}>
                      <VStack spacing={4} align="stretch">
                        <Menu>
                          <MenuButton
                            as={Button}
                            rightIcon={<FaChevronDown />}
                            leftIcon={<FaChalkboardTeacher />}
                            bg={accentColor}
                            color="black"
                            _hover={{ bg: accentColor, opacity: 0.9 }}
                            w="full"
                          >
                            New Assistant
                          </MenuButton>
                          <MenuList 
                            bg="gray.900" 
                            borderColor={borderColor}
                            boxShadow="lg"
                            p={2}
                          >
                            {tools.map((tool) => (
                              <MenuItem
                                key={tool.id}
                                icon={<Icon as={tool.icon} color={accentColor} boxSize={5} />}
                                onClick={() => handleNewConversation(tool.id)}
                                bg="transparent"
                                _hover={{ bg: 'whiteAlpha.200' }}
                                borderRadius="md"
                                p={3}
                                mb={1}
                              >
                                <VStack align="start" spacing={1}>
                                  <Text color="white" fontWeight="semibold">{tool.name}</Text>
                                  <Text fontSize="xs" color="whiteAlpha.700">{tool.description}</Text>
                                </VStack>
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>

                        {/* Quick Actions */}
                        <VStack spacing={2} align="stretch">
                          {tools.slice(0, 4).map((tool) => (
                            <Button
                              key={tool.id}
                              leftIcon={<Icon as={tool.icon} />}
                              size="md"
                              variant="ghost"
                              justifyContent="flex-start"
                              _hover={{ bg: hoverBg }}
                              onClick={() => handleNewConversation(tool.id)}
                              w="full"
                              px={4}
                            >
                              <HStack spacing={3} width="100%">
                                <Text>{tool.name}</Text>
                                <Text fontSize="xs" color={mutedColor} ml="auto">
                                  {tool.stats?.value}
                                </Text>
                              </HStack>
                            </Button>
                          ))}
                        </VStack>

                        {/* Stats Section */}
                        <Box p={4} bg="rgba(205, 246, 131, 0.05)" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                          <VStack spacing={3} align="stretch">
                            <Text fontWeight="bold" color={textColor}>Quick Stats</Text>
                            <VStack spacing={3} align="stretch">
                              {tools.slice(0, 4).map((tool) => (
                                <HStack key={tool.id} justify="space-between">
                                  <Text fontSize="sm" color={mutedColor}>{tool.name}</Text>
                                  <Text fontWeight="bold" color={textColor}>{tool.stats?.value}</Text>
                                </HStack>
                              ))}
                            </VStack>
                          </VStack>
                        </Box>
                      </VStack>
                    </Box>

                    {/* Powered by Badge */}
                    <Box 
                      p={4} 
                      borderTop="1px" 
                      borderColor={borderColor}
                      bg="rgba(0, 0, 0, 0.3)"
                      backdropFilter="blur(10px)"
                    >
                      <VStack spacing={2} align="center">
                        <HStack spacing={2}>
                          <Icon as={FaRobot} color={accentColor} boxSize={5} />
                          <Text fontSize="sm" fontWeight="bold" bgGradient="linear(to-r, #CDF683, #4ECDC4)" bgClip="text">
                            TREE8 AI
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color={mutedColor}>Empowering Education with AI</Text>
                      </VStack>
                    </Box>
                  </Flex>
                </Box>

                {/* Chat Area */}
                <Flex flex={1} direction="column" h="100%">
                  {/* Messages */}
                  <VStack flex={1} spacing={4} p={4} overflowY="auto" align="stretch">
                    {messages.map((msg, index) => (
                      <MotionBox
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <HStack
                          spacing={2}
                          align="start"
                          justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                        >
                          {msg.sender === 'ai' && (
                            <Avatar size="sm" icon={<FaRobot />} bg={accentColor} color="black" />
                          )}
                          <Box
                            maxW="70%"
                            bg={msg.sender === 'user' ? accentColor : "rgba(205, 246, 131, 0.05)"}
                            color={msg.sender === 'user' ? 'black' : textColor}
                            p={4}
                            borderRadius="2xl"
                            position="relative"
                            boxShadow="lg"
                            borderWidth="1px"
                            borderColor={msg.sender === 'user' ? 'transparent' : borderColor}
                          >
                            <Text>{msg.text}</Text>
                            <HStack spacing={2} position="absolute" bottom="-6" right={0}>
                              <Text fontSize="xs" color={mutedColor}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </Text>
                            </HStack>
                          </Box>
                          {msg.sender === 'user' && (
                            <Avatar size="sm" icon={<FaUserCircle />} bg="gray.500" />
                          )}
                        </HStack>
                      </MotionBox>
                    ))}
                    {isTyping && (
                      <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HStack spacing={2} align="center">
                          <Avatar size="sm" icon={<FaRobot />} bg={accentColor} color="black" />
                          <Box
                            bg={cardBg}
                            p={3}
                            borderRadius="xl"
                            boxShadow="md"
                          >
                            <HStack spacing={2}>
                              <Text color={mutedColor}>AI is thinking</Text>
                              <Box as="span" animation="pulse 1s infinite">.</Box>
                              <Box as="span" animation="pulse 1s infinite" style={{ animationDelay: "0.2s" }}>.</Box>
                              <Box as="span" animation="pulse 1s infinite" style={{ animationDelay: "0.4s" }}>.</Box>
                            </HStack>
                          </Box>
                        </HStack>
                      </MotionBox>
                    )}
                    <div ref={messagesEndRef} />
                  </VStack>

                  {/* Input Area */}
                  <Box 
                    p={4} 
                    borderTop="1px" 
                    borderColor={borderColor}
                    bg={cardBg}
                  >
                    <VStack spacing={2}>
                      <HStack w="full" spacing={2}>
                        <Tooltip label="Coming soon: Voice input" placement="top">
                          <IconButton
                            aria-label="Voice input"
                            icon={<FiMic />}
                            variant="ghost"
                            color={mutedColor}
                            _hover={{ color: accentColor }}
                          />
                        </Tooltip>
                        <Textarea
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          placeholder="Type your message..."
                          resize="none"
                          rows={1}
                          bg="transparent"
                          border="none"
                          _focus={{
                            border: "none",
                            boxShadow: "none"
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessageWithTyping();
                            }
                          }}
                        />
                        <Tooltip label="Send message" placement="top">
                          <IconButton
                            aria-label="Send message"
                            icon={<FiSend />}
                            onClick={handleSendMessageWithTyping}
                            bg={accentColor}
                            color="black"
                            _hover={{
                              transform: 'translateX(2px)',
                              bg: accentColor
                            }}
                            transition="all 0.2s"
                            isDisabled={!inputMessage.trim()}
                          />
                        </Tooltip>
                      </HStack>
                      <HStack w="full" justify="center" spacing={4} color={mutedColor} fontSize="xs">
                        <Text>Press Enter to send</Text>
                        <Text>•</Text>
                        <Text>Shift + Enter for new line</Text>
                      </HStack>
                    </VStack>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AITeachingAssistant;
