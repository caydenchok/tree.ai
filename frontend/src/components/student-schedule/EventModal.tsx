import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Box,
  Text,
  Badge,
  Button,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { FaRobot, FaBrain } from 'react-icons/fa';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, event }) => {
  if (!event) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent 
        bg="rgba(0, 0, 0, 0.9)" 
        border="1px solid" 
        borderColor="#cdf683"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="0 0 20px rgba(205, 246, 131, 0.1)"
      >
        <ModalHeader 
          color="white" 
          borderBottom="1px solid" 
          borderColor="rgba(205, 246, 131, 0.2)"
          bg="rgba(205, 246, 131, 0.05)"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Icon as={FaRobot} color="#cdf683" />
          Class Details
        </ModalHeader>
        <ModalCloseButton color="whiteAlpha.700" />
        <ModalBody py={6}>
          <VStack align="stretch" spacing={4}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              p={4}
              bg="rgba(205, 246, 131, 0.05)"
              borderRadius="lg"
              border="1px solid"
              borderColor="rgba(205, 246, 131, 0.2)"
              _hover={{
                bg: "rgba(205, 246, 131, 0.1)",
                transform: "translateY(-2px)",
                boxShadow: "0 0 20px rgba(205, 246, 131, 0.1)"
              }}
              transition="all 0.2s"
            >
              <VStack align="start" spacing={3}>
                <Box>
                  <Text color="whiteAlpha.700" fontSize="sm">Course</Text>
                  <Text color="#cdf683" fontSize="xl" fontWeight="bold">
                    {event.title}
                  </Text>
                </Box>
                
                <Box>
                  <Text color="whiteAlpha.700" fontSize="sm">Instructor</Text>
                  <Text color="white" fontSize="md">
                    {event.extendedProps?.instructor}
                  </Text>
                </Box>

                <Box>
                  <Text color="whiteAlpha.700" fontSize="sm">Time</Text>
                  <Text color="white" fontSize="md">
                    {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                  </Text>
                </Box>

                <HStack spacing={4}>
                  <Box>
                    <Text color="whiteAlpha.700" fontSize="sm" mb={1}>Type</Text>
                    <Badge
                      bg="rgba(205, 246, 131, 0.1)"
                      color="#cdf683"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      textTransform="capitalize"
                      border="1px solid"
                      borderColor="rgba(205, 246, 131, 0.2)"
                    >
                      {event.extendedProps?.type}
                    </Badge>
                  </Box>

                  <Box>
                    <Text color="whiteAlpha.700" fontSize="sm" mb={1}>Status</Text>
                    <Badge
                      bg={
                        event.extendedProps?.status === 'upcoming' ? 'rgba(236, 201, 75, 0.1)' :
                        event.extendedProps?.status === 'ongoing' ? 'rgba(72, 187, 120, 0.1)' :
                        'rgba(160, 174, 192, 0.1)'
                      }
                      color={
                        event.extendedProps?.status === 'upcoming' ? '#ecc94b' :
                        event.extendedProps?.status === 'ongoing' ? '#48bb78' :
                        '#a0aec0'
                      }
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      textTransform="capitalize"
                      border="1px solid"
                      borderColor={
                        event.extendedProps?.status === 'upcoming' ? 'rgba(236, 201, 75, 0.2)' :
                        event.extendedProps?.status === 'ongoing' ? 'rgba(72, 187, 120, 0.2)' :
                        'rgba(160, 174, 192, 0.2)'
                      }
                    >
                      {event.extendedProps?.status}
                    </Badge>
                  </Box>
                </HStack>
              </VStack>
            </MotionBox>

            <Button
              leftIcon={<Icon as={FaBrain} />}
              size="lg"
              w="full"
              onClick={() => {/* TODO: Add AI chat navigation */}}
              bg="transparent"
              color="#cdf683"
              border="2px solid"
              borderColor="#cdf683"
              _hover={{
                bg: "rgba(205, 246, 131, 0.1)",
                transform: "translateY(-2px)",
                boxShadow: "0 0 20px rgba(205, 246, 131, 0.2)"
              }}
              _active={{
                bg: "rgba(205, 246, 131, 0.2)"
              }}
              transition="all 0.2s"
            >
              AI Assistant
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
