import React from 'react';
import {
  SimpleGrid,
  Box,
  Text,
  Badge,
  IconButton,
  Icon,
  VStack,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaVideo, 
  FaClock, 
  FaChalkboardTeacher, 
  FaRobot, 
  FaBrain,
  FaCalculator,
  FaAtom,
  FaBook,
  FaFlask,
  FaLaptopCode,
  FaPalette,
  FaGlobe,
  FaMusic,
  FaDna,
  FaLanguage
} from 'react-icons/fa';
import { ScheduleItem } from './types';

interface ClassCardsProps {
  classes: ScheduleItem[];
  onEventClick?: (item: ScheduleItem) => void;
}

const MotionBox = motion(Box);

// Subject icon and color mapping
const subjectConfig: { [key: string]: { 
  icon: any; 
  gradient: string; 
  shadowColor: string;
  iconColor: string;
  titleColor: string;
  subtextColor: string;
  badgeColor: string;
} } = {
  Mathematics: { 
    icon: FaCalculator, 
    gradient: 'linear(to-br, #FF6B6B, #FF8E53)',
    shadowColor: 'rgba(255, 107, 107, 0.4)',
    iconColor: '#2C2C2C',
    titleColor: '#2C2C2C',
    subtextColor: '#4A4A4A',
    badgeColor: 'rgba(44, 44, 44, 0.9)'
  },
  Physics: { 
    icon: FaAtom,
    gradient: 'linear(to-br, #4FACFE, #00F2FE)',
    shadowColor: 'rgba(79, 172, 254, 0.4)',
    iconColor: '#2C2C2C',
    titleColor: '#2C2C2C',
    subtextColor: '#4A4A4A',
    badgeColor: 'rgba(44, 44, 44, 0.9)'
  },
  Literature: { 
    icon: FaBook,
    gradient: 'linear(to-br, #43E97B, #38F9D7)',
    shadowColor: 'rgba(67, 233, 123, 0.4)',
    iconColor: '#2C2C2C',
    titleColor: '#2C2C2C',
    subtextColor: '#4A4A4A',
    badgeColor: 'rgba(44, 44, 44, 0.9)'
  },
  Chemistry: { 
    icon: FaFlask,
    gradient: 'linear(to-br, #FA709A, #FEE140)',
    shadowColor: 'rgba(250, 112, 154, 0.4)',
    iconColor: '#2C2C2C',
    titleColor: '#2C2C2C',
    subtextColor: '#4A4A4A',
    badgeColor: 'rgba(44, 44, 44, 0.9)'
  },
  Programming: { 
    icon: FaLaptopCode,
    gradient: 'linear(to-br, #667EEA, #764BA2)',
    shadowColor: 'rgba(102, 126, 234, 0.4)',
    iconColor: '#2C2C2C',
    titleColor: '#2C2C2C',
    subtextColor: '#4A4A4A',
    badgeColor: 'rgba(44, 44, 44, 0.9)'
  },
  Art: { 
    icon: FaPalette,
    gradient: 'linear(to-br, #FF0844, #FFB199)',
    shadowColor: 'rgba(255, 8, 68, 0.4)',
    iconColor: '#2C2C2C',
    titleColor: '#2C2C2C',
    subtextColor: '#4A4A4A',
    badgeColor: 'rgba(44, 44, 44, 0.9)'
  },
  Geography: { 
    icon: FaGlobe,
    gradient: 'linear(to-br, #7F7FD5, #86A8E7)',
    shadowColor: 'rgba(127, 127, 213, 0.4)',
    iconColor: '#2C2C2C',
    titleColor: '#2C2C2C',
    subtextColor: '#4A4A4A',
    badgeColor: 'rgba(44, 44, 44, 0.9)'
  },
  Music: { 
    icon: FaMusic,
    gradient: 'linear(to-br, #FF3CAC, #784BA0)',
    shadowColor: 'rgba(255, 60, 172, 0.4)',
    iconColor: '#2C2C2C',
    titleColor: '#2C2C2C',
    subtextColor: '#4A4A4A',
    badgeColor: 'rgba(44, 44, 44, 0.9)'
  },
  Biology: { 
    icon: FaDna,
    gradient: 'linear(to-br, #56CCF2, #2F80ED)',
    shadowColor: 'rgba(86, 204, 242, 0.4)',
    iconColor: '#2C2C2C',
    titleColor: '#2C2C2C',
    subtextColor: '#4A4A4A',
    badgeColor: 'rgba(44, 44, 44, 0.9)'
  },
  Language: { 
    icon: FaLanguage,
    gradient: 'linear(to-br, #F857A6, #FF5858)',
    shadowColor: 'rgba(248, 87, 166, 0.4)',
    iconColor: '#2C2C2C',
    titleColor: '#2C2C2C',
    subtextColor: '#4A4A4A',
    badgeColor: 'rgba(44, 44, 44, 0.9)'
  }
};

