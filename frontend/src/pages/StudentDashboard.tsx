import React, { useState, useRef } from 'react';
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
  Button,
  useToast,
  Card,
  CardBody,
  Progress,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Select,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  Grid,
  GridItem
} from '@chakra-ui/react';
import {
  FaBell,
  FaEllipsisV,
  FaArrowRight,
  FaGraduationCap,
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaClipboardList,
  FaChartLine,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaRobot,
  FaQuestion,
  FaLightbulb,
  FaBrain,
  FaFile,
  FaClipboardCheck
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { useSidebar } from '../contexts/SidebarContext';
import StudentSidebar from '../components/layout/StudentSidebar/StudentSidebar';
import AIStudentAssistant from '../components/student/AIStudentAssistant/AIStudentAssistant';
import { logout } from '../store/slices/authSlice';

interface Course {
  id: string;
  name: string;
  progress: number;
  nextClass: string;
  grade: string;
  instructor: string;
  category: string;
}

interface Homework {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isAI: boolean;
  type?: 'code' | 'text';
}

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
}

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useAuth();
  const { isCollapsed } = useSidebar();
  const { 
    isOpen: isProfileOpen, 
    onOpen: onProfileOpen, 
    onClose: onProfileClose 
  } = useDisclosure();
  const { 
    isOpen: isSettingsOpen, 
    onOpen: onSettingsOpen, 
    onClose: onSettingsClose 
  } = useDisclosure();
  const {
    isOpen: isAIOpen,
    onOpen: onAIOpen,
    onClose: onAIClose
  } = useDisclosure();

  // Theme colors
  const theme = {
    bg: {
      primary: 'rgba(26, 29, 26, 0.95)',
      card: 'rgba(205, 246, 131, 0.05)',
      hover: 'rgba(205, 246, 131, 0.1)'
    },
    text: {
      primary: '#CDF683',
      secondary: '#B5E853',
      muted: 'rgba(205, 246, 131, 0.6)',
      dark: '#1A1D1A'
    },
    gradient: {
      primary: 'linear(180deg, rgba(205, 246, 131, 0.05) 0%, rgba(181, 232, 83, 0.1) 100%)',
      card: 'linear(to-br, rgba(205, 246, 131, 0.1), rgba(181, 232, 83, 0.05))',
      highlight: 'linear(to-r, #CDF683, #B5E853)'
    },
    border: {
      primary: 'rgba(205, 246, 131, 0.2)',
      hover: 'rgba(205, 246, 131, 0.4)'
    }
  };

  const cardStyle = {
    bg: theme.bg.card,
    backdropFilter: 'blur(10px)',
    borderWidth: '1px',
    borderColor: theme.border.primary,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: theme.gradient.highlight,
      transform: 'translateX(-100%)',
      transition: 'transform 0.6s ease-in-out',
    },
    _hover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(205, 246, 131, 0.2)',
      borderColor: theme.text.primary,
      bg: theme.bg.hover,
      '&::before': {
        transform: 'translateX(100%)',
      },
      '.stat-icon': {
        transform: 'scale(1.1) rotate(5deg)',
        color: theme.text.primary,
      },
      '.stat-value': {
        background: theme.gradient.highlight,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0 8px rgba(205, 246, 131, 0.3)',
      }
    },
  };

  const headingStyle = {
    fontSize: { base: '2xl', md: '3xl', lg: '4xl' },
    fontWeight: 'bold',
    background: theme.gradient.highlight,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: 'tight',
    mb: 4
  };

  const statValueStyle = {
    fontSize: { base: '2xl', md: '3xl' },
    fontWeight: 'bold',
    color: theme.text.primary,
    className: 'stat-value',
    letterSpacing: 'tight'
  };

  const statLabelStyle = {
    fontSize: 'sm',
    fontWeight: 'medium',
    color: theme.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 'wider'
  };

  const buttonStyle = {
    variant: 'ghost',
    color: theme.text.primary,
    _hover: {
      bg: theme.bg.hover,
      transform: 'translateX(5px)',
    },
    transition: 'all 0.3s ease',
  };

  const menuStyle = {
    bg: theme.bg.card,
    borderColor: theme.border.primary,
    boxShadow: 'lg',
    borderRadius: 'xl',
    p: 2,
  };

  const menuItemStyle = {
    bg: 'transparent',
    color: theme.text.primary,
    _hover: {
      bg: theme.bg.hover,
      color: theme.text.secondary,
    },
    borderRadius: 'lg',
    px: 3,
    py: 2,
  };

  const progressStyle = {
    value: 75,
    size: 'sm',
    borderRadius: 'full',
    bg: theme.bg.hover,
    sx: {
      '& > div': {
        background: theme.gradient.highlight,
        transition: 'width 0.3s ease-in-out',
      }
    }
  };

  const getSubjectColor = (category: string) => {
    const limeGreenPalette = {
      primary: '#CDF683',
      secondary: '#B5E853',
      tertiary: '#98D626',
      quaternary: '#7BC618',
      dark: '#2C4A0C'
    };

    return {
      start: limeGreenPalette.primary,
      end: limeGreenPalette.secondary,
      bg: 'rgba(205, 246, 131, 0.05)'
    };
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return {
          bg: '#CDF683',
          text: '#1A1D1A'
        };
      case 'in progress':
        return {
          bg: '#B5E853',
          text: '#1A1D1A'
        };
      case 'pending':
        return {
          bg: 'rgba(205, 246, 131, 0.3)',
          text: '#CDF683'
        };
      case 'overdue':
        return {
          bg: 'rgba(205, 246, 131, 0.15)',
          text: '#CDF683'
        };
      default:
        return {
          bg: 'rgba(205, 246, 131, 0.2)',
          text: '#CDF683'
        };
    }
  };

  const getGradeColor = (grade: string) => {
    if (!grade) return { bg: 'rgba(205, 246, 131, 0.1)', text: '#CDF683' };
    
    const gradeMap = {
      'A': { bg: '#CDF683', text: 'black' },
      'B': { bg: '#B5E853', text: 'black' },
      'C': { bg: '#98D626', text: 'black' },
      'D': { bg: '#7BC618', text: 'black' },
      'E': { bg: '#5A940F', text: 'white' },
      'F': { bg: '#3D6A0A', text: 'white' },
      'G': { bg: '#2C4A0C', text: 'white' }
    };

    const firstLetter = grade.charAt(0).toUpperCase();
    return gradeMap[firstLetter] || { bg: 'rgba(205, 246, 131, 0.1)', text: '#CDF683' };
  };

  const courses: Course[] = [
    {
      id: '1',
      name: 'Advanced Mathematics',
      progress: 75,
      nextClass: 'Today, 2:30 PM',
      grade: 'A',
      instructor: 'Dr. Smith',
      category: 'Mathematics',
    },
    {
      id: '2',
      name: 'Physics',
      progress: 60,
      nextClass: 'Tomorrow, 10:00 AM',
      grade: 'B+',
      instructor: 'Prof. Johnson',
      category: 'Science',
    },
    {
      id: '3',
      name: 'Computer Science',
      progress: 90,
      nextClass: 'Wednesday, 1:15 PM',
      grade: 'A+',
      instructor: 'Dr. Williams',
      category: 'Technology',
    },
    {
      id: '4',
      name: 'English Literature',
      progress: 85,
      nextClass: 'Thursday, 9:00 AM',
      grade: 'A',
      instructor: 'Ms. Davis',
      category: 'Literature',
    },
  ];

  const homeworks: Homework[] = [
    {
      id: '1',
      title: 'Calculus Problem Set',
      course: 'Advanced Mathematics',
      dueDate: 'Tomorrow',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      course: 'Physics',
      dueDate: 'Next Week',
      status: 'submitted'
    },
    {
      id: '3',
      title: 'Programming Project',
      course: 'Computer Science',
      dueDate: 'Today',
      status: 'graded',
      grade: 'A'
    },
    {
      id: '4',
      title: 'Literature Essay',
      course: 'English Literature',
      dueDate: '2 days ago',
      status: 'graded',
      grade: 'B'
    },
    {
      id: '5',
      title: 'Chemistry Lab',
      course: 'Chemistry',
      dueDate: 'Yesterday',
      status: 'graded',
      grade: 'C'
    }
  ];

  const stats = {
    overallGrade: 'A',
    coursesEnrolled: courses.length,
    completedHomeworks: homeworks.filter(a => a.status === 'graded').length,
    upcomingDeadlines: homeworks.filter(a => a.status === 'pending').length,
  };

  const aiFeatures = [
    {
      id: 'study-assistant',
      title: 'Study Assistant',
      description: 'Get personalized study help and answers to your questions',
      icon: FaBrain,
      gradient: 'linear(to-r, #CDF683, #B5E853)',
      path: '/dashboard/student/ai-assistant'
    },
    {
      id: 'homework-helper',
      title: 'Homework Helper',
      description: 'Step-by-step guidance for solving homework problems',
      icon: FaBook,
      gradient: 'linear(to-r, #B5E853, #98D626)',
      path: '/dashboard/student/homeworks'
    },
    {
      id: 'practice-quiz',
      title: 'Practice Quiz Generator',
      description: 'AI-generated quizzes to test your knowledge',
      icon: FaFile,
      gradient: 'linear(to-r, #98D626, #7BC618)',
      path: '/dashboard/student/practice'
    }
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      minH="100vh"
      w="full"
      bgGradient={theme.gradient.primary}
      color="white"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: theme.bg.primary,
        zIndex: 0
      }}
    >
      <Flex h="100vh" overflow="hidden" position="relative" zIndex={1}>
        <StudentSidebar />
        <Box
          flex="1"
          ml={isCollapsed ? "60px" : "240px"}
          transition="all 0.3s"
          w={`calc(100% - ${isCollapsed ? "60px" : "240px"})`}
          p={8}
          overflowY="auto"
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.border.primary,
              borderRadius: '24px',
            },
          }}
        >
          {/* Welcome Section */}
          <Box mb={8}>
            <Heading {...headingStyle}>
              Welcome back, {user?.name || 'Student'}!
            </Heading>
            <Text color={theme.text.muted} fontSize="lg">
              Here's what's happening with your courses today.
            </Text>
          </Box>

          {/* Quick Stats */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
            <Card {...cardStyle}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Icon
                      as={FaGraduationCap}
                      boxSize={8}
                      className="stat-icon"
                      color={theme.text.primary}
                      transition="all 0.3s"
                    />
                    <Badge
                      bg={theme.bg.hover}
                      color={theme.text.primary}
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      letterSpacing="wider"
                    >
                      +5%
                    </Badge>
                  </Flex>
                  <Box>
                    <Text {...statLabelStyle}>Overall GPA</Text>
                    <Text {...statValueStyle}>3.8</Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card {...cardStyle}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Icon
                      as={FaBook}
                      boxSize={8}
                      className="stat-icon"
                      color={theme.text.primary}
                      transition="all 0.3s"
                    />
                    <Badge
                      bg={theme.bg.hover}
                      color={theme.text.primary}
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      letterSpacing="wider"
                    >
                      +2
                    </Badge>
                  </Flex>
                  <Box>
                    <Text {...statLabelStyle}>Courses</Text>
                    <Text {...statValueStyle}>6</Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card {...cardStyle}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Icon
                      as={FaClock}
                      boxSize={8}
                      className="stat-icon"
                      color={theme.text.primary}
                      transition="all 0.3s"
                    />
                    <Badge
                      bg={theme.bg.hover}
                      color={theme.text.primary}
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      letterSpacing="wider"
                    >
                      +12h
                    </Badge>
                  </Flex>
                  <Box>
                    <Text {...statLabelStyle}>Study Hours</Text>
                    <Text {...statValueStyle}>156</Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card {...cardStyle}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Icon
                      as={FaClipboardCheck}
                      boxSize={8}
                      className="stat-icon"
                      color={theme.text.primary}
                      transition="all 0.3s"
                    />
                    <Badge
                      bg={theme.bg.hover}
                      color={theme.text.primary}
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      letterSpacing="wider"
                    >
                      98%
                    </Badge>
                  </Flex>
                  <Box>
                    <Text {...statLabelStyle}>Completion Rate</Text>
                    <Text {...statValueStyle}>High</Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Quick Actions */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
            <Card {...cardStyle}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Icon
                      as={FaRobot}
                      boxSize={8}
                      className="stat-icon"
                      color={theme.text.primary}
                      transition="all 0.3s"
                    />
                  </Flex>
                  <Box>
                    <Text {...statLabelStyle}>AI Assistant</Text>
                    <Button
                      {...buttonStyle}
                      onClick={onAIOpen}
                      rightIcon={<FaArrowRight />}
                    >
                      Get Help
                    </Button>
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card {...cardStyle}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Icon
                      as={FaCalendarAlt}
                      boxSize={8}
                      className="stat-icon"
                      color={theme.text.primary}
                      transition="all 0.3s"
                    />
                  </Flex>
                  <Box>
                    <Text {...statLabelStyle}>Schedule</Text>
                    <Button
                      {...buttonStyle}
                      onClick={() => navigate('/student/schedule')}
                      rightIcon={<FaArrowRight />}
                    >
                      View Calendar
                    </Button>
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card {...cardStyle}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Icon
                      as={FaChartLine}
                      boxSize={8}
                      className="stat-icon"
                      color={theme.text.primary}
                      transition="all 0.3s"
                    />
                  </Flex>
                  <Box>
                    <Text {...statLabelStyle}>Progress</Text>
                    <Button
                      {...buttonStyle}
                      onClick={() => navigate('/student/progress')}
                      rightIcon={<FaArrowRight />}
                    >
                      Track Progress
                    </Button>
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card {...cardStyle}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Icon
                      as={FaBook}
                      boxSize={8}
                      className="stat-icon"
                      color={theme.text.primary}
                      transition="all 0.3s"
                    />
                  </Flex>
                  <Box>
                    <Text {...statLabelStyle}>Courses</Text>
                    <Button
                      {...buttonStyle}
                      onClick={() => navigate('/student/courses')}
                      rightIcon={<FaArrowRight />}
                    >
                      View Courses
                    </Button>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Course Progress */}
          <Box>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading {...headingStyle}>
                Course Progress
              </Heading>
              <Button
                {...buttonStyle}
                rightIcon={<FaArrowRight />}
                onClick={() => navigate('/student/courses')}
              >
                View All
              </Button>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {courses.map((course) => (
                <Card key={course.id} {...cardStyle}>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Flex justify="space-between" align="center">
                        <Badge
                          bg={theme.bg.hover}
                          color={theme.text.primary}
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          letterSpacing="wider"
                        >
                          {course.category}
                        </Badge>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<FaEllipsisV />}
                            variant="ghost"
                            size="sm"
                            color={theme.text.muted}
                            _hover={{ color: theme.text.primary, bg: theme.bg.hover }}
                          />
                          <MenuList {...menuStyle}>
                            <MenuItem
                              {...menuItemStyle}
                              icon={<FaBook />}
                              onClick={() => navigate(`/student/courses/${course.id}`)}
                            >
                              View Details
                            </MenuItem>
                            <MenuItem
                              {...menuItemStyle}
                              icon={<FaRobot />}
                              onClick={onAIOpen}
                            >
                              AI Study Help
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                      <Box>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color={theme.text.primary}
                          mb={1}
                        >
                          {course.name}
                        </Text>
                        <Text fontSize="sm" color={theme.text.muted}>
                          {course.instructor}
                        </Text>
                      </Box>
                      <Box>
                        <Flex justify="space-between" mb={2}>
                          <Text fontSize="sm" color={theme.text.muted}>
                            Progress
                          </Text>
                          <Text fontSize="sm" color={theme.text.primary}>
                            {course.progress}%
                          </Text>
                        </Flex>
                        <Progress
                          {...progressStyle}
                          value={course.progress}
                        />
                      </Box>
                      <Flex justify="space-between" align="center">
                        <Text fontSize="sm" color={theme.text.muted}>
                          Next Class
                        </Text>
                        <Text fontSize="sm" color={theme.text.primary}>
                          {course.nextClass}
                        </Text>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default StudentDashboard;
