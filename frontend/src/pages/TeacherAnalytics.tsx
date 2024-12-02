import { useState, type FC, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Progress,
  Icon,
  VStack,
  HStack,
  Select,
} from '@chakra-ui/react';
import {
  FaChartLine,
  FaUsers,
  FaGraduationCap,
  FaClock,
  FaBrain,
  FaChartBar,
  FaChartPie,
  FaChartArea,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import TeacherSidebar from '../components/TeacherSidebar';

interface AnalyticsStat {
  label: string;
  value: string | number;
  change: number;
  icon: IconType;
}

interface PerformanceData {
  subject: string;
  averageScore: number;
  studentCount: number;
  trend: number;
}

interface AttendanceData {
  day: string;
  percentage: number;
}

interface AIFeature {
  icon: IconType;
  title: string;
  description: string;
}

const TeacherAnalytics: FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedClass, setSelectedClass] = useState('all');

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  // Theme colors
  const bgColor = "#22271d";
  const cardBg = "#2a2f25";
  const textColor = "white";
  const mutedColor = "whiteAlpha.700";
  const accentColor = "#CDF683";
  const hoverBg = "#32392c";

  // Sample analytics data
  const analyticsStats: AnalyticsStat[] = [
    {
      label: 'Total Students',
      value: 156,
      change: 12,
      icon: FaUsers,
    },
    {
      label: 'Average Performance',
      value: '85%',
      change: 5,
      icon: FaChartLine,
    },
    {
      label: 'Course Completion',
      value: '78%',
      change: -2,
      icon: FaGraduationCap,
    },
    {
      label: 'Attendance Rate',
      value: '92%',
      change: 3,
      icon: FaClock,
    },
  ];

  const performanceData: PerformanceData[] = [
    { subject: 'Mathematics', averageScore: 85, studentCount: 32, trend: 5 },
    { subject: 'Physics', averageScore: 78, studentCount: 28, trend: -2 },
    { subject: 'Chemistry', averageScore: 82, studentCount: 30, trend: 3 },
    { subject: 'Biology', averageScore: 88, studentCount: 25, trend: 7 },
  ];

  const attendanceData: AttendanceData[] = [
    { day: 'Monday', percentage: 95 },
    { day: 'Tuesday', percentage: 88 },
    { day: 'Wednesday', percentage: 92 },
    { day: 'Thursday', percentage: 85 },
    { day: 'Friday', percentage: 90 },
  ];

  const aiFeatures: AIFeature[] = [
    {
      icon: FaChartBar,
      title: 'Performance Patterns',
      description: 'Students show improved performance in morning classes',
    },
    {
      icon: FaChartPie,
      title: 'Learning Styles',
      description: '65% of students prefer visual learning methods',
    },
    {
      icon: FaChartArea,
      title: 'Engagement Metrics',
      description: 'Interactive sessions show 40% higher engagement',
    },
  ];

  return (
    <Flex 
      h="100vh" 
      overflow="hidden"
      transition="all 0.3s ease"
    >
      <TeacherSidebar onCollapse={handleSidebarCollapse} />
      <Box
        ml={isSidebarCollapsed ? "60px" : "240px"}
        flex="1"
        p={6}
        bg={bgColor}
        transition="margin-left 0.3s"
        overflow="auto"
        h="100vh"
      >
        <VStack spacing={6} align="stretch">
          {/* Header Section */}
          <Flex
            justify="space-between"
            align="center"
          >
            <Box>
              <Heading size="lg" mb={2} color={textColor}>
                Analytics Dashboard
              </Heading>
              <Text color={mutedColor}>
                Track and analyze your teaching performance and student progress
              </Text>
            </Box>
            <HStack spacing={4}>
              <Select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                bg={cardBg}
                color={textColor}
                borderColor="whiteAlpha.200"
                _hover={{ borderColor: accentColor }}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </Select>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                bg={cardBg}
                color={textColor}
                borderColor="whiteAlpha.200"
                _hover={{ borderColor: accentColor }}
              >
                <option value="all">All Classes</option>
                <option value="math">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
              </Select>
            </HStack>
          </Flex>

          {/* Stats Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {analyticsStats.map((stat) => (
              <Card
                key={stat.label}
                bg={cardBg}
                borderColor="whiteAlpha.200"
                _hover={{ transform: 'translateY(-5px)', bg: hoverBg }}
                transition="all 0.2s"
              >
                <CardBody>
                  <Flex align="center" justify="space-between">
                    <Box>
                      <Text color={mutedColor} fontSize="sm" mb={1}>
                        {stat.label}
                      </Text>
                      <Text color={textColor} fontSize="2xl" fontWeight="bold">
                        {stat.value}
                      </Text>
                      <Badge
                        colorScheme={stat.change > 0 ? 'green' : 'red'}
                        mt={2}
                      >
                        {stat.change > 0 ? '+' : ''}{stat.change}%
                      </Badge>
                    </Box>
                    <Icon
                      as={stat.icon}
                      boxSize={10}
                      color={accentColor}
                      opacity={0.8}
                    />
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Performance Analysis */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            <Card
              bg={cardBg}
              borderColor="whiteAlpha.200"
            >
              <CardBody>
                <Heading size="md" mb={4} color={textColor}>
                  Class Performance
                </Heading>
                <VStack spacing={4} align="stretch">
                  {performanceData.map((subject) => (
                    <Box key={subject.subject}>
                      <Flex justify="space-between" mb={2}>
                        <Text color={textColor}>{subject.subject}</Text>
                        <HStack spacing={4}>
                          <Text color={mutedColor}>
                            {subject.averageScore}%
                          </Text>
                          <Badge
                            colorScheme={subject.trend > 0 ? 'green' : 'red'}
                          >
                            {subject.trend > 0 ? '+' : ''}{subject.trend}%
                          </Badge>
                        </HStack>
                      </Flex>
                      <Progress
                        value={subject.averageScore}
                        sx={{
                          '& > div': {
                            background: '#cdf683 !important'
                          }
                        }}
                        bg="whiteAlpha.200"
                        borderRadius="full"
                      />
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>

            {/* Attendance Trends */}
            <Card
              bg={cardBg}
              borderColor="whiteAlpha.200"
            >
              <CardBody>
                <Heading size="md" mb={4} color={textColor}>
                  Attendance Trends
                </Heading>
                <VStack spacing={4} align="stretch">
                  {attendanceData.map((day) => (
                    <Box key={day.day}>
                      <Flex justify="space-between" mb={2}>
                        <Text color={textColor}>{day.day}</Text>
                        <Text color={mutedColor}>{day.percentage}%</Text>
                      </Flex>
                      <Progress
                        value={day.percentage}
                        sx={{
                          '& > div': {
                            background: '#cdf683 !important'
                          }
                        }}
                        bg="whiteAlpha.200"
                        borderRadius="full"
                      />
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* AI Insights */}
          <Card
            bg={cardBg}
            borderColor="whiteAlpha.200"
          >
            <CardBody>
              <Flex justify="space-between" align="center" mb={4}>
                <Box>
                  <Heading size="md" color={textColor}>
                    AI-Powered Insights
                  </Heading>
                  <Text color={mutedColor} mt={1}>
                    Smart recommendations based on your teaching data
                  </Text>
                </Box>
                <Icon as={FaBrain} boxSize={6} color={accentColor} />
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                {aiFeatures.map((feature) => (
                  <Card key={feature.title} bg={hoverBg} p={4}>
                    <VStack align="start" spacing={2}>
                      <Icon as={feature.icon} color={accentColor} />
                      <Text color={textColor} fontWeight="bold">
                        {feature.title}
                      </Text>
                      <Text color={mutedColor} fontSize="sm">
                        {feature.description}
                      </Text>
                    </VStack>
                  </Card>
                ))}
              </SimpleGrid>
            </CardBody>
          </Card>
        </VStack>
      </Box>
    </Flex>
  );
};

export default TeacherAnalytics;
