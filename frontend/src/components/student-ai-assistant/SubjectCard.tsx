import * as React from 'react';
import { Box, HStack, VStack, Icon, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Card } from '@chakra-ui/react';
import { IconType } from 'react-icons';

const MotionCard = motion(Card);

interface SubjectCardProps {
  subject: {
    name: string;
    icon: IconType;
    description: string;
    gradient: string;
    shadowColor: string;
  };
  onSelect: (subject: string) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = React.memo(({ subject, onSelect }) => {
  return (
    <MotionCard
      onClick={() => onSelect(subject.name)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ willChange: 'transform' }}
    >
      <Box
        p={6}
        borderRadius="xl"
        bgGradient={subject.gradient}
        boxShadow={`0 4px 20px ${subject.shadowColor}`}
        cursor="pointer"
        _hover={{
          transform: 'translateY(-5px)',
          boxShadow: `0 6px 24px ${subject.shadowColor}`
        }}
        transition="all 0.3s"
      >
        <HStack spacing={4}>
          <Icon 
            as={subject.icon} 
            boxSize={8} 
            color="white"
            _groupHover={{ transform: 'rotate(10deg)' }}
            transition="transform 0.3s"
          />
          <VStack align="start" spacing={1}>
            <Text color="white" fontWeight="bold" fontSize="xl">
              {subject.name}
            </Text>
            <Text color="whiteAlpha.900" fontSize="sm">
              {subject.description}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </MotionCard>
  );
});

export default SubjectCard;
