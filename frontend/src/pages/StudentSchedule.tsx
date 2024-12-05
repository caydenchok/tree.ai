import * as React from 'react';
import { useMemo, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Heading,
  useDisclosure,
  HStack,
  VStack,
  Grid,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaThLarge, FaCalendarAlt, FaClock, FaHistory, FaBookmark, FaTools, FaGraduationCap } from 'react-icons/fa';
import StudentSidebar from '../components/layout/StudentSidebar/StudentSidebar';
import CalendarView from '../components/student-schedule/CalendarView';
import ClassCards from '../components/student-schedule/ClassCards';
import EventModal from '../components/student-schedule/EventModal';
import WeatherWidget from '../components/student-schedule/WeatherWidget';
import StudyTimer from '../components/student-schedule/StudyTimer';
import CardGroup from '../components/student-schedule/CardGroup';
import UpcomingClassCard from '../components/student-schedule/UpcomingClassCard';
import { ScheduleItem } from '../components/student-schedule/types';
import { motion } from 'framer-motion';
import { useSidebar } from '../contexts/SidebarContext';

const MotionBox = motion(Box);

const StudentSchedule: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const { 
    isOpen: isEventModalOpen, 
    onOpen: onEventModalOpen, 
    onClose: onEventModalClose 
  } = useDisclosure();

  // Theme colors
  const bgGradient = "linear(to-br, brand.secondary, brand.dark.primary)";
  const cardBg = "rgba(0, 0, 0, 0.2)";
  const hoverBg = "rgba(205, 246, 131, 0.1)";
  const borderColor = "rgba(205, 246, 131, 0.2)";
  const textColor = "brand.white.primary";
  const mutedColor = "whiteAlpha.700";
  const accentColor = "#cdf683";

  const scheduleItems: ScheduleItem[] = [
    {
      id: '1',
      courseName: 'Mathematics',
      instructor: 'Dr. Smith',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      type: 'lecture',
      status: 'upcoming',
      link: 'https://meet.google.com/abc'
    },
    {
      id: '2',
      courseName: 'Physics Lab',
      instructor: 'Prof. Johnson',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      type: 'laboratory',
      status: 'upcoming',
      link: 'https://meet.google.com/def'
    },
    {
      id: '3',
      courseName: 'Literature',
      instructor: 'Ms. Davis',
      startTime: '9:00 AM',
      endTime: '10:30 AM',
      type: 'lecture',
      status: 'today',
      link: 'https://meet.google.com/ghi'
    }
  ];

  const todayClasses = useMemo(() => 
    scheduleItems.filter(item => item.status === 'today'),
    [scheduleItems]
  );

  const upcomingClasses = useMemo(() => 
    scheduleItems.filter(item => item.status === 'upcoming'),
    [scheduleItems]
  );

  const events = useMemo(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);

    return scheduleItems.map((item, index) => {
      const [startHour, startMinute] = item.startTime.replace(' AM', '').replace(' PM', '').split(':')
        .map(num => parseInt(num));
      const [endHour, endMinute] = item.endTime.replace(' AM', '').replace(' PM', '').split(':')
        .map(num => parseInt(num));
      
      const isPM = item.startTime.includes('PM');
      const adjustedStartHour = isPM && startHour !== 12 ? startHour + 12 : startHour;
      const adjustedEndHour = item.endTime.includes('PM') && endHour !== 12 ? endHour + 12 : endHour;

      const eventDate = new Date(monday);
      eventDate.setDate(monday.getDate() + index);
      
      const start = new Date(eventDate);
      start.setHours(adjustedStartHour, startMinute, 0);
      
      const end = new Date(eventDate);
      end.setHours(adjustedEndHour, endMinute, 0);

      return {
        title: item.courseName,
        start: start.toISOString(),
        end: end.toISOString(),
        backgroundColor: ['#FF6B6B', '#4FACFE', '#43E97B'][index % 3],
        borderColor: ['#FF8E53', '#00F2FE', '#38F9D7'][index % 3],
        extendedProps: {
          instructor: item.instructor,
          type: item.type,
          status: item.status,
          link: item.link
        }
      };
    });
  }, [scheduleItems]);

  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event);
    onEventModalOpen();
  };

  // Header styles
  const headerStyle = {
    background: "linear(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.1) 100%)",
    backdropFilter: 'blur(8px)',
    borderBottom: `1px solid ${borderColor}`,
    padding: '1.5rem',
    position: 'sticky' as const,
    top: 0,
    zIndex: 10,
    willChange: 'transform',
  };

  const iconContainerStyle = {
    position: 'relative' as const,
    padding: '0.5rem',
    borderRadius: '0.75rem',
    background: "rgba(0, 0, 0, 0.08)",
    border: `1px solid ${borderColor}`,
    willChange: 'transform',
  };

  const iconStyle = {
    color: "#CDF683",
    transition: 'transform 0.2s ease',
  };

  const limeButtonStyle = {
    bg: 'transparent',
    color: accentColor,
    border: `1px solid ${borderColor}`,
    _hover: {
      bg: hoverBg,
      transform: 'translateY(-2px)',
      boxShadow: '0 0 20px rgba(205, 246, 131, 0.2)',
    },
    _active: {
      bg: hoverBg,
    },
    transition: 'all 0.2s',
  };

  // Button styles
  const buttonStyle = {
    bg: 'transparent',
    color: accentColor,
    border: '1px solid',
    borderColor: borderColor,
    _hover: {
      bg: hoverBg,
      transform: 'translateY(-2px)',
      boxShadow: '0 0 20px rgba(205, 246, 131, 0.2)',
    },
    _active: {
      bg: hoverBg,
    },
    transition: 'all 0.2s',
  };

  // Card styles
  const cardStyle = {
    bg: cardBg,
    borderColor: borderColor,
    borderWidth: '1px',
    borderRadius: 'xl',
    boxShadow: 'lg',
    p: 4,
    transition: 'all 0.2s',
    _hover: {
      transform: 'translateY(-2px)',
      boxShadow: '2xl',
      borderColor: accentColor,
    }
  };

  return (
    <Box
      as={MotionBox}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      bg={bgGradient}
      color={textColor}
      overflow="hidden"
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
        zIndex={1}
        h="100vh"
      >
        <Flex h="100vh" bg={bgGradient} overflow="hidden">
          <StudentSidebar />
          <Box
            flex="1"
            ml={isCollapsed ? "60px" : "240px"}
            transition="all 0.3s"
            bg={bgGradient}
            color={textColor}
            overflow="hidden"
          >
            {/* Header */}
            <Box {...headerStyle}>
              <Flex justify="space-between" align="center">
                <HStack spacing={4}>
                  <Box {...iconContainerStyle}>
                    <Icon as={FaCalendarAlt} boxSize={5} {...iconStyle} />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Heading size="lg" color={textColor}>Schedule</Heading>
                    <Text color={mutedColor}>Manage your classes and events</Text>
                  </VStack>
                </HStack>
                <HStack spacing={4}>
                  <Button
                    {...buttonStyle}
                    leftIcon={<Icon as={showCalendar ? FaThLarge : FaCalendarAlt} />}
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    {showCalendar ? 'Card View' : 'Calendar View'}
                  </Button>
                </HStack>
              </Flex>
            </Box>

            {/* Main Content */}
            <Box p={8}>
              {showCalendar ? (
                <CalendarView events={events} onEventClick={handleEventClick} />
              ) : (
                <Grid
                  templateColumns={{ base: "1fr", lg: "1fr 300px" }}
                  gap={8}
                >
                  <VStack align="stretch" spacing={8}>
                    {/* Today's Classes */}
                    <CardGroup title="Today's Classes" icon={FaClock} {...cardStyle}>
                      <ClassCards 
                        classes={todayClasses || []} 
                        onEventClick={handleEventClick} 
                      />
                    </CardGroup>

                    {/* Upcoming Classes */}
                    <CardGroup title="Upcoming Classes" icon={FaCalendarAlt} {...cardStyle}>
                      <ClassCards 
                        classes={upcomingClasses} 
                        onEventClick={handleEventClick}
                      />
                    </CardGroup>
                  </VStack>

                  {/* Widgets Section */}
                  <VStack align="stretch" spacing={6}>
                    <CardGroup title="Widgets" icon={FaTools} isMinimizable {...cardStyle}>
                      <VStack spacing={6} align="stretch">
                        <WeatherWidget />
                        <StudyTimer />
                      </VStack>
                    </CardGroup>
                  </VStack>
                </Grid>
              )}
            </Box>

            {/* Event Modal */}
            <EventModal
              isOpen={isEventModalOpen}
              onClose={onEventModalClose}
              event={selectedEvent}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default StudentSchedule;
