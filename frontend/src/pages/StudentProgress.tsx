import React from 'react';
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Progress,
  Card,
  CardBody,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  CircularProgress,
  CircularProgressLabel,
  Badge,
} from '@chakra-ui/react';

import StudentSidebar from '../components/layout/StudentSidebar/StudentSidebar';
import { useSidebar } from '../contexts/SidebarContext';
import {
  FaGraduationCap,
  FaBook,
  FaClock,
  FaTrophy,
  FaChartLine,
} from 'react-icons/fa';

const StudentProgress: React.FC = () => {
  const { isCollapsed } = useSidebar();

  // Theme colors
  const bgGradient = "linear(to-br, brand.secondary, brand.dark.primary)";
  const cardBg = "rgba(255, 255, 255, 0.05)";
  const hoverBg = "rgba(205, 246, 131, 0.1)";
  const borderColor = "rgba(205, 246, 131, 0.2)";
  const textColor = "brand.white.primary";
  const mutedColor = "whiteAlpha.700";
  const accentColor = "#cdf683";

  // Sample data
  const courses = [
    { name: 'Mathematics', progress: 85, grade: 'A', change: 5 },
    { name: 'Physics', progress: 72, grade: 'B+', change: 3 },
    { name: 'Chemistry', progress: 90, grade: 'A+', change: 8 },
    { name: 'Biology', progress: 78, grade: 'B', change: 4 },
  ];

  const overallStats = [
    { label: 'Overall GPA', value: '3.8', icon: FaGraduationCap, change: 0.2 },
    { label: 'Courses Completed', value: '12', icon: FaBook, change: 2 },
    { label: 'Study Hours', value: '156', icon: FaClock, change: 12 },
    { label: 'Achievements', value: '8', icon: FaTrophy, change: 1 },
  ];

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

  const getGradeGradient = (grade: string) => {
    switch (grade[0]) {
      case 'A':
        return 'linear(to-br, #69F0AE, #00C853)';
      case 'B':
        return 'linear(to-br, #82B1FF, #2979FF)';
      case 'C':
        return 'linear(to-br, #FFD740, #FFC400)';
      default:
        return 'linear(to-br, #FF8A80, #FF5252)';
    }
  };

  const progressBarStyle = {
    baseStyle: {
      track: {
        bg: 'rgba(255, 255, 255, 0.1)',
      },
      filledTrack: {
        transition: 'width 0.3s ease-in-out',
      },
    },
  };

  // Subject gradient mapping
  const subjectGradients = {
    Mathematics: "linear-gradient(135deg, rgba(64, 156, 255, 0.1), rgba(205, 246, 131, 0.1))",
    Physics: "linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(205, 246, 131, 0.1))",
    Chemistry: "linear-gradient(135deg, rgba(255, 99, 71, 0.1), rgba(205, 246, 131, 0.1))",
    Biology: "linear-gradient(135deg, rgba(0, 191, 255, 0.1), rgba(205, 246, 131, 0.1))",
  };

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
      <Flex h="100vh" bg={bgGradient} overflow="hidden">
        <StudentSidebar />
        <Box
          flex="1"
          ml={isCollapsed ? "60px" : "240px"}
          transition="all 0.3s"
          w={`calc(100% - ${isCollapsed ? "60px" : "240px"})`}
          overflowY="auto"
          position="relative"
          p={8}
        >
          <VStack spacing={8} align="stretch" maxW="1400px" mx="auto">
            {/* Header Section */}
            <Box
              opacity="0"
              transform="translateY(10px)"
              animation="fadeIn 0.2s ease-out forwards"
              sx={{
                '@keyframes fadeIn': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(10px)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                perspective: 1000,
                transform: 'translate3d(0,0,0)'
              }}
            >
              <Heading color={textColor} size="lg" mb={2}>
                Academic Progress
              </Heading>
              <Text color={mutedColor}>
                Track your academic performance and achievements
              </Text>
            </Box>

            {/* Overall Stats */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {overallStats.map((stat) => (
                <Card
                  key={stat.label}
                  {...cardStyle}
                  position="relative"
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    h="4px"
                    bgGradient="linear(to-r, #CDF683, #B5E853)"
                  />
                  <CardBody>
                    <Stat>
                      <Flex align="center" mb={2}>
                        <Icon as={stat.icon} color="brand.primary" boxSize={6} mr={2} />
                        <StatLabel color={textColor}>{stat.label}</StatLabel>
                      </Flex>
                      <StatNumber color={textColor} fontSize="2xl">
                        {stat.value}
                      </StatNumber>
                      <StatHelpText color={mutedColor}>
                        <StatArrow type={stat.change > 0 ? 'increase' : 'decrease'} />
                        {Math.abs(stat.change)} from last semester
                      </StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>

            {/* Course Progress */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {courses.map((course) => (
                <Card
                  key={course.name}
                  {...cardStyle}
                  position="relative"
                  overflow="hidden"
                  bgGradient={subjectGradients[course.name.split(' ')[0]]}
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    h="4px"
                    bgGradient="linear(to-r, #CDF683, #B5E853)"
                  />
                  <CardBody>
                    <VStack align="stretch" spacing={4}>
                      <Flex justify="space-between" align="center">
                        <Heading size="md" color={textColor}>{course.name}</Heading>
                        <Badge
                          bg={accentColor}
                          color="brand.dark.primary"
                          fontSize="sm"
                          px={2}
                          borderRadius="full"
                        >
                          {course.grade}
                        </Badge>
                      </Flex>
                      <Box>
                        <Text color={mutedColor} mb={2}>Progress</Text>
                        <Progress
                          value={course.progress}
                          size="sm"
                          sx={{
                            '& > div': {
                              bgGradient: 'linear(to-r, #CDF683, #B5E853)',
                            }
                          }}
                          borderRadius="full"
                          bg="rgba(255, 255, 255, 0.1)"
                        />
                      </Box>
                      <Flex justify="space-between" align="center">
                        <Stat>
                          <StatHelpText color={mutedColor}>
                            <StatArrow type={course.change > 0 ? 'increase' : 'decrease'} />
                            {Math.abs(course.change)}% from last month
                          </StatHelpText>
                        </Stat>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default StudentProgress;
