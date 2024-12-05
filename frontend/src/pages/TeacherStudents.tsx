import * as React from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Input,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Heading,
  Card,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Portal,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Tooltip,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiMail,
  FiMessageSquare,
  FiMoreVertical,
  FiUserPlus,
  FiFilter,
  FiUsers,
  FiBookOpen,
  FiActivity,
  FiClock,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi';
import { FaBrain, FaLightbulb, FaMagic } from 'react-icons/fa';
import { motion } from 'framer-motion';
import TeacherSidebar from '../components/layout/TeacherSidebar';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@chakra-ui/react';
import AITeachingAssistant from '../components/AITeachingAssistant';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionTr = motion(Tr);

// Mock data for students
const mockStudents = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    avatar: '',
    course: 'Mathematics',
    grade: 'A',
    attendance: '95%',
    status: 'Active',
    lastActive: '2 hours ago',
    progress: 78,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: '',
    grade: 'B+',
    attendance: '88%',
    course: 'Physics',
    status: 'inactive',
    lastActive: '1 day ago',
  },
  // Add more mock students as needed
];

const TeacherStudents = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterCourse, setFilterCourse] = React.useState('all');
  const [filterStatus, setFilterStatus] = React.useState('all');

  // Theme colors
  const bgColor = "#22271d";
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = "#2a2f25";
  const textColor = useColorModeValue('gray.100', 'white');
  const mutedColor = useColorModeValue('gray.400', 'gray.400');
  const accentColor = '#CDF683'; // Brand primary color
  const secondaryColor = '#1A202C'; // Brand secondary color

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#cdf683';
      case 'inactive':
        return 'red';
      default:
        return 'gray';
    }
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  React.useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  const { isOpen: isAiOpen, onOpen: onAiOpen, onClose: onAiClose } = useDisclosure();
  const [aiSuggestion, setAiSuggestion] = React.useState('');
  const [selectedStudent, setSelectedStudent] = React.useState<any>(null);

  const aiFeatures = [
    {
      title: 'Performance Analysis',
      description: 'Get AI-powered insights about student performance trends',
      icon: FaBrain,
      action: 'Analyze'
    },
    {
      title: 'Personalized Learning Plans',
      description: 'Generate customized learning plans based on student data',
      icon: FaLightbulb,
      action: 'Generate'
    },
    {
      title: 'Engagement Insights',
      description: 'Understand student engagement patterns and get recommendations',
      icon: FaMagic,
      action: 'Review'
    }
  ];

  const handleAiAnalysis = (feature: any) => {
    const suggestions = [
      "Based on recent performance data, consider implementing more interactive exercises for better engagement.",
      "The student's learning pattern suggests they might benefit from additional visual learning materials.",
      "Recent attendance patterns indicate potential scheduling conflicts. Consider flexible learning options.",
      "Performance trends show strong analytical skills. Recommend advanced problem-solving challenges."
    ];
    setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
    onAiOpen();
  };

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse === 'all' || student.course === filterCourse;
    const matchesStatus = filterStatus === 'all' || student.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const stats = {
    totalStudents: mockStudents.length,
    activeStudents: mockStudents.filter(s => s.status === 'Active').length,
    averageAttendance: '87%',
    averageGrade: 'B+'
  };

  return (
    <Flex h="100vh" overflow="hidden">
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
          {/* Header with Stats */}
          <MotionFlex
            direction={{ base: 'column', lg: 'row' }}
            justify="space-between"
            align={{ base: 'stretch', lg: 'center' }}
            gap={6}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box>
              <Heading size="lg" mb={2} color="white">
                {t('My Students')}
              </Heading>
              <Text color={mutedColor}>
                {t('Manage and monitor your students\' progress')}
              </Text>
            </Box>
            <Button
              leftIcon={<FiUserPlus />}
              bg={accentColor}
              color={secondaryColor}
              size="lg"
              boxShadow="md"
              _hover={{ 
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
                bg: 'brand.hover'
              }}
              transition="all 0.2s"
            >
              {t('Add New Student')}
            </Button>
          </MotionFlex>

          {/* AI Features */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
            {aiFeatures.map((feature, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  h="100%"
                  bg="rgba(255, 255, 255, 0.05)"
                  borderColor="whiteAlpha.200"
                  borderWidth={1}
                  _hover={{
                    transform: 'translateY(-4px)',
                    shadow: 'lg',
                    bg: 'rgba(255, 255, 255, 0.08)'
                  }}
                  transition="all 0.2s"
                  cursor="pointer"
                  onClick={() => handleAiAnalysis(feature)}
                >
                  <CardBody>
                    <VStack spacing={4} align="start" h="100%">
                      <Flex 
                        align="center" 
                        w="100%"
                        mb={2}
                      >
                        <Box
                          p={2}
                          bg={hoverBg}
                          borderRadius="lg"
                          color={accentColor}
                          mr={3}
                        >
                          <feature.icon size={24} />
                        </Box>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold" fontSize="lg" color="white">
                            {feature.title}
                          </Text>
                          <Text fontSize="sm" color={mutedColor}>
                            {feature.description}
                          </Text>
                        </VStack>
                      </Flex>
                      <Button
                        size="sm"
                        width="full"
                        bg={accentColor}
                        color="gray.800"
                        _hover={{ bg: 'brand.hover' }}
                        leftIcon={<FiZap />}
                        mt="auto"
                      >
                        {feature.action}
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* Stats Overview */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {[
              { 
                label: 'Total Students',
                value: stats.totalStudents,
                icon: FiUsers,
                change: '+12%',
                timeframe: 'from last month'
              },
              {
                label: 'Active Students',
                value: stats.activeStudents,
                icon: FiActivity,
                change: '+8%',
                timeframe: 'from last week'
              },
              {
                label: 'Average Attendance',
                value: stats.averageAttendance,
                icon: FiClock,
                change: '+5%',
                timeframe: 'from last month'
              },
              {
                label: 'Average Grade',
                value: stats.averageGrade,
                icon: FiBookOpen,
                change: '+3%',
                timeframe: 'from last semester'
              }
            ].map((stat, index) => (
              <Card
                key={index}
                bg="rgba(255, 255, 255, 0.05)"
                borderColor="whiteAlpha.200"
                borderWidth={1}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.2s"
              >
                <CardBody p={6}>
                  <Stat>
                    <Flex align="center" mb={4}>
                      <Box
                        p={3}
                        bg={hoverBg}
                        borderRadius="lg"
                        color={accentColor}
                        mr={4}
                      >
                        <stat.icon size={20} />
                      </Box>
                      <StatLabel fontSize="sm" color={mutedColor}>{t(stat.label)}</StatLabel>
                    </Flex>
                    <StatNumber fontSize="3xl" fontWeight="bold" color={textColor} mb={2}>
                      {stat.value}
                    </StatNumber>
                    <StatHelpText mb={0} color={accentColor} fontSize="sm">
                      <StatArrow type="increase" color={accentColor} />
                      {stat.change} {t(stat.timeframe)}
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Search and Filters */}
          <Card p={6} bg="rgba(255, 255, 255, 0.05)" borderColor="whiteAlpha.200" borderWidth={1}>
            <HStack spacing={4} wrap="wrap">
              <InputGroup maxW="300px">
                <InputLeftElement pointerEvents="none">
                  <FiSearch color={mutedColor} />
                </InputLeftElement>
                <Input
                  placeholder={t('Search students...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg="rgba(255, 255, 255, 0.05)"
                  color={textColor}
                  borderColor="whiteAlpha.200"
                  borderRadius="lg"
                  _focus={{
                    borderColor: accentColor,
                    boxShadow: `0 0 0 1px ${accentColor}`,
                  }}
                  _placeholder={{ color: mutedColor }}
                />
              </InputGroup>
              <Select
                maxW="200px"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                icon={<FiFilter />}
                bg="rgba(255, 255, 255, 0.05)"
                color={textColor}
                borderColor="whiteAlpha.200"
                borderRadius="lg"
                _focus={{
                  borderColor: accentColor,
                  boxShadow: `0 0 0 1px ${accentColor}`,
                }}
              >
                <option value="all">{t('All Courses')}</option>
                <option value="Mathematics">{t('Mathematics')}</option>
                <option value="Physics">{t('Physics')}</option>
                <option value="Chemistry">{t('Chemistry')}</option>
              </Select>
              <Select
                maxW="200px"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                icon={<FiFilter />}
                bg="rgba(255, 255, 255, 0.05)"
                color={textColor}
                borderColor="whiteAlpha.200"
                borderRadius="lg"
                _focus={{
                  borderColor: accentColor,
                  boxShadow: `0 0 0 1px ${accentColor}`,
                }}
              >
                <option value="all">{t('All Status')}</option>
                <option value="active">{t('Active')}</option>
                <option value="inactive">{t('Inactive')}</option>
              </Select>
            </HStack>
          </Card>

          {/* Students Table */}
          <Card overflow="hidden" bg="rgba(255, 255, 255, 0.05)" borderColor="whiteAlpha.200" borderWidth={1}>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead bg={hoverBg}>
                  <Tr>
                    <Th color={mutedColor}>{t('Student')}</Th>
                    <Th color={mutedColor}>{t('Course')}</Th>
                    <Th color={mutedColor}>{t('Grade')}</Th>
                    <Th color={mutedColor}>{t('Attendance')}</Th>
                    <Th color={mutedColor}>{t('Status')}</Th>
                    <Th color={mutedColor}>{t('Last Active')}</Th>
                    <Th color={mutedColor}>{t('Actions')}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredStudents.map((student, index) => (
                    <MotionTr
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      <Td>
                        <HStack spacing={3}>
                          <Avatar
                            size="md"
                            name={student.name}
                            src={student.avatar}
                            bg={accentColor}
                            color={secondaryColor}
                          />
                          <Box>
                            <Text fontWeight="medium" color={textColor}>
                              {student.name}
                            </Text>
                            <Text fontSize="sm" color={mutedColor}>
                              {student.email}
                            </Text>
                          </Box>
                        </HStack>
                      </Td>
                      <Td>
                        <Badge
                          bg={accentColor}
                          color={secondaryColor}
                          px={3}
                          py={1}
                          borderRadius="full"
                          textTransform="capitalize"
                        >
                          {student.course}
                        </Badge>
                      </Td>
                      <Td fontWeight="medium" color={textColor}>
                        {student.grade}
                      </Td>
                      <Td>
                        <Badge
                          bg={
                            parseInt(student.attendance) > 90
                              ? accentColor
                              : parseInt(student.attendance) > 75
                              ? 'yellow.400'
                              : 'red.400'
                          }
                          color={
                            parseInt(student.attendance) > 90
                              ? secondaryColor
                              : 'white'
                          }
                          px={3}
                          py={1}
                          borderRadius="full"
                        >
                          {student.attendance}
                        </Badge>
                      </Td>
                      <Td>
                        <Badge
                          bg={getStatusColor(student.status)}
                          color="white"
                          px={3}
                          py={1}
                          borderRadius="full"
                          textTransform="capitalize"
                        >
                          {student.status}
                        </Badge>
                      </Td>
                      <Td color={mutedColor}>{student.lastActive}</Td>
                      <Td>
                        <HStack spacing={2}>
                          <Tooltip label={t('Send Email')} placement="top">
                            <IconButton
                              aria-label="Send email"
                              icon={<FiMail />}
                              size="sm"
                              variant="ghost"
                              color={mutedColor}
                              _hover={{
                                bg: hoverBg,
                                color: accentColor,
                              }}
                            />
                          </Tooltip>
                          <Tooltip label={t('Send Message')} placement="top">
                            <IconButton
                              aria-label="Send message"
                              icon={<FiMessageSquare />}
                              size="sm"
                              variant="ghost"
                              color={mutedColor}
                              _hover={{
                                bg: hoverBg,
                                color: accentColor,
                              }}
                            />
                          </Tooltip>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="More options"
                              icon={<FiMoreVertical />}
                              size="sm"
                              variant="ghost"
                              color={mutedColor}
                              _hover={{
                                bg: hoverBg,
                                color: accentColor,
                              }}
                            />
                            <Portal>
                              <MenuList
                                bg="rgba(255, 255, 255, 0.05)"
                                borderColor="whiteAlpha.200"
                                boxShadow="lg"
                                zIndex={1400}
                                py={2}
                              >
                                <MenuItem
                                  px={4}
                                  py={2}
                                  _hover={{ bg: hoverBg }}
                                  color={textColor}
                                >
                                  {t('View Profile')}
                                </MenuItem>
                                <MenuItem
                                  px={4}
                                  py={2}
                                  _hover={{ bg: hoverBg }}
                                  color={textColor}
                                >
                                  {t('Edit Details')}
                                </MenuItem>
                                <MenuItem
                                  px={4}
                                  py={2}
                                  _hover={{ bg: hoverBg }}
                                  color={textColor}
                                >
                                  {t('View Progress')}
                                </MenuItem>
                                <MenuItem
                                  px={4}
                                  py={2}
                                  _hover={{ bg: 'red.50' }}
                                  color="red.500"
                                >
                                  {t('Remove Student')}
                                </MenuItem>
                              </MenuList>
                            </Portal>
                          </Menu>
                        </HStack>
                      </Td>
                    </MotionTr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Card>
        </VStack>
      </Box>
      <AITeachingAssistant />
    </Flex>
  );
};

export default TeacherStudents;
