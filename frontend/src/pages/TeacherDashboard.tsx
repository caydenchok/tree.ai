import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { IconType } from 'react-icons';
import {
  Box,
  Flex,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  SimpleGrid,
  Progress,
  Card,
  CardBody,
  Button,
  Badge,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Heading,
  useBreakpointValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  FaHome,
  FaGraduationCap,
  FaCalendarAlt,
  FaBook,
  FaChartLine,
  FaComments,
  FaCog,
  FaBrain,
  FaSignOutAlt,
  FaBell,
  FaEllipsisV,
  FaLightbulb,
  FaUserGraduate,
  FaQuestion,
  FaBookReader,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../store/slices/authSlice';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LanguageSelector from '../components/LanguageSelector';
import TeacherSidebar from '../components/TeacherSidebar';
import AITeachingAssistant from '../components/AITeachingAssistant';

interface User {
  id: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

interface SidebarItem {
  icon: IconType;
  label: string;
  path: string;
}

interface Course {
  id: string;
  name: string;
  students: number;
  progress: number;
  nextClass: string;
}

interface Stats {
  totalStudents: number;
  averagePerformance: number;
  coursesActive: number;
  upcomingClasses: number;
}

interface AIFeature {
  icon: IconType;
  title: string;
  description: string;
  action: string;
}

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionCard = motion(Card);
const MotionModalContent = motion(ModalContent);

const TeacherDashboard: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isAIAssistantOpen, 
    onOpen: onAIAssistantOpen, 
    onClose: onAIAssistantClose 
  } = useDisclosure();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [aiMessage, setAiMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'ai', content: string }>>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  // Theme colors
  const bgGradient = "linear(to-br, brand.secondary, brand.dark.primary)";
  const cardBg = "rgba(255, 255, 255, 0.05)";
  const hoverBg = "rgba(205, 246, 131, 0.1)";
  const borderColor = "rgba(205, 246, 131, 0.2)";
  const textColor = "brand.white.primary";
  const mutedColor = "whiteAlpha.700";
  const accentColor = "brand.primary";

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setChatHistory(prev => [...prev, { role: 'user', content: inputValue }]);
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = "This is a simulated AI response. In production, this would be replaced with an actual API call to your AI service.";
      setChatHistory(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setInputValue('');
      setIsLoading(false);
    }, 1000);
  };

  const handleFeatureSelect = useCallback((feature: string) => {
    setSelectedFeature(feature);
    onOpen();
  }, [onOpen]);

  const sidebarItems = [
    { icon: FaHome, label: t('Dashboard'), path: '/dashboard/teacher' },
    { icon: FaGraduationCap, label: t('My Students'), path: '/dashboard/teacher/students' },
    { icon: FaCalendarAlt, label: t('Schedule'), path: '/dashboard/teacher/schedule' },
    { icon: FaBook, label: t('Courses'), path: '/dashboard/teacher/courses' },
    { icon: FaChartLine, label: t('Analytics'), path: '/dashboard/teacher/analytics' },
    { icon: FaComments, label: t('Messages'), path: '/dashboard/teacher/messages' },
    { icon: FaBrain, label: t('AI Assistant'), path: '/dashboard/teacher/ai-assistant' },
  ] as const;

  const stats: Stats = {
    totalStudents: 120,
    averagePerformance: 85.5,
    coursesActive: 4,
    upcomingClasses: 6,
  };

  const aiFeatures: AIFeature[] = [
    {
      icon: FaQuestion,
      title: 'Lesson Planning',
      description: 'Get AI assistance with lesson planning',
      action: 'Plan Now',
    },
    {
      icon: FaBrain,
      title: 'Student Analytics',
      description: 'Analyze student performance and trends',
      action: 'View Analytics',
    },
    {
      icon: FaBookReader,
      title: 'Content Generation',
      description: 'Generate educational content and exercises',
      action: 'Create Content',
    },
    {
      icon: FaChartLine,
      title: 'Progress Tracking',
      description: 'Track and assess student progress',
      action: 'Track Now',
    },
  ];

  const courses: Course[] = [
    {
      id: '1',
      name: 'Advanced Mathematics',
      students: 32,
      progress: 75,
      nextClass: 'Tomorrow, 9:00 AM',
    },
    {
      id: '2',
      name: 'Physics 101',
      students: 28,
      progress: 60,
      nextClass: 'Today, 2:00 PM',
    },
    {
      id: '3',
      name: 'Chemistry Lab',
      students: 24,
      progress: 85,
      nextClass: 'Wednesday, 11:00 AM',
    },
    {
      id: '4',
      name: 'Biology Basics',
      students: 36,
      progress: 45,
      nextClass: 'Friday, 10:00 AM',
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const renderModalContent = useCallback(() => {
    return (
      <MotionModalContent
        maxW="800px"
        w="90%"
        bg="brand.dark.primary"
        border="1px solid"
        borderColor="brand.primary"
        color="brand.text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ModalHeader 
          color="brand.primary"
          borderBottom="1px solid"
          borderColor="rgba(205, 246, 131, 0.2)"
          pb={4}
        >
          {selectedFeature}
        </ModalHeader>
        <ModalCloseButton color="brand.primary" />
        <ModalBody py={6}>
          <VStack spacing={7} align="stretch">
            {/* Chat History */}
            <VStack spacing={4} align="stretch" maxH="400px" overflowY="auto">
              {chatHistory.map((msg, index) => (
                <Box
                  key={index}
                  alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                  maxW="80%"
                  bg={msg.role === 'user' ? 'brand.primary' : cardBg}
                  color={msg.role === 'user' ? 'brand.secondary' : textColor}
                  p={4}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Text>{msg.content}</Text>
                </Box>
              ))}
            </VStack>

            {/* Input Form */}
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <InputGroup size="lg">
                  <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={t('Type your message...')}
                    bg="transparent"
                    border="1px solid"
                    borderColor={borderColor}
                    _hover={{ borderColor: 'brand.primary' }}
                    _focus={{ 
                      borderColor: 'brand.primary',
                      boxShadow: '0 0 0 1px var(--chakra-colors-brand-primary)'
                    }}
                    color={textColor}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      type="submit"
                      bg={accentColor}
                      color="brand.secondary"
                      isLoading={isLoading}
                      _hover={{
                        bg: "brand.primary",
                      }}
                    >
                      {t('Send')}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </VStack>
            </form>
          </VStack>
        </ModalBody>
      </MotionModalContent>
    );
  }, [selectedFeature, inputValue, chatHistory, isLoading, handleSubmit, t, textColor, accentColor, cardBg, borderColor]);

  const cardStyle = {
    bg: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderWidth: '1px',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease-in-out',
    _hover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
      borderColor: 'rgba(205, 246, 131, 0.4)',
    },
  };

  const analyticsCardStyle = {
    ...cardStyle,
    bgGradient: 'linear(to-br, rgba(205, 246, 131, 0.1), rgba(255, 255, 255, 0.05))',
  };

  return (
    <Flex h="100vh" overflow="hidden">
      <TeacherSidebar onCollapse={handleSidebarCollapse} />
      <Box 
        ml={isSidebarCollapsed ? "60px" : "240px"}
        flex="1" 
        p={6} 
        bg="#22271d"
        transition="margin-left 0.3s"
        overflow="auto"
        h="100vh"
      >
        <Box py={8}>
          {/* Welcome Section */}
          <MotionFlex
            direction={{ base: 'column', md: 'row' }}
            gap={6}
            align="center"
            justify="space-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            flexWrap="wrap"
            mb={6}
          >
            <Box>
              <Heading size="lg" mb={2} color={textColor}>
                Welcome back, {user.fullName}! 👋
              </Heading>
              <Text color={mutedColor} fontSize="lg">
                Ready to empower your students today?
              </Text>
            </Box>
            <HStack spacing={4}>
              <IconButton
                aria-label="Notifications"
                icon={<FaBell />}
                variant="ghost"
                color={mutedColor}
                _hover={{ bg: hoverBg, color: accentColor }}
              />
              <Button
                leftIcon={<FaLightbulb />}
                bg={accentColor}
                color="brand.secondary"
                size="lg"
                onClick={() => {
                  setSelectedFeature('Lesson Planning Assistant');
                  onOpen();
                }}
                _hover={{
                  bg: "brand.primary",
                  transform: "translateY(-2px)",
                  boxShadow: "lg"
                }}
              >
                Get Teaching Suggestions
              </Button>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="More options"
                  icon={<FaEllipsisV />}
                  variant="ghost"
                  color={mutedColor}
                  _hover={{ bg: hoverBg, color: accentColor }}
                />
                <MenuList bg={cardBg} borderColor={borderColor}>
                  <MenuItem 
                    icon={<FaCog />}
                    command="⌘S"
                    bg={cardBg}
                    _hover={{ bg: hoverBg }}
                  >
                    Settings
                  </MenuItem>
                  <MenuItem 
                    icon={<FaUserGraduate />}
                    command="⌘P"
                    bg={cardBg}
                    _hover={{ bg: hoverBg }}
                  >
                    Profile
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </MotionFlex>

          {/* Stats Overview */}
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 4 }} 
            spacing={6}
            w="full"
            mb={6}
          >
            {[
              { label: 'Total Students', value: stats.totalStudents, icon: FaGraduationCap },
              { label: 'Average Performance', value: `${stats.averagePerformance}%`, icon: FaChartLine },
              { label: 'Active Courses', value: stats.coursesActive, icon: FaBook },
              { label: 'Upcoming Classes', value: stats.upcomingClasses, icon: FaCalendarAlt },
            ].map((stat, index) => (
              <MotionCard
                key={stat.label}
                {...analyticsCardStyle}
                position="relative"
                overflow="hidden"
              >
                <CardBody>
                  <Flex align="center" gap={4}>
                    <Box
                      p={3}
                      bg={hoverBg}
                      borderRadius="lg"
                      color={accentColor}
                    >
                      <Icon as={stat.icon} boxSize={6} />
                    </Box>
                    <Box>
                      <Text color={mutedColor} fontSize="sm" mb={1}>
                        {stat.label}
                      </Text>
                      <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                        {stat.value}
                      </Text>
                    </Box>
                  </Flex>
                </CardBody>
              </MotionCard>
            ))}
          </SimpleGrid>

          {/* AI Features Section */}
          <Box w="full" mb={6}>
            <Flex 
              justify="space-between" 
              align="center" 
              mb={4}
              w="full"
            >
              <Heading size="md" color={textColor}>AI Teaching Assistant</Heading>
              <Flex
                align="center"
                bg={hoverBg}
                px={4}
                py={2}
                borderRadius="full"
                borderWidth="1px"
                borderColor={borderColor}
                _hover={{
                  transform: 'translateY(-2px)',
                  borderColor: accentColor,
                }}
                transition="all 0.2s"
              >
                <Text color={mutedColor} fontSize="sm" mr={1}>Powered by</Text>
                <Text
                  color={accentColor}
                  fontWeight="bold"
                  fontSize="sm"
                  bgGradient="linear(to-r, brand.primary, #E2FF9F)"
                  bgClip="text"
                >
                  TREE8 AI
                </Text>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {aiFeatures.map((feature, index) => (
                <MotionCard
                  key={index}
                  {...cardStyle}
                  cursor="pointer"
                  onClick={() => {
                    setSelectedFeature(feature.title);
                    onOpen();
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  _hover={{
                    transform: 'translateY(-4px)',
                    borderColor: accentColor,
                  }}
                >
                  <CardBody p={4}>
                    <VStack align="stretch" spacing={3}>
                      <Box
                        p={3}
                        bg={hoverBg}
                        borderRadius="lg"
                        color={accentColor}
                        alignSelf="flex-start"
                      >
                        <Icon as={feature.icon} boxSize={6} />
                      </Box>
                      <Heading size="md" color={textColor}>{feature.title}</Heading>
                      <Text color={mutedColor}>{feature.description}</Text>
                      <Button
                        variant="ghost"
                        color={accentColor}
                        size="sm"
                        rightIcon={<Icon as={FaArrowRight} />}
                        _hover={{
                          bg: hoverBg,
                          transform: "translateX(4px)",
                        }}
                      >
                        {feature.action}
                      </Button>
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))}
            </SimpleGrid>
          </Box>

          {/* Courses Section */}
          <Box w="full" mb={6}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color={textColor}>{t('Your Courses')}</Heading>
              <Button
                size="sm"
                variant="ghost"
                color={accentColor}
                _hover={{ bg: hoverBg }}
                onClick={() => navigate('/dashboard/teacher/courses')}
              >
                {t('View All')}
              </Button>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {courses.map((course, index) => (
                <MotionCard
                  key={course.id}
                  {...cardStyle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    borderColor: accentColor,
                  }}
                >
                  <CardBody p={4}>
                    <VStack align="stretch" spacing={3}>
                      <Heading size="md" color={textColor}>{course.name}</Heading>
                      <Text color={mutedColor}>{course.students} {t('students')}</Text>
                      <Box>
                        <Progress
                          value={course.progress}
                          bg={hoverBg}
                          sx={{
                            '& > div': {
                              background: accentColor,
                            }
                          }}
                          borderRadius="full"
                        />
                        <Flex justify="space-between" mt={2}>
                          <Text fontSize="sm" color={mutedColor}>
                            {t('Progress')}: {course.progress}%
                          </Text>
                          <Badge
                            bg={hoverBg}
                            color={accentColor}
                            px={2}
                            py={1}
                            borderRadius="md"
                          >
                            {course.students} {t('enrolled')}
                          </Badge>
                        </Flex>
                      </Box>
                      <Text fontSize="sm" color={mutedColor}>
                        {t('Next')}: {course.nextClass}
                      </Text>
                      <Button
                        bg={accentColor}
                        color="brand.secondary"
                        size="sm"
                        _hover={{
                          bg: "brand.primary",
                          transform: "translateY(-2px)",
                        }}
                        onClick={() => navigate(`/dashboard/teacher/courses/${course.id}`)}
                      >
                        {t('View Course')}
                      </Button>
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))}
            </SimpleGrid>
          </Box>

        </Box>

      </Box>

      {/* AI Chat Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        {renderModalContent()}
      </Modal>
      <AITeachingAssistant 
        isOpen={isAIAssistantOpen} 
        onOpen={onAIAssistantOpen} 
        onClose={onAIAssistantClose} 
      />
    </Flex>
  );
};

export default TeacherDashboard;
