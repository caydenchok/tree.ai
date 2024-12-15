import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { FeatureCard } from '../FeatureCard';

interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  titleColor: string;
  actions: string[];
}

interface AIFeatureGridProps {
  features: AIFeature[];
  selectedMode: string;
  onModeSelect: (mode: string) => void;
}

export const AIFeatureGrid: React.FC<AIFeatureGridProps> = ({
  features,
  selectedMode,
  onModeSelect,
}) => {
  return (
    <Box 
      display={{ base: 'none', md: 'block' }} 
      w="100%" 
      px={4}
      h="calc(100vh - 250px)"
      overflow="hidden"
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={6}
        w="100%"
        mx="auto"
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            index={index}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
