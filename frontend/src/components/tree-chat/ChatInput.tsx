import { Box, HStack, Input, IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { FiSend, FiMic, FiPaperclip, FiEdit, FiBook, FiFileText, FiClipboard } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onVoice?: () => void;
  onAttachment?: () => void;
  isLoading?: boolean;
  mode: 'chat' | 'essay' | 'research' | 'summary' | 'analysis';
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onVoice,
  onAttachment,
  isLoading,
  mode
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        p={4}
        borderTop="1px solid"
        borderColor="whiteAlpha.200"
        bg="rgba(0, 0, 0, 0.3)"
        backdropFilter="blur(10px)"
      >
        <HStack spacing={2}>
          {/* Mode-specific action buttons */}
          {mode !== 'chat' && (
            <Tooltip label={`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode active`} placement="top">
              <IconButton
                aria-label="Current mode"
                icon={
                  mode === 'essay' ? <FiEdit /> :
                  mode === 'research' ? <FiBook /> :
                  mode === 'summary' ? <FiFileText /> :
                  <FiClipboard />
                }
                variant="ghost"
                colorScheme="green"
                size="lg"
                isDisabled={true}
                _hover={{ bg: "whiteAlpha.200" }}
              />
            </Tooltip>
          )}

          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              mode === 'chat' ? "Type your message..." :
              mode === 'essay' ? "Enter your essay topic or content..." :
              mode === 'research' ? "Enter your research query..." :
              mode === 'summary' ? "Paste the text to summarize..." :
              "Enter text for analysis..."
            }
            size="lg"
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor="whiteAlpha.200"
            _hover={{
              borderColor: "whiteAlpha.300",
              bg: "whiteAlpha.200"
            }}
            _focus={{
              borderColor: "#cdf683",
              boxShadow: "0 0 0 1px #cdf683"
            }}
            color="white"
            _placeholder={{ color: "whiteAlpha.500" }}
          />
          
          {onAttachment && (
            <Tooltip label="Attach file" placement="top">
              <IconButton
                aria-label="Attach file"
                icon={<FiPaperclip />}
                onClick={onAttachment}
                variant="ghost"
                colorScheme="green"
                size="lg"
                isDisabled={isLoading}
                _hover={{
                  bg: "whiteAlpha.200"
                }}
              />
            </Tooltip>
          )}
          
          {onVoice && (
            <Tooltip label="Voice input" placement="top">
              <IconButton
                aria-label="Voice input"
                icon={<FiMic />}
                onClick={onVoice}
                variant="ghost"
                colorScheme="green"
                size="lg"
                isDisabled={isLoading}
                _hover={{
                  bg: "whiteAlpha.200"
                }}
              />
            </Tooltip>
          )}
          
          <Tooltip label="Send message" placement="top">
            <IconButton
              aria-label="Send message"
              icon={<FiSend />}
              onClick={onSend}
              colorScheme="green"
              size="lg"
              isLoading={isLoading}
              isDisabled={!value.trim()}
              _hover={{
                transform: "translateY(-2px)",
                shadow: "lg"
              }}
              transition="all 0.2s"
            />
          </Tooltip>
        </HStack>
      </Box>
    </MotionBox>
  );
};
