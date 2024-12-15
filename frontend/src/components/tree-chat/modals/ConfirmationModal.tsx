import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Icon,
} from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';
import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent
        bg="gray.900"
        borderColor="whiteAlpha.200"
        borderWidth="1px"
        boxShadow="xl"
      >
        <ModalHeader color="white" display="flex" alignItems="center">
          {isDestructive && (
            <Icon
              as={FaExclamationTriangle}
              color="red.500"
              mr={2}
              boxSize={5}
            />
          )}
          {title}
        </ModalHeader>
        <ModalBody>
          <Text color="whiteAlpha.800">{message}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={onClose}
            color="white"
            _hover={{ bg: 'whiteAlpha.100' }}
          >
            {cancelText}
          </Button>
          <Button
            colorScheme={isDestructive ? 'red' : 'green'}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            bg={isDestructive ? 'red.500' : '#CDF683'}
            color={isDestructive ? 'white' : 'gray.800'}
            _hover={{
              bg: isDestructive ? 'red.600' : '#d8f799',
              transform: 'translateY(-1px)',
            }}
            transition="all 0.2s"
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
