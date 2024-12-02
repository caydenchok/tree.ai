import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Circle,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
  Image,
  Badge,
  Progress,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  UnorderedList,
  ListItem,
  type CardProps,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentSidebar from '../components/layout/StudentSidebar/StudentSidebar';
import { useSidebar } from '../contexts/SidebarContext';

import {
  FaSearch,
  FaFilter,
  FaBrain,
  FaBook,
  FaClock,
  FaCalendarAlt,
  FaFile,
  FaUpload,
  FaEye,
  FaTimes,
  FaRobot,
  FaLightbulb,
  FaChevronDown,
  FaChevronUp,
  FaCamera,
  FaCalculator,
  FaFlask,
  FaLaptopCode,
  FaPaperPlane,
  FaGraduationCap,
  FaCloudUploadAlt,
  FaChartLine,
  FaHandsHelping,
} from 'react-icons/fa';

interface Homework {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  type: 'essay' | 'quiz' | 'project';
  score?: number;
  totalScore?: number;
  description: string;
  attachments?: number;
  progress?: number;
  submittedFile?: string;
  imageUrl?: string;
  chatHistory?: { role: 'user' | 'assistant'; content: string }[];
}

const guideSteps = [
  {
    title: "Submit",
    description: "Upload homework files (PDF, DOC, TXT)",
    tip: "Keep files organized",
    icon: FaCloudUploadAlt,
    gradient: "linear(to-br, #FF6B6B, #FF8E53)",
    shadowColor: "rgba(255, 107, 107, 0.4)",
    accentColor: "#FFE5E5",
    lightColor: "#FFF0F0",
    iconColor: "#FFCECE"
  },
  {
    title: "AI Analysis",
    description: "Get instant feedback and suggestions",
    tip: "Use AI to improve your work",
    icon: FaBrain,
    gradient: "linear(to-br, #4FACFE, #00F2FE)",
    shadowColor: "rgba(79, 172, 254, 0.4)",
    accentColor: "#E5F6FF",
    lightColor: "#F0FAFF",
    iconColor: "#CEE5FF"
  },
  {
    title: "Track",
    description: "Monitor your homework progress",
    tip: "Filter by status",
    icon: FaChartLine,
    gradient: "linear(to-br, #43E97B, #38F9D7)",
    shadowColor: "rgba(67, 233, 123, 0.4)",
    accentColor: "#E5FFE5",
    lightColor: "#F0FFF0",
    iconColor: "#CEFFE5"
  },
  {
    title: "Snap",
    description: "Capture & detect questions",
    tip: "Good lighting helps",
    icon: FaCamera,
    gradient: "linear(to-br, #A18CD1, #FBC2EB)",
    shadowColor: "rgba(161, 140, 209, 0.4)",
    accentColor: "#F3E5FF",
    lightColor: "#F8F0FF",
    iconColor: "#E5CEFF"
  }
];

