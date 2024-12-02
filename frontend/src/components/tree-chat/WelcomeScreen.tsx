import { VStack, Text, SimpleGrid, Card, CardBody, Icon, HStack } from '@chakra-ui/react';
import { BsChat, BsFileText, BsTable, BsPeople } from 'react-icons/bs';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

export const WelcomeScreen: React.FC = () => {
  const features = [
    {
      icon: BsChat,
      title: "Natural Conversations",
      description: "Chat naturally with our AI about any topic"
    },
    {
      icon: BsFileText,
      title: "Save Important Messages",
      description: "Bookmark and organize key information"
    },
    {
      icon: BsTable,
      title: "Structured Learning",
      description: "Get organized, step-by-step explanations"
    },
    {
      icon: BsPeople,
      title: "Personalized Help",
      description: "Receive tailored assistance for your needs"
    }
  ];

  return (
    <VStack spacing={8} align="stretch" pt={8} pb={32}>
      <VStack spacing={3} textAlign="center">
        <Text color="white" fontSize="2xl" fontWeight="bold">
          Welcome to TreeChat
        </Text>
        <Text color="whiteAlpha.700" fontSize="lg">
          Your AI-powered learning companion
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} px={4}>
        {features.map((feature, index) => (
          <MotionCard
            key={index}
            bg="rgba(255, 255, 255, 0.03)"
            borderWidth="1px"
            borderColor="whiteAlpha.100"
            _hover={{
              bg: "rgba(255, 255, 255, 0.06)",
              borderColor: "#CDF683",
              transform: "scale(1.02)"
            }}
            transition="all 0.2s"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CardBody>
              <HStack spacing={4}>
                <Icon as={feature.icon} boxSize={6} color="#CDF683" />
                <VStack align="start" spacing={1}>
                  <Text color="white" fontWeight="semibold">
                    {feature.title}
                  </Text>
                  <Text color="whiteAlpha.700" fontSize="sm">
                    {feature.description}
                  </Text>
                </VStack>
              </HStack>
            </CardBody>
          </MotionCard>
        ))}
      </SimpleGrid>
    </VStack>
  );
};
