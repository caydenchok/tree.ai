import { Box, SimpleGrid, Card, CardBody, VStack, HStack, Text, Button, Icon, Badge, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { BsQuestionCircle } from 'react-icons/bs';

const MotionCard = motion(Card);

export interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  titleColor: string;
  actions: string[];
}

interface AIFeaturesProps {
  features: AIFeature[];
  selectedMode: string;
  onModeSelect: (mode: string) => void;
}

export const AIFeatures: React.FC<AIFeaturesProps> = ({
  features,
  selectedMode,
  onModeSelect,
}) => {
  return (
    <SimpleGrid 
      columns={{ base: 1, md: 3, lg: 3 }} 
      spacing={2}
      h="100%"
    >
      {features.map((feature, index) => (
        <MotionCard
          key={feature.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          bgGradient={feature.gradient}
          borderRadius="xl"
          overflow="hidden"
          _hover={{ 
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px -6px rgba(0, 0, 0, 0.3)'
          }}
          transition="all 0.3s ease"
          position="relative"
          minH="160px"
          maxH="180px"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.100"
            opacity={0.7}
            pointerEvents="none"
          />
          <CardBody position="relative" zIndex={1} py={4} px={5}>
            <VStack align="start" spacing={3}>
              <HStack spacing={2} justify="space-between" width="full">
                <HStack>
                  <Text fontSize="xl">{feature.icon}</Text>
                  <Text 
                    fontSize="lg" 
                    fontWeight="bold" 
                    color={feature.titleColor}
                    fontFamily="'Space Grotesk', sans-serif"
                    letterSpacing="tight"
                  >
                    {feature.title}
                  </Text>
                </HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  color={feature.titleColor}
                  p={1}
                  height="auto"
                  minW="auto"
                  _hover={{
                    bg: "blackAlpha.200"
                  }}
                  onClick={() => onModeSelect(feature.id)}
                >
                  <Icon as={BsQuestionCircle} boxSize={4} />
                </Button>
              </HStack>
              <Text 
                fontSize="sm" 
                color="black" 
                noOfLines={2}
                fontFamily="'Inter', sans-serif"
                letterSpacing="wide"
              >
                {feature.description}
              </Text>
              <Flex wrap="wrap" gap={2} mt={1}>
                {feature.actions.map((action, idx) => (
                  <Badge
                    key={idx}
                    fontSize="xs"
                    color="black"
                    bg="blackAlpha.200"
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontFamily="'Inter', sans-serif"
                    fontWeight="medium"
                    letterSpacing="wide"
                  >
                    {action}
                  </Badge>
                ))}
              </Flex>
            </VStack>
          </CardBody>
        </MotionCard>
      ))}
    </SimpleGrid>
  );
};