const StudentHomeworks: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [selectedHomework, setSelectedHomework] = React.useState<Homework | null>(null);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [aiAnalysis, setAiAnalysis] = React.useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isGuideCollapsed, setIsGuideCollapsed] = React.useState(false);
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [chatMessage, setChatMessage] = React.useState('');
  const [isAiTyping, setIsAiTyping] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const chatEndRef = React.useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Theme colors
  const bgGradient = "linear(to-br, brand.secondary, brand.dark.primary)";
  const cardBg = "rgba(0, 0, 0, 0.2)";
  const hoverBg = "rgba(205, 246, 131, 0.1)";
  const borderColor = "rgba(205, 246, 131, 0.2)";
  const textColor = "brand.white.primary";
  const mutedColor = "whiteAlpha.700";
  const accentColor = "#cdf683";

  // Theme colors and gradients
  const subjectGradients = {
    math: {
      gradient: "linear(to-br, #4CAF50, #8BC34A)",
      shadowColor: "rgba(139, 195, 74, 0.4)",
      icon: FaCalculator,
      description: "Mathematics"
    },
    science: {
      gradient: "linear(to-br, #64B5F6, #2196F3)",
      shadowColor: "rgba(33, 150, 243, 0.4)",
      icon: FaFlask,
      description: "Science"
    },
    literature: {
      gradient: "linear(to-br, #64B5F6, #2196F3)",
      shadowColor: "rgba(33, 150, 243, 0.4)",
      icon: FaBook,
      description: "Literature"
    },
    technology: {
      gradient: "linear(to-br, #64B5F6, #2196F3)",
      shadowColor: "rgba(33, 150, 243, 0.4)",
      icon: FaLaptopCode,
      description: "Technology"
    }
  };

  const cardGradients = [
    subjectGradients.math,
    subjectGradients.science,
    subjectGradients.literature,
    subjectGradients.technology,
  ];

  const homeworks: Homework[] = [
    {
      id: '1',
      title: 'Calculus Final Paper',
      course: 'Advanced Mathematics',
      dueDate: 'Tomorrow at 11:59 PM',
      status: 'pending',
      type: 'essay',
      description: 'Write a comprehensive paper on the applications of calculus in real-world scenarios.',
      attachments: 2,
      progress: 75,
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      course: 'Physics Fundamentals',
      dueDate: 'May 15, 2024',
      status: 'submitted',
      type: 'project',
      description: 'Document and analyze the results of our recent laboratory experiments.',
      attachments: 3,
      progress: 100,
      submittedFile: 'Physics Lab Report.pdf',
    },
    {
      id: '3',
      title: 'Literature Analysis Quiz',
      course: 'World Literature',
      dueDate: 'Completed',
      status: 'graded',
      type: 'quiz',
      score: 92,
      totalScore: 100,
      description: 'Quiz on the themes and symbolism in modern literature.',
    },
    {
      id: '4',
      title: 'Programming Project',
      course: 'Computer Science 101',
      dueDate: 'May 20, 2024',
      status: 'pending',
      type: 'project',
      description: 'Build a full-stack web application using React and Node.js.',
      attachments: 1,
      progress: 30,
    },
  ];

  const filteredHomeworks = homeworks.filter(homework => {
    const matchesSearch = homework.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         homework.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || homework.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'linear(to-br, #82B1FF, #2979FF)';
      case 'graded':
        return 'linear(to-br, #69F0AE, #00C853)';
      case 'overdue':
        return 'linear(to-br, #FF8A80, #FF5252)';
      default:
        return 'linear(to-br, #FFD740, #FFC400)';
    }
  };

  const cardStyle = {
    bg: "rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
    borderRadius: "xl",
    p: 6,
    position: "relative" as const,
    overflow: "hidden",
    borderWidth: '1px',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease-in-out',
    _hover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
      borderColor: 'rgba(205, 246, 131, 0.4)',
    },
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size should be less than 10MB",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Check file type
      const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        toast({
          title: "Error",
          description: "Invalid file type. Please upload PDF, DOC, DOCX, or TXT files",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setUploadedFile(file);
      // Simulate AI analysis
      setIsAnalyzing(true);
      setTimeout(() => {
        setAiAnalysis(
          "Based on your homework submission, here are some suggestions:\n\n" +
          "1. Your approach to problem-solving shows good understanding\n" +
          "2. Consider adding more examples to support your arguments\n" +
          "3. The conclusion could be strengthened with additional evidence\n\n" +
          "Would you like me to help you improve specific sections?"
        );
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  const handleSubmitHomework = async () => {
    if (!uploadedFile || !selectedHomework) {
      toast({
        title: "Error",
        description: "Please upload a file first",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to submit homework
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update homework status in the list
      const updatedHomeworks = homeworks.map(hw => {
        if (hw.id === selectedHomework.id) {
          return {
            ...hw,
            status: 'submitted' as const,
            progress: 100,
            submittedFile: uploadedFile.name
          };
        }
        return hw;
      });

      // Update the homeworks state
      // Note: In a real app, you would update this through Redux/Context
      homeworks.splice(0, homeworks.length, ...updatedHomeworks);

      toast({
        title: "Success",
        description: "Homework submitted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
      setUploadedFile(null);
      setAiAnalysis('');
      setSelectedHomework(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit homework. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Camera functions
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const imageUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageUrl);
      closeCamera();
      analyzeImage(imageUrl);
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const analyzeImage = async (imageUrl: string) => {
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add new homework with detected information
      const newHomework: Homework = {
        id: String(homeworks.length + 1),
        title: "Mathematics Problem Set",
        course: "Advanced Mathematics",
        dueDate: "In 1 week",
        status: "pending",
        type: "quiz",
        description: "AI detected question: Solve the quadratic equation and show your work.",
        progress: 0,
        imageUrl: imageUrl
      };
      
      homeworks.unshift(newHomework);
      
      toast({
        title: "Success",
        description: "New homework question detected and added!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !selectedHomework || isAiTyping) return;

    // Add user message
    const updatedHomework = {
      ...selectedHomework,
      chatHistory: [
        ...(selectedHomework.chatHistory || []),
        { role: 'user' as const, content: chatMessage }
      ]
    };

    // Update homework with new message
    const homeworkIndex = homeworks.findIndex(h => h.id === selectedHomework.id);
    if (homeworkIndex !== -1) {
      homeworks[homeworkIndex] = updatedHomework;
      setSelectedHomework(updatedHomework);
    }

    // Clear input and scroll to bottom
    setChatMessage('');
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Simulate AI thinking
    setIsAiTyping(true);
    setTimeout(() => {
      // Generate AI response based on the question
      const aiResponse = generateAIResponse(chatMessage);
      
      // Add AI response to chat
      const finalHomework = {
        ...updatedHomework,
        chatHistory: [
          ...(updatedHomework.chatHistory || []),
          { role: 'assistant' as const, content: aiResponse }
        ]
      };

      // Update homework with AI response
      if (homeworkIndex !== -1) {
        homeworks[homeworkIndex] = finalHomework;
        setSelectedHomework(finalHomework);
      }

      setIsAiTyping(false);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    // Simulate AI responses with helpful guidance instead of direct answers
    const responses = [
      "Let's break this down step by step. First, what do you understand about the problem?",
      "That's an interesting question! Have you tried applying the concepts we learned in class?",
      "Instead of giving you the answer, let me guide you through the thinking process. What information do we have?",
      "Good question! Let's approach this methodically. What formulas or concepts might be relevant here?",
      "I notice you're working on this problem. What specific part are you finding challenging?",
      "Before we dive in, can you explain your current approach? This will help me guide you better.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Optimized header styles with better performance
  const headerStyle = {
    position: 'sticky' as const,
    top: 0,
    zIndex: 10,
    background: 'linear-gradient(180deg, rgba(205, 246, 131, 0.15) 0%, rgba(181, 232, 83, 0.1) 100%)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(205, 246, 131, 0.2)',
    py: 4,
    transition: 'all 0.3s',
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
  };

  const badgeStyle = {
    background: 'rgba(205, 246, 131, 0.08)',
    borderRadius: '9999px',
    padding: '0.5rem 1rem',
    border: '1px solid rgba(205, 246, 131, 0.2)',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
  };

  const modalStyle = {
    bg: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(6px)',
    borderRadius: 'xl',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    color: 'white',
  };

  // Card gradients based on homework type
  const homeworkGradients = {
    essay: {
      gradient: "linear(to-br, #FF6B6B, #FF8E53)", // Warm orange
      shadowColor: "rgba(255, 107, 107, 0.4)",
      icon: FaBook
    },
    quiz: {
      gradient: "linear(to-br, #4FACFE, #00F2FE)", // Bright blue
      shadowColor: "rgba(79, 172, 254, 0.4)",
      icon: FaCalculator
    },
    project: {
      gradient: "linear(to-br, #43E97B, #38F9D7)", // Fresh green
      shadowColor: "rgba(67, 233, 123, 0.4)",
      icon: FaLaptopCode
    }
  };

  type Merge<P, T> = Omit<P, keyof T> & T;
  type MotionCardProps = Merge<CardProps, React.ComponentProps<typeof motion.div>>;

  const MotionCard = motion(Card) as React.ComponentType<MotionCardProps>;
  const MotionBox = motion(Box);

  return (
    <Box
      minH="100vh"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient={bgGradient}
        opacity={0.9}
        zIndex={-1}
      />

      <Flex h="100vh">
        <StudentSidebar />
        <Box
          transition="all 0.3s"
          flex={1}
          position="relative"
          ml={isCollapsed ? "60px" : "240px"}
          display="flex"
          flexDirection="column"
        >
          {/* Header */}
          <Box
            position="sticky"
            top={0}
            height="76px"
            zIndex={999}
            background="linear-gradient(180deg, rgba(205, 246, 131, 0.15) 0%, rgba(181, 232, 83, 0.1) 100%)"
            backdropFilter="blur(10px)"
            borderBottom="1px solid rgba(205, 246, 131, 0.2)"
            py={4}
            transition="all 0.3s ease"
          >
            <Flex justify="space-between" align="center" px={6}>
              <HStack spacing={4}>
                <Box {...iconContainerStyle}>
                  <Icon 
                    as={FaGraduationCap}
                    {...iconStyle}
                    boxSize={6}
                  />
                </Box>
                <VStack align="start" spacing={0}>
                  <Text fontSize="xl" fontWeight="bold" color="#CDF683">
                    Student Homeworks
                  </Text>
                  <Text fontSize="sm" color="rgba(205, 246, 131, 0.8)">
                    Your Learning Journey
                  </Text>
                </VStack>
              </HStack>
              <Box {...badgeStyle}>
                <HStack spacing={2}>
                  <Text fontSize="sm" color="rgba(205, 246, 131, 0.7)" fontStyle="italic">
                    Powered by
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color="#CDF683">
                    Tree AI
                  </Text>
                </HStack>
              </Box>
            </Flex>
          </Box>

          {/* Main Content */}
          <Box flex={1} overflowY="auto" p={6}>
            {/* Search and Filter Section */}
            <Flex gap={4} wrap="wrap" mb={8}>
              <InputGroup maxW="400px">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaSearch} color={mutedColor} />
                </InputLeftElement>
                <Input
                  placeholder="Search homeworks..."
                  bg={cardBg}
                  border="1px solid"
                  borderColor={borderColor}
                  color={textColor}
                  _hover={{ borderColor: 'rgba(205, 246, 131, 0.4)' }}
                  _focus={{ 
                    borderColor: 'brand.primary',
                    boxShadow: '0 0 0 1px rgba(205, 246, 131, 0.4)'
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
              <Select
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                color={textColor}
                _hover={{ borderColor: 'rgba(205, 246, 131, 0.4)' }}
                _focus={{ 
                  borderColor: 'brand.primary',
                  boxShadow: '0 0 0 1px rgba(205, 246, 131, 0.4)'
                }}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                w="auto"
                minW="150px"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="graded">Graded</option>
                <option value="overdue">Overdue</option>
              </Select>
              <Button
                leftIcon={<FaUpload />}
                bg="rgba(205, 246, 131, 0.15)"
                color="#cdf683"
                _hover={{ 
                  bg: "rgba(205, 246, 131, 0.3)",
                  transform: "translateY(-2px)"
                }}
                transition="all 0.2s"
                onClick={() => {
                  setFilterStatus('all');
                  setSelectedHomework(null);
                  onOpen();
                }}
              >
                Submit Homework
              </Button>
            </Flex>

            {/* Tutorial Cards */}
            <Box 
              mt={6} 
              position="relative"
              zIndex={2}
              mb={8}
            >
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md" color="white">Quick Guide</Heading>
                <Button
                  size="sm"
                  variant="ghost"
                  bg="transparent"
                  onClick={() => setIsGuideCollapsed(!isGuideCollapsed)}
                  leftIcon={isGuideCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                  _hover={{ bg: "whiteAlpha.100" }}
                >
                  {isGuideCollapsed ? "Show Guide" : "Hide Guide"}
                </Button>
              </Flex>

              <Box 
                position="relative" 
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <AnimatePresence initial={false}>
                  {!isGuideCollapsed && (
                    <MotionBox
                      initial={false}
                      layout
                      style={{
                        position: 'relative',
                        width: '100%',
                      }}
                      animate={{
                        opacity: 1,
                        height: 'auto',
                        transition: {
                          duration: 0.3,
                          ease: 'easeInOut',
                        },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: {
                          duration: 0.3,
                          ease: 'easeInOut',
                        },
                      }}
                    >
                      <SimpleGrid 
                        columns={{ base: 1, md: 2, lg: 4 }} 
                        spacing={4}
                      >
                        {guideSteps.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={false}
                            layout
                            style={{
                              transform: 'translate3d(0,0,0)',
                              backfaceVisibility: 'hidden'
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Box
                              p={6}
                              borderRadius="xl"
                              position="relative"
                              overflow="hidden"
                              cursor="pointer"
                              bgGradient={step.gradient}
                              boxShadow={`0 4px 20px ${step.shadowColor}`}
                              _hover={{
                                transform: 'translateY(-5px)',
                                boxShadow: `0 8px 30px ${step.shadowColor}`
                              }}
                              transition="all 0.3s"
                              style={{
                                contain: 'paint'
                              }}
                            >
                              <VStack spacing={4} align="start">
                                <Icon
                                  as={step.icon}
                                  boxSize={8}
                                  color={step.iconColor}
                                  _groupHover={{ transform: 'scale(1.1)' }}
                                  transition="transform 0.3s"
                                />
                                <VStack spacing={2} align="start">
                                  <Text color={step.lightColor} fontWeight="bold" fontSize="xl">
                                    {step.title}
                                  </Text>
                                  <Text color={step.accentColor} fontSize="sm">
                                    {step.description}
                                  </Text>
                                  <Text color={step.iconColor} fontSize="xs" fontStyle="italic">
                                    Tip: {step.tip}
                                  </Text>
                                </VStack>
                              </VStack>
                            </Box>
                          </motion.div>
                        ))}
                      </SimpleGrid>
                    </MotionBox>
                  )}
                </AnimatePresence>
              </Box>
            </Box>

            {/* Homework Cards Section */}
            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              spacing={6}
            >
              {filteredHomeworks.map((homework) => (
                <MotionCard
                  key={homework.id}
                  {...cardStyle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                    borderColor: "rgba(205, 246, 131, 0.4)"
                  }}
                >
                  <CardBody>
                    <VStack align="stretch" spacing={4}>
                      <Flex justify="space-between" align="center">
                        <Badge
                          bg={
                            homework.status === 'graded'
                              ? '#CDF683'
                              : homework.status === 'submitted'
                              ? '#63B3ED'
                              : '#F6E05E'
                          }
                          color="gray.800"
                          px={2}
                          py={1}
                          borderRadius="full"
                          textTransform="capitalize"
                          fontWeight="600"
                        >
                          {homework.status}
                        </Badge>
                        <HStack>
                          <Icon as={FaCalendarAlt} color={mutedColor} boxSize={3} />
                          <Text color={mutedColor} fontSize="sm">
                            {homework.dueDate}
                          </Text>
                        </HStack>
                      </Flex>
                      <Box>
                        <Heading size="md" color={textColor} mb={1}>
                          {homework.title}
                        </Heading>
                        <Text color={mutedColor} fontSize="sm">
                          {homework.course}
                        </Text>
                      </Box>
                      <Text color={mutedColor} noOfLines={2} fontSize="sm">
                        {homework.description}
                      </Text>
                      {homework.progress !== undefined && (
                        <Box>
                          <Flex justify="space-between" mb={2}>
                            <Text color={mutedColor} fontSize="sm">Progress</Text>
                            <Text color={textColor} fontSize="sm">{homework.progress}%</Text>
                          </Flex>
                          <Progress 
                            value={homework.progress} 
                            size="sm" 
                            borderRadius="full"
                            bg="whiteAlpha.200"
                            sx={{
                              '& > div': {
                                bgGradient: 'linear(to-r, #CDF683, #B5E853)',
                              }
                            }}
                          />
                        </Box>
                      )}
                      {homework.score !== undefined && (
                        <Flex justify="space-between" align="center">
                          <Text color={mutedColor} fontSize="sm">Score</Text>
                          <Badge
                            bg={
                              homework.status === 'graded'
                                ? '#CDF683'
                                : homework.status === 'submitted'
                                ? '#63B3ED'
                                : '#F6E05E'
                            }
                            color="gray.800"
                            px={2}
                            py={1}
                            borderRadius="full"
                            textTransform="capitalize"
                            fontWeight="600"
                          >
                            {homework.score}/{homework.totalScore}
                          </Badge>
                        </Flex>
                      )}
                      {homework.imageUrl && (
                        <Box
                          borderRadius="md"
                          overflow="hidden"
                          mb={2}
                        >
                          <Image
                            src={homework.imageUrl}
                            alt="Question"
                            w="100%"
                            h="150px"
                            objectFit="cover"
                          />
                        </Box>
                      )}
                      <Flex justify="space-between" align="center" mt={2}>
                        {homework.submittedFile && (
                          <Text fontSize="sm" color="whiteAlpha.800" mb={2}>
                            Last submitted: <Text as="span" color={accentColor}>{homework.submittedFile}</Text>
                          </Text>
                        )}
                        <HStack spacing={2}>
                          <IconButton
                            aria-label="AI Help"
                            icon={<FaBrain />}
                            size="sm"
                            variant="outline"
                            borderColor={accentColor}
                            color={accentColor}
                            onClick={() => {
                              setSelectedHomework(homework);
                              setIsChatOpen(true);
                            }}
                            _hover={{
                              bg: "rgba(205, 246, 131, 0.1)",
                              transform: "scale(1.1)",
                            }}
                            transition="all 0.2s"
                          />
                          <Button
                            leftIcon={<FaUpload />}
                            size="sm"
                            variant="outline"
                            borderColor={accentColor}
                            color={accentColor}
                            _hover={{ bg: hoverBg }}
                            onClick={() => {
                              setSelectedHomework(homework);
                              onOpen();
                            }}
                            isDisabled={homework.status === 'graded'}
                          >
                            {homework.status === 'submitted' ? 'Modify' : 'Submit'}
                          </Button>
                        </HStack>
                      </Flex>
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
        <ModalContent
          {...modalStyle}
        >
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            {...headerStyle}
          >
            <Flex justify="space-between" align="center" width="100%">
              <HStack spacing={4}>
                <Box {...iconContainerStyle}>
                  <Icon 
                    as={FaUpload} 
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
                    Submit Homework
                  </Text>
                  <Text
                    fontSize="sm"
                    color="rgba(205, 246, 131, 0.8)"
                  >
                    {selectedHomework ? selectedHomework.course : 'Upload your work'}
                  </Text>
                </VStack>
              </HStack>

              <HStack spacing={4}>
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
                <IconButton
                  aria-label="Close modal"
                  icon={<FaTimes />}
                  size="sm"
                  variant="ghost"
                  color="whiteAlpha.700"
                  onClick={onClose}
                  _hover={{
                    color: "#CDF683",
                    transform: "rotate(90deg)",
                    bg: "rgba(205, 246, 131, 0.1)",
                  }}
                  transition="all 0.2s"
                />
              </HStack>
            </Flex>
          </ModalHeader>
          <ModalBody py={6}>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontWeight="medium" mb={2}>
                  {selectedHomework?.title}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.700">
                  {selectedHomework?.description}
                </Text>
                {selectedHomework?.submittedFile && (
                  <Text fontSize="sm" color="whiteAlpha.600" mt={2}>
                    Previously submitted: <Text as="span" color={accentColor}>{selectedHomework.submittedFile}</Text>
                  </Text>
                )}
              </Box>

              <FormControl>
                <FormLabel>Upload Your Work</FormLabel>
                <Input
                  type="file"
                  display="none"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                />
                <Button
                  leftIcon={<FaUpload />}
                  onClick={() => fileInputRef.current?.click()}
                  w="full"
                  bg="whiteAlpha.200"
                  _hover={{ bg: "whiteAlpha.300" }}
                  mb={2}
                >
                  {uploadedFile ? uploadedFile.name : "Choose File"}
                </Button>
                <Text fontSize="xs" color="whiteAlpha.600">
                  Supported formats: PDF, DOC, DOCX, TXT (Max size: 10MB)
                </Text>
              </FormControl>

              {uploadedFile && (
                <Box
                  bg="whiteAlpha.100"
                  p={4}
                  borderRadius="md"
                  border="1px dashed"
                  borderColor="brand.primary"
                >
                  <HStack spacing={3} mb={isAnalyzing ? 4 : 0}>
                    <Icon as={FaRobot} color="brand.primary" />
                    <Text fontWeight="medium">AI Analysis</Text>
                  </HStack>
                  
                  {isAnalyzing ? (
                    <Progress
                      size="xs"
                      isIndeterminate
                      colorScheme="green"
                      bg="whiteAlpha.100"
                    />
                  ) : aiAnalysis && (
                    <VStack align="stretch" spacing={4} mt={4}>
                      <Text whiteSpace="pre-line" fontSize="sm">
                        {aiAnalysis}
                      </Text>
                      <HStack>
                        <Icon as={FaLightbulb} color="yellow.400" />
                        <Text fontSize="sm" color="whiteAlpha.800">
                          Ask AI for help with specific topics or questions
                        </Text>
                      </HStack>
                    </VStack>
                  )}
                </Box>
              )}

              <Button
                colorScheme="green"
                size="lg"
                isDisabled={!uploadedFile}
                isLoading={isSubmitting}
                loadingText="Submitting..."
                onClick={handleSubmitHomework}
                bgGradient="linear(to-r, #CDF683, #98E5BE)"
                color="gray.800"
                _hover={{
                  bgGradient: "linear(to-r, #bde772, #89d4ad)",
                }}
                _active={{
                  bgGradient: "linear(to-r, #aed35f, #7ac39c)",
                }}
              >
                {selectedHomework?.status === 'submitted' ? 'Update Submission' : 'Submit Homework'}
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* AI Chat Overlay */}
      <Modal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        size="xl"
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay
          bg="rgba(0, 0, 0, 0.3)"
          backdropFilter="blur(12px) saturate(150%)"
          transition="all 0.3s ease-in-out"
        />
        <ModalContent
          bg="rgba(18, 18, 18, 0.75)"
          backdropFilter="blur(16px) saturate(180%)"
          borderRadius="2xl"
          border="1px solid rgba(255, 255, 255, 0.1)"
          boxShadow={`
            0 0 0 1px rgba(255, 255, 255, 0.05),
            0 4px 6px rgba(0, 0, 0, 0.1),
            0 12px 24px rgba(0, 0, 0, 0.2)
          `}
          color="white"
          maxH="85vh"
          overflow="hidden"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0) 100%)",
            pointerEvents: "none",
          }}
        >
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            {...headerStyle}
          >
            <HStack spacing={4}>
              <Box {...iconContainerStyle}>
                <Icon 
                  as={FaBrain} 
                  {...iconStyle}
                  boxSize={6}
                />
                <Box
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  w="8px"
                  h="8px"
                  borderRadius="full"
                  bg="#4CAF50"
                  border="2px solid rgba(18, 18, 18, 0.95)"
                  boxShadow="0 0 8px rgba(205, 246, 131, 0.5)"
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
                <HStack spacing={2}>
                  <Text
                    fontSize="sm"
                    color="rgba(205, 246, 131, 0.8)"
                  >
                    {selectedHomework?.course}
                  </Text>
                  <Box 
                    position="relative" 
                    display="flex" 
                    alignItems="center"
                  >
                    <Box
                      w="8px"
                      h="8px"
                      borderRadius="full"
                      bg="#4CAF50"
                      position="relative"
                      animation="pulse 2s infinite"
                      sx={{
                        '@keyframes pulse': {
                          '0%': {
                            transform: 'scale(0.95)',
                            boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)',
                          },
                          '70%': {
                            transform: 'scale(1)',
                            boxShadow: '0 0 0 6px rgba(76, 175, 80, 0)',
                          },
                          '100%': {
                            transform: 'scale(0.95)',
                            boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
                          },
                        },
                      }}
                    />
                    <Text fontSize="sm" ml={2} color="rgba(205, 246, 131, 0.7)">Online</Text>
                  </Box>
                </HStack>
              </VStack>
            </HStack>
            <IconButton
              aria-label="Close"
              icon={<FaTimes />}
              variant="ghost"
              borderRadius="xl"
              color="rgba(205, 246, 131, 0.7)"
              onClick={() => setIsChatOpen(false)}
              _hover={{ 
                bg: "rgba(205, 246, 131, 0.1)",
                transform: "scale(1.05)",
                color: "rgba(205, 246, 131, 0.9)"
              }}
              transition="all 0.2s"
            />
          </ModalHeader>

          <ModalBody 
            py={6} 
            px={6}
            display="flex"
            flexDirection="column"
          >
            <VStack spacing={6} h="full">
              {/* Chat Messages */}
              <VStack
                spacing={4}
                w="full"
                flex={1}
                overflowY="auto"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '3px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '3px',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.15)',
                    },
                  },
                }}
                pb={4}
              >
                {/* Initial AI Message */}
                {(!selectedHomework?.chatHistory || selectedHomework.chatHistory.length === 0) && (
                  <Box
                    bg="rgba(255, 255, 255, 0.03)"
                    p={6}
                    borderRadius="2xl"
                    w="full"
                    border="1px solid rgba(255, 255, 255, 0.05)"
                    position="relative"
                    _before={{
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "100%",
                      background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.03), transparent)",
                      borderRadius: "2xl",
                      pointerEvents: "none",
                    }}
                  >
                    <VStack align="start" spacing={4}>
                      <HStack spacing={3} align="center">
                        <Icon 
                          as={FaBrain} 
                          color="rgba(205, 246, 131, 0.9)"
                          boxSize={5}
                          filter="drop-shadow(0 0 8px rgba(205, 246, 131, 0.4))"
                        />
                        <Text fontWeight="bold" fontSize="lg">
                          👋 Hi! I'm your AI study assistant
                        </Text>
                      </HStack>
                      <Text color="whiteAlpha.900">I can help you with:</Text>
                      <UnorderedList spacing={3} pl={4} w="full">
                        {[
                          "Breaking down complex problems into simpler steps",
                          "Providing helpful hints and learning strategies",
                          "Explaining related concepts and theory",
                          "Suggesting relevant study resources"
                        ].map((item, index) => (
                          <ListItem 
                            key={index}
                            color="whiteAlpha.900"
                            _before={{
                              content: '""',
                              display: "inline-block",
                              width: "6px",
                              height: "6px",
                              borderRadius: "full",
                              bg: "rgba(205, 246, 131, 0.9)",
                              marginRight: "10px",
                              transform: "translateY(-2px)"
                            }}
                          >
                            {item}
                          </ListItem>
                        ))}
                      </UnorderedList>
                      <Box
                        mt={2}
                        p={3}
                        bg="rgba(255, 255, 255, 0.02)"
                        borderRadius="xl"
                        w="full"
                        border="1px solid rgba(255, 255, 255, 0.05)"
                      >
                        <Text fontSize="sm" color="whiteAlpha.900">
                          💡 Remember: I'm here to guide your learning journey, not to provide direct answers!
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                )}

                {/* Chat History */}
                {selectedHomework?.chatHistory?.map((msg, index) => (
                  <Box
                    key={index}
                    alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                    maxW="80%"
                    position="relative"
                  >
                    <Box
                      bg={msg.role === 'user' 
                        ? 'rgba(205, 246, 131, 0.1)' 
                        : 'rgba(255, 255, 255, 0.03)'}
                      p={4}
                      borderRadius={msg.role === 'user' ? '2xl 2xl 0 2xl' : '2xl 2xl 2xl 0'}
                      border="1px solid"
                      borderColor={msg.role === 'user' 
                        ? 'rgba(205, 246, 131, 0.15)' 
                        : 'rgba(255, 255, 255, 0.05)'}
                      position="relative"
                      _before={{
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "100%",
                        background: msg.role === 'user'
                          ? "linear-gradient(180deg, rgba(205, 246, 131, 0.05) 0%, transparent 100%)"
                          : "linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)",
                        borderRadius: "inherit",
                        pointerEvents: "none",
                      }}
                    >
                      <Text color="white">{msg.content}</Text>
                    </Box>
                    <Text
                      fontSize="xs"
                      color="whiteAlpha.500"
                      mt={1}
                      textAlign={msg.role === 'user' ? 'right' : 'left'}
                    >
                      {msg.role === 'user' ? 'You' : 'AI Assistant'} • Just now
                    </Text>
                  </Box>
                ))}

                {/* AI Typing Indicator */}
                {isAiTyping && (
                  <Box alignSelf="flex-start" maxW="80%">
                    <Box
                      bg="rgba(255, 255, 255, 0.03)"
                      p={4}
                      borderRadius="2xl 2xl 2xl 0"
                      border="1px solid rgba(255, 255, 255, 0.05)"
                    >
                      <HStack spacing={3}>
                        <Icon 
                          as={FaBrain} 
                          color="rgba(205, 246, 131, 0.9)"
                          filter="drop-shadow(0 0 8px rgba(205, 246, 131, 0.4))"
                        />
                        <HStack spacing={1}>
                          {[0, 1, 2].map((i) => (
                            <Box
                              key={i}
                              w="8px"
                              h="8px"
                              borderRadius="full"
                              bg="rgba(205, 246, 131, 0.9)"
                              opacity={0.6}
                              animation={`typing 1s infinite ${i * 0.3}s`}
                              sx={{
                                '@keyframes typing': {
                                  '0%, 100%': {
                                    transform: 'translateY(0)',
                                  },
                                  '50%': {
                                    transform: 'translateY(-4px)',
                                  },
                                },
                              }}
                            />
                          ))}
                        </HStack>
                      </HStack>
                    </Box>
                    <Text
                      fontSize="xs"
                      color="whiteAlpha.500"
                      mt={1}
                    >
                      AI Assistant is typing...
                    </Text>
                  </Box>
                )}

                {/* Scroll anchor */}
                <div ref={chatEndRef} />
              </VStack>

              {/* Message Input */}
              <Box
                w="full"
                bg="rgba(255, 255, 255, 0.02)"
                borderRadius="2xl"
                p={2}
                border="1px solid rgba(255, 255, 255, 0.05)"
                position="relative"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: "2xl",
                  background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.03), transparent)",
                  pointerEvents: "none",
                }}
              >
                <HStack w="full" spacing={2}>
                  <Input
                    placeholder="Ask for help with your homework..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    bg="transparent"
                    border="none"
                    _hover={{ borderColor: 'none' }}
                    _focus={{ border: 'none', boxShadow: 'none' }}
                    color="white"
                    fontSize="sm"
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
                    size="md"
                    borderRadius="xl"
                    bg={chatMessage.trim() ? "rgba(205, 246, 131, 0.9)" : "rgba(255, 255, 255, 0.05)"}
                    color={chatMessage.trim() ? "gray.800" : "whiteAlpha.400"}
                    _hover={{
                      bg: chatMessage.trim() ? "rgba(205, 246, 131, 1)" : "rgba(255, 255, 255, 0.08)",
                      transform: chatMessage.trim() ? "translateY(-1px)" : "none"
                    }}
                    _active={{
                      transform: "translateY(0)"
                    }}
                    onClick={handleSendMessage}
                    isDisabled={!chatMessage.trim() || isAiTyping}
                    transition="all 0.2s"
                  />
                </HStack>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Camera Modal */}
      <Modal isOpen={isCameraOpen} onClose={closeCamera} size="xl">
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
        <ModalContent
          bg="rgba(255, 255, 255, 0.08)"
          backdropFilter="blur(20px)"
          borderRadius="xl"
          border="1px solid rgba(255, 255, 255, 0.1)"
          boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
          color="white"
        >
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            {...headerStyle}
          >
            <HStack spacing={3}>
              <Icon as={FaCamera} color="brand.primary" boxSize={5} />
              <Text fontSize="xl" fontWeight="bold">
                Take a Picture of Your Question
              </Text>
            </HStack>
            <IconButton
              aria-label="Close"
              icon={<FaTimes />}
              variant="ghost"
              onClick={closeCamera}
              _hover={{ bg: "whiteAlpha.200" }}
            />
          </ModalHeader>
          <ModalBody py={6}>
            <VStack spacing={4}>
              <Box
                w="100%"
                h="400px"
                bg="black"
                borderRadius="lg"
                overflow="hidden"
                position="relative"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Button
                leftIcon={<FaCamera />}
                onClick={captureImage}
                colorScheme="blue"
                size="lg"
                w="full"
                bg="rgba(205, 246, 131, 0.2)"
                _hover={{ bg: "rgba(205, 246, 131, 0.3)" }}
              >
                Capture Question
              </Button>
              <Text fontSize="sm" color="whiteAlpha.700" textAlign="center">
                Position your question paper in good lighting and ensure it's clearly visible
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StudentHomeworks;
