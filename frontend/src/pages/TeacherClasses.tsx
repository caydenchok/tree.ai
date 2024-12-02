import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Button,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Progress,
  Avatar,
  AvatarGroup,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaBook, FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';
import TeacherSidebar from '../components/TeacherSidebar';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionCard = motion(Card);

interface Class {
  id: string;
  name: string;
  subject: string;
  schedule: string;
  time: string;
  students: number;
  progress: number;
  status: 'active' | 'upcoming' | 'completed';
}

const TeacherClasses: React.FC = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== 'teacher') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  // Theme colors
  const bgGradient = "linear(to-br, brand.secondary, brand.dark.primary)";
  const textColor = "brand.white.primary";
  const mutedColor = "whiteAlpha.700";
  const accentColor = "brand.primary";

  // Sample class data
  const classes: Class[] = [
    {
      id: '1',
      name: 'Mathematics 101',
      subject: 'Mathematics',
      schedule: 'Mon, Wed, Fri',
      time: '09:00 AM - 10:30 AM',
      students: 25,
      progress: 75,
      status: 'active',
    },
    {
      id: '2',
      name: 'Physics Fundamentals',
      subject: 'Physics',
      schedule: 'Tue, Thu',
      time: '11:00 AM - 12:30 PM',
      students: 20,
      progress: 60,
      status: 'active',
    },
    {
      id: '3',
      name: 'Chemistry Basics',
      subject: 'Chemistry',
      schedule: 'Mon, Wed',
      time: '02:00 PM - 03:30 PM',
      students: 22,
      progress: 45,
      status: 'upcoming',
    },
    {
      id: '4',
      name: 'Biology Introduction',
      subject: 'Biology',
      schedule: 'Tue, Thu',
      time: '01:00 PM - 02:30 PM',
      students: 18,
      progress: 90,
      status: 'completed',
    },
  ];

  const handleClassClick = (classItem: Class) => {
    setSelectedClass(classItem);
    onOpen();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return accentColor;
      case 'upcoming':
        return 'brand.info';
      case 'completed':
        return mutedColor;
      default:
        return mutedColor;
    }
  };

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

  const subjectGradients = {
    Mathematics: "linear-gradient(135deg, rgba(64, 156, 255, 0.1), rgba(205, 246, 131, 0.1))",
    Physics: "linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(205, 246, 131, 0.1))",
    Chemistry: "linear-gradient(135deg, rgba(255, 99, 71, 0.1), rgba(205, 246, 131, 0.1))",
    Biology: "linear-gradient(135deg, rgba(0, 191, 255, 0.1), rgba(205, 246, 131, 0.1))",
  };

  return (
    <Flex h="100vh" overflow="hidden" bg={bgGradient}>
      <TeacherSidebar onCollapse={handleSidebarCollapse} />
      <Box
        flex="1"
        p={8}
        ml={[0, 0, isSidebarCollapsed ? "60px" : "240px"]}
        transition="margin-left 0.3s"
        overflowY="auto"
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Flex justify="space-between" align="center" mb={8}>
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              {t('My Classes')}
            </Text>
            <Button
              leftIcon={<Icon as={FaBook} />}
              bg={accentColor}
              color="brand.dark.primary"
              _hover={{ bg: 'brand.primary', transform: 'translateY(-2px)' }}
              _active={{ bg: 'brand.primary' }}
              transition="all 0.2s"
            >
              {t('Create New Class')}
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {classes.map((classItem) => (
              <MotionCard
                {...cardStyle}
                bgGradient={subjectGradients[classItem.subject]}
                key={classItem.id}
                cursor="pointer"
                position="relative"
                overflow="hidden"
                onClick={() => handleClassClick(classItem)}
              >
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <Flex justify="space-between" align="center">
                      <Badge
                        bg={getStatusColor(classItem.status)}
                        color="brand.dark.primary"
                        px={2}
                        py={1}
                        borderRadius="full"
                      >
                        {classItem.status}
                      </Badge>
                      <AvatarGroup size="sm" max={3}>
                        <Avatar name="Student 1" />
                        <Avatar name="Student 2" />
                        <Avatar name="Student 3" />
                      </AvatarGroup>
                    </Flex>

                    <Text fontSize="xl" fontWeight="bold" color={textColor}>
                      {classItem.name}
                    </Text>

                    <HStack spacing={4}>
                      <Flex align="center">
                        <Icon as={FaCalendarAlt} color={mutedColor} mr={2} />
                        <Text fontSize="sm" color={mutedColor}>
                          {classItem.schedule}
                        </Text>
                      </Flex>
                      <Flex align="center">
                        <Icon as={FaClock} color={mutedColor} mr={2} />
                        <Text fontSize="sm" color={mutedColor}>
                          {classItem.time}
                        </Text>
                      </Flex>
                    </HStack>

                    <Flex align="center">
                      <Icon as={FaUsers} color={mutedColor} mr={2} />
                      <Text fontSize="sm" color={mutedColor}>
                        {classItem.students} {t('students')}
                      </Text>
                    </Flex>

                    <Box>
                      <Flex justify="space-between" mb={2}>
                        <Text fontSize="sm" color={mutedColor}>
                          {t('Progress')}
                        </Text>
                        <Text fontSize="sm" color={mutedColor}>
                          {classItem.progress}%
                        </Text>
                      </Flex>
                      <Progress
                        value={classItem.progress}
                        size="sm"
                        bg="whiteAlpha.200"
                        borderRadius="full"
                        sx={{
                          '& > div': {
                            background: '#cdf683 !important'
                          }
                        }}
                      />
                    </Box>
                  </VStack>
                </CardBody>
              </MotionCard>
            ))}
          </SimpleGrid>
        </MotionBox>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
          <ModalContent bg="rgba(255, 255, 255, 0.05)" borderColor="rgba(255, 255, 255, 0.1)" borderWidth="1px">
            <ModalHeader color={textColor}>{selectedClass?.name}</ModalHeader>
            <ModalCloseButton color={mutedColor} />
            <ModalBody pb={6}>
              {selectedClass && (
                <VStack align="stretch" spacing={4}>
                  <Flex justify="space-between">
                    <Badge
                      bg={getStatusColor(selectedClass.status)}
                      color="brand.dark.primary"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {selectedClass.status}
                    </Badge>
                    <Text color={mutedColor}>{selectedClass.subject}</Text>
                  </Flex>

                  <Box>
                    <Text fontWeight="bold" color={textColor} mb={2}>
                      {t('Schedule')}
                    </Text>
                    <HStack spacing={4}>
                      <Flex align="center">
                        <Icon as={FaCalendarAlt} color={mutedColor} mr={2} />
                        <Text color={mutedColor}>{selectedClass.schedule}</Text>
                      </Flex>
                      <Flex align="center">
                        <Icon as={FaClock} color={mutedColor} mr={2} />
                        <Text color={mutedColor}>{selectedClass.time}</Text>
                      </Flex>
                    </HStack>
                  </Box>

                  <Box>
                    <Text fontWeight="bold" color={textColor} mb={2}>
                      {t('Students')}
                    </Text>
                    <Flex align="center">
                      <AvatarGroup size="md" max={5} mr={4}>
                        <Avatar name="Student 1" />
                        <Avatar name="Student 2" />
                        <Avatar name="Student 3" />
                        <Avatar name="Student 4" />
                        <Avatar name="Student 5" />
                      </AvatarGroup>
                      <Text color={mutedColor}>
                        {selectedClass.students} {t('students enrolled')}
                      </Text>
                    </Flex>
                  </Box>

                  <Box>
                    <Text fontWeight="bold" color={textColor} mb={2}>
                      {t('Progress')}
                    </Text>
                    <Progress
                      value={selectedClass.progress}
                      size="md"
                      bg="whiteAlpha.200"
                      borderRadius="full"
                      mb={2}
                      sx={{
                        '& > div': {
                          background: '#cdf683 !important'
                        }
                      }}
                    />
                    <Text color={mutedColor} textAlign="right">
                      {selectedClass.progress}% {t('completed')}
                    </Text>
                  </Box>

                  <Flex justify="flex-end" mt={4}>
                    <Button
                      bg={accentColor}
                      color="brand.dark.primary"
                      mr={3}
                      _hover={{ bg: 'brand.primary', transform: 'translateY(-2px)' }}
                    >
                      {t('View Details')}
                    </Button>
                    <Button
                      variant="outline"
                      borderColor="rgba(255, 255, 255, 0.1)"
                      color={textColor}
                      _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                      onClick={onClose}
                    >
                      {t('Close')}
                    </Button>
                  </Flex>
                </VStack>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default TeacherClasses;
