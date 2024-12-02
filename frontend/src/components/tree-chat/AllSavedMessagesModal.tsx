import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, HStack, Icon, Text, IconButton, Box, VStack, useToast } from '@chakra-ui/react';
import { BsBookmark, BsX, BsCopy, BsChat } from 'react-icons/bs';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface SavedMessage {
  id: number;
  content: string;
  timestamp: string;
  topic: string;
}

interface AllSavedMessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedMessages: SavedMessage[];
  setSavedMessages: (messages: SavedMessage[]) => void;
  setInputValue: (value: string) => void;
  setShowWelcome: (value: boolean) => void;
}

export const AllSavedMessagesModal: React.FC<AllSavedMessagesModalProps> = ({
  isOpen,
  onClose,
  savedMessages,
  setSavedMessages,
  setInputValue,
  setShowWelcome,
}) => {
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(8px)" />
      <ModalContent 
        bg="transparent"
        maxH="85vh"
        boxShadow="none"
        mx={4}
      >
        <ModalHeader px={6} pt={6} pb={4}>
          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <Icon as={BsBookmark} color="#CDF683" boxSize={5} />
              <Text color="white" fontSize="xl" fontWeight="semibold">All Saved Messages</Text>
            </HStack>
            <IconButton
              aria-label="Close"
              icon={<Icon as={BsX} />}
              onClick={onClose}
              variant="ghost"
              color="#CDF683"
              _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
              size="sm"
            />
          </HStack>
        </ModalHeader>
        <ModalBody p={6}>
          <VStack spacing={4} align="stretch">
            {savedMessages.length === 0 ? (
              <Box
                py={12}
                px={6}
                bg="transparent"
                borderRadius="xl"
                textAlign="center"
                border="1px dashed"
                borderColor="whiteAlpha.200"
              >
                <Text color="whiteAlpha.600" fontSize="md">
                  No saved messages yet. Save a message to see it here!
                </Text>
              </Box>
            ) : (
              savedMessages.map((msg) => (
                <MotionBox
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Box
                    p={4}
                    bg="rgba(255, 255, 255, 0.03)"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="whiteAlpha.100"
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.06)",
                      borderColor: "whiteAlpha.200"
                    }}
                    transition="all 0.2s"
                  >
                    <VStack align="stretch" spacing={3}>
                      <HStack justify="space-between">
                        <VStack align="start" spacing={1}>
                          <Text color="white" fontWeight="semibold">
                            {msg.topic}
                          </Text>
                          <HStack spacing={2} color="whiteAlpha.600">
                            <Icon as={FiClock} boxSize={4} />
                            <Text fontSize="sm">
                              {msg.timestamp}
                            </Text>
                          </HStack>
                        </VStack>
                        <HStack>
                          <IconButton
                            aria-label="Copy message"
                            icon={<Icon as={BsCopy} boxSize={4} />}
                            variant="ghost"
                            color="#CDF683"
                            _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(msg.content);
                              toast({
                                title: "Copied to clipboard",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                              });
                            }}
                          />
                          <IconButton
                            aria-label="Continue chat"
                            icon={<Icon as={BsChat} boxSize={4} />}
                            variant="ghost"
                            color="#CDF683"
                            _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                            size="sm"
                            onClick={() => {
                              setInputValue(msg.content);
                              onClose();
                              setShowWelcome(false);
                            }}
                          />
                          <IconButton
                            aria-label="Delete message"
                            icon={<Icon as={FiTrash2} boxSize={4} />}
                            variant="ghost"
                            colorScheme="red"
                            size="sm"
                            color="whiteAlpha.600"
                            _hover={{
                              bg: "red.500",
                              color: "white"
                            }}
                            onClick={() => {
                              setSavedMessages(prev => prev.filter(m => m.id !== msg.id));
                              toast({
                                title: "Message Removed",
                                status: "info",
                                duration: 2000,
                              });
                            }}
                          />
                        </HStack>
                      </HStack>
                      <Text color="whiteAlpha.800" fontSize="md" lineHeight="tall">
                        {msg.content}
                      </Text>
                    </VStack>
                  </Box>
                </MotionBox>
              ))
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
