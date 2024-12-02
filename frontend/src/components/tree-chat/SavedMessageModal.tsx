import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, HStack, Icon, Text, IconButton, Box, VStack, Button, useToast } from '@chakra-ui/react';
import { BsBookmark, BsX, BsCopy, BsChat } from 'react-icons/bs';

interface SavedMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMessage: string;
  setInputValue: (value: string) => void;
  setShowWelcome: (value: boolean) => void;
}

export const SavedMessageModal: React.FC<SavedMessageModalProps> = ({
  isOpen,
  onClose,
  selectedMessage,
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
              <Text color="white" fontSize="xl" fontWeight="semibold">Saved Message</Text>
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
              <Text color="whiteAlpha.800" fontSize="md" lineHeight="tall" whiteSpace="pre-wrap">
                {selectedMessage}
              </Text>
              <HStack spacing={2} justify="flex-end">
                <Button
                  leftIcon={<Icon as={BsCopy} boxSize={4} />}
                  variant="ghost"
                  color="#CDF683"
                  _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMessage);
                    toast({
                      title: "Copied to clipboard",
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });
                  }}
                >
                  Copy
                </Button>
                <Button
                  leftIcon={<Icon as={BsChat} boxSize={4} />}
                  variant="ghost"
                  color="#CDF683"
                  _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                  size="sm"
                  onClick={() => {
                    setInputValue(selectedMessage);
                    onClose();
                    setShowWelcome(false);
                  }}
                >
                  Continue Chat
                </Button>
              </HStack>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
