import { Box, HStack, VStack, Text, IconButton, Avatar, Tooltip, Badge } from '@chakra-ui/react';
import { FiCopy, FiBookmark, FiShare2, FiThumbsUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Message } from '../../types/chat';

const MotionBox = motion(Box);

interface ChatMessageProps {
  message: Message;
  mode: 'chat' | 'essay' | 'research' | 'summary' | 'analysis';
  onSave?: () => void;
  onCopy?: () => void;
  onShare?: () => void;
  onLike?: () => void;
  isSaved?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  mode,
  onSave,
  onCopy,
  onShare,
  onLike,
  isSaved
}) => {
  const isAI = message.role === 'assistant';

  const getModeIcon = () => {
    switch (mode) {
      case 'essay':
        return '📝';
      case 'research':
        return '📚';
      case 'summary':
        return '📋';
      case 'analysis':
        return '🔍';
      default:
        return null;
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        p={6}
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
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between">
            <HStack spacing={3}>
              <Avatar
                size="sm"
                name={isAI ? "Tree AI" : "You"}
                src={isAI ? "/ai-avatar.png" : undefined}
                bg={isAI ? "green.500" : "blue.500"}
              />
              <VStack align="start" spacing={0}>
                <Text color="white" fontWeight="semibold">
                  {isAI ? 'Tree AI' : 'You'}
                </Text>
                {mode !== 'chat' && (
                  <Badge
                    colorScheme="green"
                    variant="subtle"
                    fontSize="xs"
                  >
                    {getModeIcon()} {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Badge>
                )}
              </VStack>
            </HStack>
            
            <HStack spacing={2}>
              {onCopy && (
                <Tooltip label="Copy" placement="top">
                  <IconButton
                    aria-label="Copy message"
                    icon={<FiCopy />}
                    size="sm"
                    variant="ghost"
                    color="#CDF683"
                    onClick={onCopy}
                    _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                  />
                </Tooltip>
              )}
              
              {onSave && (
                <Tooltip label={isSaved ? "Unsave" : "Save"} placement="top">
                  <IconButton
                    aria-label={isSaved ? "Unsave message" : "Save message"}
                    icon={<FiBookmark />}
                    size="sm"
                    variant="ghost"
                    color={isSaved ? "#CDF683" : "white"}
                    onClick={onSave}
                    _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                  />
                </Tooltip>
              )}
              
              {onShare && (
                <Tooltip label="Share" placement="top">
                  <IconButton
                    aria-label="Share message"
                    icon={<FiShare2 />}
                    size="sm"
                    variant="ghost"
                    color="white"
                    onClick={onShare}
                    _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                  />
                </Tooltip>
              )}
              
              {onLike && isAI && (
                <Tooltip label="Helpful" placement="top">
                  <IconButton
                    aria-label="Mark as helpful"
                    icon={<FiThumbsUp />}
                    size="sm"
                    variant="ghost"
                    color="white"
                    onClick={onLike}
                    _hover={{ bg: "rgba(205, 246, 131, 0.1)" }}
                  />
                </Tooltip>
              )}
            </HStack>
          </HStack>
          
          <Text color="whiteAlpha.800" fontSize="md" whiteSpace="pre-wrap">
            {message.content}
          </Text>

          {/* Mode-specific additional content */}
          {mode === 'research' && message.citations && (
            <Box mt={2} p={3} bg="whiteAlpha.50" borderRadius="md">
              <Text color="whiteAlpha.900" fontSize="sm" fontWeight="semibold" mb={1}>
                Citations
              </Text>
              <VStack align="stretch" spacing={1}>
                {message.citations.map((citation, index) => (
                  <Text key={index} color="whiteAlpha.800" fontSize="sm">
                    {citation}
                  </Text>
                ))}
              </VStack>
            </Box>
          )}
        </VStack>
      </Box>
    </MotionBox>
  );
};
