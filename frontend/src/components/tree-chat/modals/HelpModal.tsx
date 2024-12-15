import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Box,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FaKeyboard, FaLightbulb, FaInfoCircle } from 'react-icons/fa';
import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HelpItem {
  icon: typeof FaKeyboard;
  title: string;
  description: string;
}

const helpItems: HelpItem[] = [
  {
    icon: FaKeyboard,
    title: 'Keyboard Shortcuts',
    description: 'Press "/" to focus on chat input, "Esc" to clear current input',
  },
  {
    icon: FaLightbulb,
    title: 'Smart Features',
    description: 'Use "@" to mention topics, "#" to add tags to your messages',
  },
  {
    icon: FaInfoCircle,
    title: 'Getting Started',
    description: 'Begin by selecting a topic or typing your question in the chat',
  },
];

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent
        bg="gray.900"
        borderColor="whiteAlpha.200"
        borderWidth="1px"
        boxShadow="xl"
      >
        <ModalHeader color="white">Help & Tips</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            {helpItems.map((item, index) => (
              <Box
                key={index}
                p={4}
                bg="whiteAlpha.50"
                borderRadius="md"
                transition="all 0.2s"
                _hover={{ bg: 'whiteAlpha.100' }}
              >
                <Flex align="center">
                  <Icon
                    as={item.icon}
                    color="#CDF683"
                    boxSize={5}
                    mr={3}
                  />
                  <Box>
                    <Text color="white" fontWeight="bold">
                      {item.title}
                    </Text>
                    <Text color="whiteAlpha.800" fontSize="sm">
                      {item.description}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
