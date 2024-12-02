import React from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  useColorModeValue,
  Progress,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '../components/layout/StudentSidebar/StudentSidebar';
import { 
  FaCalculator, 
  FaFlask, 
  FaBookOpen, 
  FaLaptopCode, 
  FaGlobe, 
  FaLanguage,
  FaPaintBrush,
  FaRunning 
} from 'react-icons/fa';
import { useSidebar } from '../contexts/SidebarContext';

const MotionCard = motion(Card);

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  status: string;
  nextClass: string;
}

const StudentCourses: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const navigate = useNavigate();

  // Theme colors
  const bgGradient = "linear(to-br, brand.secondary, brand.dark.primary)";
  const cardBg = "rgba(255, 255, 255, 0.05)";
  const hoverBg = "rgba(205, 246, 131, 0.1)";
  const borderColor = "rgba(205, 246, 131, 0.2)";
  const textColor = "white";
  const mutedColor = "whiteAlpha.700";
  const accentColor = "#CDF683";

  // Subject gradient mapping
  const subjectGradients = {
    Mathematics: "linear-gradient(135deg, rgba(64, 156, 255, 0.1), rgba(205, 246, 131, 0.1))",
    Science: "linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(205, 246, 131, 0.1))",
    Literature: "linear-gradient(135deg, rgba(255, 99, 71, 0.1), rgba(205, 246, 131, 0.1))",
    Technology: "linear-gradient(135deg, rgba(0, 191, 255, 0.1), rgba(205, 246, 131, 0.1))",
    History: "linear-gradient(135deg, rgba(205, 133, 63, 0.1), rgba(205, 246, 131, 0.1))",
    Languages: "linear-gradient(135deg, rgba(255, 105, 180, 0.1), rgba(205, 246, 131, 0.1))",
    Arts: "linear-gradient(135deg, rgba(255, 165, 0, 0.1), rgba(205, 246, 131, 0.1))",
    "Physical Education": "linear-gradient(135deg, rgba(50, 205, 50, 0.1), rgba(205, 246, 131, 0.1))",
  };

  const subjectAccentColors = {
    Mathematics: "#409CFF",
    Science: "#8A2BE2",
    Literature: "#FF6347",
    Technology: "#00BFFF",
    History: "#CD853F",
    Languages: "#FF69B4",
    Arts: "#FFA500",
    "Physical Education": "#32CD32",
  };

  // Subject icon mapping
  const subjectIcons = {
    Mathematics: FaCalculator,
    Science: FaFlask,
    Literature: FaBookOpen,
    Technology: FaLaptopCode,
    History: FaGlobe,
    Languages: FaLanguage,
    Arts: FaPaintBrush,
    "Physical Education": FaRunning,
  };

  const getSubjectColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mathematics':
        return {
          start: '#FF6B6B',
          end: '#4ECDC4',
          bg: 'rgba(255, 107, 107, 0.05)'
        };
      case 'science':
        return {
          start: '#A8E6CF',
          end: '#3D84A8',
          bg: 'rgba(168, 230, 207, 0.05)'
        };
      case 'english':
        return {
          start: '#FFD93D',
          end: '#FF6B6B',
          bg: 'rgba(255, 217, 61, 0.05)'
        };
      case 'history':
        return {
          start: '#95E1D3',
          end: '#AA96DA',
          bg: 'rgba(149, 225, 211, 0.05)'
        };
      case 'computer science':
        return {
          start: '#6C5CE7',
          end: '#A8E6CF',
          bg: 'rgba(108, 92, 231, 0.05)'
        };
      case 'art':
        return {
          start: '#FF8993',
          end: '#F67280',
          bg: 'rgba(255, 137, 147, 0.05)'
        };
      case 'music':
        return {
          start: '#FFA8A8',
          end: '#FFD93D',
          bg: 'rgba(255, 168, 168, 0.05)'
        };
      case 'physical education':
        return {
          start: '#A8E6CF',
          end: '#DCEDC1',
          bg: 'rgba(168, 230, 207, 0.05)'
        };
      default:
        return {
          start: '#6C5CE7',
          end: '#A8E6CF',
          bg: 'rgba(108, 92, 231, 0.05)'
        };
    }
  };

  const courses: Course[] = [
    {
      id: '1',
      title: 'Advanced Mathematics',
      category: 'Mathematics',
      progress: 75,
      status: 'ongoing',
      nextClass: 'Tomorrow at 10:00 AM',
    },
    {
      id: '2',
      title: 'Physics Fundamentals',
      category: 'Science',
      progress: 60,
      status: 'ongoing',
      nextClass: 'Wednesday at 2:00 PM',
    },
    {
      id: '3',
      title: 'World Literature',
      category: 'Literature',
      progress: 90,
      status: 'ongoing',
      nextClass: 'Friday at 1:00 PM',
    },
    {
      id: '4',
      title: 'Computer Science 101',
      category: 'Technology',
      progress: 40,
      status: 'ongoing',
      nextClass: 'Thursday at 11:00 AM',
    },
  ];

  return (
    <Box
      minH="100vh"
      w="full"
      bgGradient="linear(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)"
      color="white"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(180deg, rgba(205, 246, 131, 0.05) 0%, rgba(181, 232, 83, 0.05) 100%)"
        pointerEvents="none"
      />
      <Flex minH="100vh" bg="brand.dark.primary">
        <StudentSidebar />
        <Box
          flex="1"
          ml={isCollapsed ? "60px" : "240px"}
          transition="all 0.3s"
          w={`calc(100% - ${isCollapsed ? "60px" : "240px"})`}
          p={8}
          bg="brand.dark.primary"
          minH="100vh"
          overflowY="auto"
        >
          {/* Header Section */}
          <Box mb={6}>
            <Text size="lg" color={textColor} mb={4}>My Classes</Text>
            <Flex gap={4} mb={6}>
              <Box maxW="320px">
                <Text color={mutedColor} fontSize="xs" mb={2}>
                  Search courses...
                </Text>
              </Box>
              <Box maxW="200px">
                <Text color={mutedColor} fontSize="xs" mb={2}>
                  Filter by status
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Courses Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {courses.map((course, index) => {
              const colors = getSubjectColor(course.category);
              return (
                <MotionCard
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  position="relative"
                  overflow="hidden"
                  bg={cardBg}
                  backdropFilter="blur(10px)"
                  borderWidth="1px"
                  borderColor={borderColor}
                  _hover={{
                    borderColor: accentColor,
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                  onClick={() => navigate(`/dashboard/student/courses/${course.id}`)}
                >
                  {/* Gradient Background */}
                  <Box
                    className="hover-gradient"
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgGradient={`linear(to-br, ${colors.start}, ${colors.end})`}
                    opacity={0.07}
                    transition="opacity 0.3s ease"
                  />
                  {/* Animated Border Gradient */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    h="3px"
                    bgGradient={`linear(to-r, ${colors.start}, ${colors.end})`}
                    opacity={0.7}
                  />

                  <CardBody>
                    <VStack align="stretch" spacing={4}>
                      <Flex justify="space-between" align="center">
                        <Text
                          px={3}
                          py={1}
                          bg={`${colors.start}15`}
                          color={colors.start}
                          borderRadius="full"
                          fontSize="xs"
                        >
                          {course.category}
                        </Text>
                      </Flex>
                      <VStack align="stretch" spacing={1}>
                        <Text size="md" color={textColor}>
                          {course.title}
                        </Text>
                      </VStack>
                      <Box>
                        <Text color={mutedColor} fontSize="xs" mb={2}>
                          Course Progress
                        </Text>
                        <Progress
                          value={course.progress}
                          size="sm"
                          borderRadius="full"
                          bg="rgba(255, 255, 255, 0.1)"
                          sx={{
                            '& > div': {
                              background: `linear-gradient(90deg, ${colors.start}, ${colors.end})`
                            }
                          }}
                        />
                      </Box>
                      <Flex align="center">
                        <Text color={mutedColor} fontSize="sm">
                          Next Class: {course.nextClass}
                        </Text>
                      </Flex>
                    </VStack>
                  </CardBody>
                </MotionCard>
              );
            })}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
};

export default StudentCourses;
