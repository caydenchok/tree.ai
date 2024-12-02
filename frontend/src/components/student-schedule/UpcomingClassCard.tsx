import React from 'react';
import {
  Box,
  Text,
  HStack,
  VStack,
  Icon,
  Link,
  Badge,
} from '@chakra-ui/react';
import { FaVideo, FaClock, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ScheduleItem } from './types';

interface UpcomingClassCardProps {
  classItem: ScheduleItem;
}

const UpcomingClassCard: React.FC<UpcomingClassCardProps> = ({ classItem }) => {
  return (
    <Box
      as={motion.div}
      bg="rgba(255, 255, 255, 0.03)"
      borderRadius="lg"
      p={4}
      mb={3}
      borderWidth="1px"
      borderColor="rgba(205, 246, 131, 0.1)"
      _hover={{
        bg: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(205, 246, 131, 0.2)",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
      transition="all 0.2s"
    >
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Text fontWeight="600" color="white" fontSize="md">
            {classItem.courseName}
          </Text>
          <Badge
            colorScheme="green"
            bg="rgba(205, 246, 131, 0.1)"
            color="#CDF683"
            fontSize="xs"
            px={2}
            py={1}
            borderRadius="full"
          >
            {classItem.type}
          </Badge>
        </HStack>

        <HStack spacing={4} color="whiteAlpha.700" fontSize="sm">
          <HStack spacing={1}>
            <Icon as={FaUser} />
            <Text>{classItem.instructor}</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaClock} />
            <Text>{`${classItem.startTime} - ${classItem.endTime}`}</Text>
          </HStack>
        </HStack>

        <Link
          href={classItem.link}
          isExternal
          _hover={{ textDecoration: 'none' }}
        >
          <HStack
            spacing={2}
            color="#CDF683"
            fontSize="sm"
            p={2}
            borderRadius="md"
            bg="rgba(205, 246, 131, 0.05)"
            _hover={{
              bg: "rgba(205, 246, 131, 0.1)",
            }}
            transition="all 0.2s"
          >
            <Icon as={FaVideo} />
            <Text>Join Class</Text>
          </HStack>
        </Link>
      </VStack>
    </Box>
  );
};

export default UpcomingClassCard;
