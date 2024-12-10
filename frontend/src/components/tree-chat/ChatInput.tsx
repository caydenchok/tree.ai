import { Box, InputGroup, Input, InputRightElement, IconButton, Icon, HStack, Menu, MenuButton, MenuList, MenuItem, Text, useColorModeValue, Container } from '@chakra-ui/react';
import { BsSend, BsLightningCharge, BsUpload, BsCamera } from 'react-icons/bs';
import { FaRobot, FaBrain, FaGraduationCap, FaCode, FaPencilAlt, FaChartLine } from 'react-icons/fa';

export type ChatMode = {
  id: string;
  name: string;
  icon: any;
  description: string;
};

const chatModes: ChatMode[] = [
  {
    id: 'default',
    name: 'Assistant',
    icon: FaRobot,
    description: 'General-purpose AI assistant'
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: FaBrain,
    description: 'More creative and imaginative responses'
  },
  {
    id: 'tutor',
    name: 'Tutor',
    icon: FaGraduationCap,
    description: 'Focused on teaching and explaining concepts'
  },
  {
    id: 'coder',
    name: 'Coder',
    icon: FaCode,
    description: 'Specialized in programming and technical tasks'
  },
  {
    id: 'writer',
    name: 'Writer',
    icon: FaPencilAlt,
    description: 'Helps with writing and content creation'
  },
  {
    id: 'analyst',
    name: 'Analyst',
    icon: FaChartLine,
    description: 'Focused on data analysis and insights'
  }
];

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
  selectedMode?: string;
  onModeChange?: (mode: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  isLoading,
  selectedMode = 'default',
  onModeChange = () => {}
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const menuHoverBg = useColorModeValue('whiteAlpha.200', 'whiteAlpha.200');
  const selectedBg = useColorModeValue('whiteAlpha.300', 'whiteAlpha.300');

  return (
    <Box
      position="fixed"
      bottom={7}
      left={0}
      right={0}
      px={4}
      zIndex={2}
    >
      <Container maxW="7xl">
        <Box
          mx="auto"
          bg="rgba(0, 0, 0, 0.3)"
          backdropFilter="blur(10px)"
          borderRadius="2xl"
          p={4}
          borderWidth="1px"
          borderColor="whiteAlpha.200"
        >
          <HStack spacing={3}>
            <InputGroup size="lg">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                bg="whiteAlpha.50"
                border="none"
                _focus={{
                  boxShadow: 'none',
                  bg: 'whiteAlpha.100'
                }}
                color="white"
                _placeholder={{ color: 'whiteAlpha.400' }}
                pr="180px"
              />
              <InputRightElement width="auto" pr={2}>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Upload file"
                    icon={<Icon as={BsUpload} boxSize={5} />}
                    variant="ghost"
                    color="#CDF683"
                    size="sm"
                    _hover={{ bg: 'whiteAlpha.100' }}
                  />
                  <IconButton
                    aria-label="Take photo"
                    icon={<Icon as={BsCamera} boxSize={5} />}
                    variant="ghost"
                    color="#CDF683"
                    size="sm"
                    _hover={{ bg: 'whiteAlpha.100' }}
                  />
                  <IconButton
                    aria-label="Send message"
                    icon={isLoading ? 
                      <Icon as={BsLightningCharge} className="spin" /> : 
                      <Icon as={BsSend} boxSize={4} />
                    }
                    size="md"
                    bg="#CDF683"
                    color="black"
                    isLoading={isLoading}
                    onClick={handleSendMessage}
                    _hover={{ 
                      bg: '#daff90',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(205, 246, 131, 0.4)'
                    }}
                    _active={{ 
                      bg: '#b7e05c',
                      transform: 'translateY(0)',
                      boxShadow: 'none'
                    }}
                    transition="all 0.2s"
                    borderRadius="xl"
                    w="42px"
                    h="42px"
                    disabled={!inputValue.trim() || isLoading}
                  />
                </HStack>
              </InputRightElement>
            </InputGroup>
            
            <Menu placement="top-start">
              <MenuButton
                as={IconButton}
                aria-label="Select mode"
                icon={<Icon as={chatModes.find(mode => mode.id === selectedMode)?.icon || FaRobot} />}
                variant="ghost"
                color="#CDF683"
                _hover={{ bg: 'whiteAlpha.100' }}
                _active={{ bg: 'whiteAlpha.200' }}
                size="lg"
              />
              <MenuList
                bg="rgba(0, 0, 0, 0.8)"
                borderColor="whiteAlpha.200"
                backdropFilter="blur(10px)"
                boxShadow="dark-lg"
              >
                {chatModes.map((mode) => (
                  <MenuItem
                    key={mode.id}
                    onClick={() => onModeChange(mode.id)}
                    bg={selectedMode === mode.id ? selectedBg : 'transparent'}
                    _hover={{ bg: menuHoverBg }}
                    icon={<Icon as={mode.icon} color="#CDF683" />}
                  >
                    <Box>
                      <Text color="white">{mode.name}</Text>
                      <Text fontSize="xs" color="whiteAlpha.600">{mode.description}</Text>
                    </Box>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};
