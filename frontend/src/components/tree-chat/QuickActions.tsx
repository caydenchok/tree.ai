import { SimpleGrid, Icon, Text, Card } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import React from 'react';

const MotionCard = motion(Card);

interface QuickAction {
  title: string;
  icon: IconType;
}

interface QuickActionsProps {
  actions: QuickAction[];
  onActionSelect: (title: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  onActionSelect,
}) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} width="100%">
      {actions.map((action, index) => (
        <MotionCard
          key={action.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => onActionSelect(action.title)}
          cursor="pointer"
          p={4}
          bg="whiteAlpha.50"
          _hover={{
            bg: "whiteAlpha.100",
            transform: "translateY(-2px)",
          }}
          transition="all 0.2s"
        >
          <Icon as={action.icon} boxSize={5} mb={2} />
          <Text fontSize="sm" fontWeight="medium">
            {action.title}
          </Text>
        </MotionCard>
      ))}
    </SimpleGrid>
  );
};
