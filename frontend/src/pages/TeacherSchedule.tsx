import { useState, type FC, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Button,
  IconButton,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  Badge,
  Card,
  CardBody,
} from '@chakra-ui/react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaBrain,
  FaClock,
} from 'react-icons/fa';
import TeacherSidebar from '../components/TeacherSidebar';

interface ScheduleEvent {
  id: string;
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  type: 'class' | 'meeting' | 'office-hours';
  description?: string;
}

interface NewEvent {
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  type: 'class' | 'meeting' | 'office-hours';
  description: string;
}

const TeacherSchedule: FC = () => {
  // States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  const [selectedDay, setSelectedDay] = useState('Monday');
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([
    {
      id: '1',
      title: 'Mathematics Class',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:30',
      type: 'class',
      description: 'Advanced calculus topics for Grade 12',
    },
    {
      id: '2',
      title: 'Office Hours',
      day: 'Monday',
      startTime: '13:00',
      endTime: '14:00',
      type: 'office-hours',
      description: 'Open consultation for students',
    },
    {
      id: '3',
      title: 'Department Meeting',
      day: 'Tuesday',
      startTime: '11:00',
      endTime: '12:00',
      type: 'meeting',
      description: 'Weekly department sync-up',
    },
    {
      id: '4',
      title: 'Physics Lab',
      day: 'Wednesday',
      startTime: '14:00',
      endTime: '16:00',
      type: 'class',
      description: 'Practical experiments in mechanics',
    },
    {
      id: '5',
      title: 'Student Counseling',
      day: 'Thursday',
      startTime: '10:00',
      endTime: '11:00',
      type: 'office-hours',
      description: 'One-on-one student guidance sessions',
    }
  ]);
  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: '',
    day: 'Monday',
    startTime: '',
    endTime: '',
    type: 'class',
    description: '',
  });

  // Theme colors - matching dashboard
  const bgColor = "#22271d";
  const cardBg = "#2a2f25";
  const textColor = "#FFFFFF";
  const mutedColor = "whiteAlpha.700";
  const accentColor = '#CDF683';
  const hoverBg = "#32392c";

  // Modal controls
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Event type badge colors
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'green';
      case 'meeting':
        return 'purple';
      case 'office-hours':
        return 'orange';
      default:
        return 'gray';
    }
  };

  // Handle new event submission
  const handleAddEvent = () => {
    const event: ScheduleEvent = {
      id: Math.random().toString(36).substr(2, 9),
      ...newEvent,
    };
    setScheduleEvents([...scheduleEvents, event]);
    setNewEvent({
      title: '',
      day: 'Monday',
      startTime: '',
      endTime: '',
      type: 'class',
      description: '',
    });
    onClose();
  };

  // Handle event deletion
  const handleDeleteEvent = (id: string) => {
    setScheduleEvents(scheduleEvents.filter(event => event.id !== id));
  };

  // Days of the week
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <Box 
      w="100%" 
      h="100vh" 
      overflow="hidden"
      transition="all 0.3s ease"
    >
      <Flex h="100%">
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
          {/* Header Section */}
          <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Heading size="lg" mb={2} color={textColor}>Schedule Management</Heading>
              <Text color={mutedColor}>Organize your teaching schedule efficiently</Text>
            </Box>
            <HStack spacing={4}>
              <Tooltip label="Get AI Suggestions">
                <IconButton
                  aria-label="AI Assistant"
                  icon={<FaBrain />}
                  size="lg"
                  color={accentColor}
                  variant="ghost"
                  _hover={{ bg: hoverBg }}
                />
              </Tooltip>
              <Button
                leftIcon={<FaPlus />}
                bg={accentColor}
                color="black"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 20px ${accentColor}40`,
                  bg: `${accentColor}dd`
                }}
                onClick={onOpen}
              >
                Add Event
              </Button>
            </HStack>
          </Flex>

          {/* Day Selection */}
          <HStack spacing={4} mb={6} overflowX="auto" py={2}>
            {days.map((day) => (
              <Button
                key={day}
                onClick={() => setSelectedDay(day)}
                variant={selectedDay === day ? "solid" : "outline"}
                bg={selectedDay === day ? accentColor : 'transparent'}
                color={selectedDay === day ? 'black' : accentColor}
                borderColor={accentColor}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'md',
                  bg: selectedDay === day ? accentColor : 'whiteAlpha.100'
                }}
                size="lg"
                borderRadius="full"
                px={6}
              >
                {day}
              </Button>
            ))}
          </HStack>

          {/* Schedule Grid */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {scheduleEvents
              .filter((event) => event.day === selectedDay)
              .map((event) => (
                <Card
                  key={event.id}
                  bg={cardBg}
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  shadow="lg"
                  borderRadius="xl"
                  overflow="hidden"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: `0 4px 20px ${accentColor}20`,
                    bg: hoverBg,
                  }}
                  transition="all 0.3s"
                >
                  <CardBody>
                    <Flex justify="space-between" align="start" mb={3}>
                      <VStack align="start" spacing={1}>
                        <Heading size="md" color={textColor}>{event.title}</Heading>
                        <Badge 
                          colorScheme={getBadgeColor(event.type)}
                          borderRadius="full"
                          px={3}
                          py={1}
                        >
                          {event.type}
                        </Badge>
                      </VStack>
                      <HStack>
                        <IconButton
                          aria-label="Edit event"
                          icon={<FaEdit />}
                          size="sm"
                          variant="ghost"
                          color={accentColor}
                          _hover={{ bg: hoverBg }}
                        />
                        <IconButton
                          aria-label="Delete event"
                          icon={<FaTrash />}
                          size="sm"
                          variant="ghost"
                          color="red.300"
                          _hover={{ bg: 'red.900' }}
                          onClick={() => handleDeleteEvent(event.id)}
                        />
                      </HStack>
                    </Flex>
                    <HStack spacing={4} mb={3}>
                      <HStack>
                        <FaClock color={mutedColor} />
                        <Text color={mutedColor}>
                          {event.startTime} - {event.endTime}
                        </Text>
                      </HStack>
                    </HStack>
                    {event.description && (
                      <Text color={mutedColor} noOfLines={2}>
                        {event.description}
                      </Text>
                    )}
                  </CardBody>
                </Card>
              ))}

            {/* Empty State */}
            {scheduleEvents.filter((event) => event.day === selectedDay).length === 0 && (
              <Flex
                direction="column"
                align="center"
                justify="center"
                p={12}
                textAlign="center"
                bg={cardBg}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                gridColumn={{ lg: "span 2" }}
                _hover={{
                  borderColor: 'whiteAlpha.300',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.3s"
              >
                <Box as={FaCalendarAlt} w={12} h={12} color={accentColor} mb={4} />
                <Text color={mutedColor} fontSize="lg" mb={4}>
                  No events scheduled for {selectedDay}
                </Text>
                <Button
                  leftIcon={<FaPlus />}
                  bg={accentColor}
                  color="black"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 20px ${accentColor}40`,
                    bg: `${accentColor}dd`
                  }}
                  onClick={onOpen}
                >
                  Add Event
                </Button>
              </Flex>
            )}
          </SimpleGrid>

          {/* Add Event Modal */}
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay backdropFilter="blur(4px)" />
            <ModalContent bg={cardBg}>
              <ModalHeader color={textColor}>Add New Event</ModalHeader>
              <ModalCloseButton color="white" />
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel color={textColor}>Title</FormLabel>
                    <Input
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Event title"
                      bg={bgColor}
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                      color={textColor}
                      _placeholder={{ color: "whiteAlpha.500" }}
                      _hover={{ borderColor: "whiteAlpha.400" }}
                      _focus={{ borderColor: accentColor, boxShadow: "none" }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel color={textColor}>Day</FormLabel>
                    <Select
                      value={newEvent.day}
                      onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}
                      bg={bgColor}
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                      color={textColor}
                      _hover={{ borderColor: "whiteAlpha.400" }}
                      _focus={{ borderColor: accentColor, boxShadow: "none" }}
                    >
                      {days.map((day) => (
                        <option key={day} value={day} style={{background: bgColor}}>{day}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <HStack width="100%" spacing={4}>
                    <FormControl isRequired>
                      <FormLabel color={textColor}>Start Time</FormLabel>
                      <Input
                        type="time"
                        value={newEvent.startTime}
                        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                        bg={bgColor}
                        border="1px solid"
                        borderColor="whiteAlpha.300"
                        color={textColor}
                        _hover={{ borderColor: "whiteAlpha.400" }}
                        _focus={{ borderColor: accentColor, boxShadow: "none" }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel color={textColor}>End Time</FormLabel>
                      <Input
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                        bg={bgColor}
                        border="1px solid"
                        borderColor="whiteAlpha.300"
                        color={textColor}
                        _hover={{ borderColor: "whiteAlpha.400" }}
                        _focus={{ borderColor: accentColor, boxShadow: "none" }}
                      />
                    </FormControl>
                  </HStack>
                  <FormControl isRequired>
                    <FormLabel color={textColor}>Event Type</FormLabel>
                    <Select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as ScheduleEvent['type'] })}
                      bg={bgColor}
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                      color={textColor}
                      _hover={{ borderColor: "whiteAlpha.400" }}
                      _focus={{ borderColor: accentColor, boxShadow: "none" }}
                    >
                      <option value="class" style={{background: bgColor}}>Class</option>
                      <option value="meeting" style={{background: bgColor}}>Meeting</option>
                      <option value="office-hours" style={{background: bgColor}}>Office Hours</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel color={textColor}>Description</FormLabel>
                    <Textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Add event description"
                      bg={bgColor}
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                      color={textColor}
                      _placeholder={{ color: "whiteAlpha.500" }}
                      _hover={{ borderColor: "whiteAlpha.400" }}
                      _focus={{ borderColor: accentColor, boxShadow: "none" }}
                      rows={3}
                    />
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="ghost" 
                  mr={3} 
                  onClick={onClose}
                  color={textColor}
                  _hover={{ bg: hoverBg }}
                >
                  Cancel
                </Button>
                <Button 
                  bg={accentColor}
                  color="black"
                  onClick={handleAddEvent}
                  _hover={{
                    bg: `${accentColor}dd`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 20px ${accentColor}40`,
                  }}
                >
                  Add Event
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
    </Box>
  );
};

export default TeacherSchedule;