const ClassCards: React.FC<ClassCardsProps> = ({ classes, onEventClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return { color: '#ECC94B', bg: 'rgba(236, 201, 75, 0.1)' };
      case 'ongoing':
        return { color: '#68D391', bg: 'rgba(104, 211, 145, 0.1)' };
      case 'completed':
        return { color: '#A0AEC0', bg: 'rgba(160, 174, 192, 0.1)' };
      default:
        return { color: '#A0AEC0', bg: 'rgba(160, 174, 192, 0.1)' };
    }
  };

  return (
    <SimpleGrid 
      columns={{ base: 1, md: 2, lg: 3 }} 
      spacing={6}
      w="100%"
    >
      {(classes || []).map((item) => {
        const statusColor = getStatusColor(item.status);
        const config = subjectConfig[item.courseName] || {
          icon: FaBook,
          gradient: 'linear(to-br, #43E97B, #38F9D7)',
          shadowColor: 'rgba(67, 233, 123, 0.4)',
          iconColor: '#2C2C2C',
          titleColor: '#2C2C2C',
          subtextColor: '#4A4A4A',
          badgeColor: 'rgba(44, 44, 44, 0.9)'
        };
        
        return (
          <MotionBox
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              y: -5,
              boxShadow: `0 8px 30px ${config.shadowColor}`
            }}
            transition={{ duration: 0.3 }}
            borderRadius="xl"
            overflow="hidden"
            position="relative"
            cursor="pointer"
            onClick={() => onEventClick && onEventClick(item)}
            style={{ willChange: 'transform' }}
          >
            <Box
              p={6}
              position="relative"
              overflow="hidden"
              bgGradient={config.gradient}
              boxShadow={`0 4px 20px ${config.shadowColor}`}
              transition="all 0.3s"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
              _hover={{
                _before: {
                  opacity: 1,
                }
              }}
            >
              <VStack align="stretch" spacing={4}>
                {/* Header with Course Name and AI Button */}
                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={2}>
                    <HStack spacing={3}>
                      <Icon 
                        as={config.icon} 
                        color={config.iconColor}
                        boxSize={6}
                      />
                      <Text 
                        color={config.titleColor}
                        fontSize="xl" 
                        fontWeight="bold"
                        letterSpacing="tight"
                      >
                        {item.courseName}
                      </Text>
                    </HStack>
                    <HStack spacing={2} color={config.subtextColor}>
                      <Icon as={FaChalkboardTeacher} boxSize={3} />
                      <Text fontSize="sm" fontWeight="medium">{item.instructor}</Text>
                    </HStack>
                  </VStack>
                  {item.link && (
                    <IconButton
                      aria-label="Join Class"
                      icon={<Icon as={FaBrain} boxSize={7} />}
                      variant="ghost"
                      color={config.iconColor}
                      size="lg"
                      p={4}
                      _hover={{ 
                        bg: 'whiteAlpha.200',
                        transform: 'scale(1.1)',
                        color: config.badgeColor
                      }}
                      transition="all 0.2s"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(item.link, '_blank');
                      }}
                    />
                  )}
                </Flex>

                {/* Time and Status */}
                <HStack spacing={4} pt={2}>
                  <HStack spacing={2} color={config.subtextColor}>
                    <Icon as={FaClock} boxSize={3} />
                    <Text fontSize="sm" fontWeight="medium">
                      {item.startTime} - {item.endTime}
                    </Text>
                  </HStack>
                  <Badge
                    bg={`${config.badgeColor}33`}
                    color={config.titleColor}
                    px={3}
                    py={1}
                    borderRadius="full"
                    textTransform="capitalize"
                    fontWeight="600"
                  >
                    {item.status}
                  </Badge>
                </HStack>
              </VStack>
            </Box>
          </MotionBox>
        );
      })}
    </SimpleGrid>
  );
};

export default ClassCards;
