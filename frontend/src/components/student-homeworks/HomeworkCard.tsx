import * as React from 'react';
import {
  Card,
  CardBody,
  Text,
  Badge,
  Progress,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCalendar, FiBook } from 'react-icons/fi';

const MotionCard = motion(Card);

interface HomeworkCardProps {
  homework: {
    id: string;
    title: string;
    course: string;
    dueDate: string;
    status: 'pending' | 'submitted' | 'graded' | 'overdue';
    progress?: number;
    description: string;
  };
  onClick: () => void;
}

const HomeworkCard: React.FC<HomeworkCardProps> = React.memo(({ homework, onClick }) => {
  const statusColors = {
    pending: 'yellow',
    submitted: 'green',
    graded: 'blue',
    overdue: 'red',
  };

  return (
    <MotionCard
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      bg="rgba(255, 255, 255, 0.08)"
      borderRadius="xl"
      border="1px solid rgba(255, 255, 255, 0.1)"
      cursor="pointer"
      h="100%"
      style={{ willChange: 'transform' }}
    >
      <CardBody>
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold" color="white">
              {homework.title}
            </Text>
            <Badge colorScheme={statusColors[homework.status]}>
              {homework.status.charAt(0).toUpperCase() + homework.status.slice(1)}
            </Badge>
          </HStack>
          
          <HStack spacing={4} color="gray.300">
            <HStack>
              <Icon as={FiBook} />
              <Text fontSize="sm">{homework.course}</Text>
            </HStack>
            <HStack>
              <Icon as={FiCalendar} />
              <Text fontSize="sm">{homework.dueDate}</Text>
            </HStack>
          </HStack>

          <Text color="gray.300" noOfLines={2} fontSize="sm">
            {homework.description}
          </Text>

          {homework.progress !== undefined && (
            <Progress
              value={homework.progress}
              size="sm"
              colorScheme="green"
              bg="whiteAlpha.200"
              borderRadius="full"
            />
          )}
        </VStack>
      </CardBody>
    </MotionCard>
  );
});

export default HomeworkCard;
