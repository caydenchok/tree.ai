import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Text,
} from '@chakra-ui/react';

interface HomeworkSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  homework: {
    title: string;
    description: string;
  };
}

const HomeworkSubmitModal: React.FC<HomeworkSubmitModalProps> = React.memo(({
  isOpen,
  onClose,
  onSubmit,
  homework,
}) => {
  const [content, setContent] = React.useState('');

  const handleSubmit = () => {
    onSubmit(content);
    setContent('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(6px)" />
      <ModalContent
        bg="rgba(255, 255, 255, 0.08)"
        backdropFilter="blur(6px)"
        borderRadius="xl"
        border="1px solid rgba(255, 255, 255, 0.1)"
        boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
        color="white"
      >
        <ModalHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text>Submit Homework: {homework.title}</Text>
          <ModalCloseButton position="static" />
        </ModalHeader>
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Text fontSize="sm" color="gray.300">
              {homework.description}
            </Text>
            <FormControl>
              <FormLabel>Your Answer</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your answer here..."
                size="lg"
                minH="200px"
                bg="whiteAlpha.50"
                border="1px solid"
                borderColor="whiteAlpha.200"
                _hover={{ borderColor: 'whiteAlpha.300' }}
                _focus={{ borderColor: 'green.300', boxShadow: 'none' }}
              />
            </FormControl>
            <Button colorScheme="green" onClick={handleSubmit}>
              Submit Homework
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default HomeworkSubmitModal;
