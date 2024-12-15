import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Text,
  useColorModeValue,
  HStack,
  Tooltip,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Badge,
  Avatar,
  Collapse,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  useToast,
  Divider,
  Center,
  SimpleGrid,
  Portal,
  ChevronRightIcon,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  SettingsIcon,
  EditIcon,
  AddIcon,
  LinkIcon,
  ChatIcon,
  CheckIcon,
  WarningIcon,
} from '@chakra-ui/icons';
import {
  FaUndo,
  FaRedo,
  FaCopy,
  FaMagic,
  FaRegLightbulb,
  FaShare,
  FaRobot,
  FaRegBookmark,
  FaRegImage,
  FaTable,
  FaListUl,
  FaCode,
  FaMarkdown,
  FaRegFileAlt,
  FaRegSave,
  FaHistory,
  FaRegComments,
  FaCompress,
  FaExpand,
  FaSpellCheck,
  FaGlasses,
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaListOl,
  FaQuoteRight,
  FaFileExport,
  FaFileImport,
  FaPalette,
  FaCog,
} from 'react-icons/fa';

import WriterSidebar from './WriterSidebar';

import styled from '@emotion/styled';

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  padding: 0;
  background-color: transparent;
  color: #2D3748;
  font-size: 18px;
  line-height: 1.8;
  text-align: left;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  caret-color: #2D3748;
  letter-spacing: -0.011em;

  &::placeholder {
    color: rgba(45, 55, 72, 0.4);
    font-size: 18px;
    letter-spacing: -0.011em;
  }
`;

const StyledTitleInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: #1A202C;
  font-size: 32px;
  line-height: 1.4;
  font-weight: 700;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  margin-bottom: 24px;
  padding: 0;
  letter-spacing: -0.022em;

  &::placeholder {
    color: rgba(45, 55, 72, 0.4);
    font-weight: 700;
  }
`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const FeatureButton: React.FC<{
  icon: React.ReactElement;
  label: string;
  onClick?: () => void;
  colorScheme?: string;
  isActive?: boolean;
}> = ({ icon, label, onClick, colorScheme = "gray", isActive = false }) => (
  <Tooltip label={label} hasArrow>
    <IconButton
      aria-label={label}
      icon={icon}
      onClick={onClick}
      size="sm"
      variant="ghost"
      color={isActive ? "#CDF683" : "gray.400"}
      bg={isActive ? "rgba(205, 246, 131, 0.1)" : "transparent"}
      _hover={{ 
        bg: "rgba(205, 246, 131, 0.1)",
        color: "#CDF683"
      }}
      _active={{
        bg: "rgba(205, 246, 131, 0.15)",
        color: "#CDF683"
      }}
      transition="all 0.2s"
    />
  </Tooltip>
);

const WriterPage: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [suggestions] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedMode, setSelectedMode] = useState('General');
  const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure({ defaultIsOpen: true });
  const { isOpen: isChatVisible, onToggle: onChatToggle } = useDisclosure({ defaultIsOpen: true });
  const [hasGrammarErrors, setHasGrammarErrors] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState({
    bold: false,
    italic: false,
    underline: false,
    spellcheck: true,
    grammarcheck: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const toast = useToast();

  const bgColor = 'rgba(34, 39, 29, 0.95)';
  const toolbarBg = 'rgba(22, 27, 34, 0.3)';
  const borderColor = 'rgba(48, 54, 61, 0.4)';
  const textColor = '#CDF683';
  const chatBg = 'rgba(22, 27, 34, 0.3)';
  const editorBg = 'white';
  const buttonHoverBg = 'rgba(48, 54, 61, 0.5)';

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    const words = newContent.trim() ? newContent.trim().split(/\s+/).length : 0;
    const chars = newContent.length;
    setWordCount(words);
    setCharCount(chars);
  };

  const handleGrammarCheck = () => {
    setHasGrammarErrors(Math.random() > 0.5);
    toast({
      title: "Grammar Check Complete",
      description: hasGrammarErrors ? "Found some issues to review" : "No grammar issues found",
      status: hasGrammarErrors ? "warning" : "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
      icon: hasGrammarErrors ? <WarningIcon /> : <CheckIcon />,
    });
  };

  const handleSendMessage = useCallback(() => {
    if (!chatInput.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: chatInput,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setChatInput('');

    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: 'I understand your request. How would you like me to help with your writing?',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  }, [chatInput]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement actual save logic here
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save
      setIsSaved(true);
      toast({
        title: "Document saved",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right"
      });
    } catch (error) {
      setIsSaved(false);
      toast({
        title: "Failed to save",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setIsSaved(false);
  }, [content, documentTitle]);

  const templates = [
    { id: 'blank', name: 'Blank Document', icon: FaRegFileAlt },
    { id: 'article', name: 'Article', icon: FaRegBookmark },
    { id: 'blog', name: 'Blog Post', icon: FaRegComments },
    { id: 'academic', name: 'Academic Paper', icon: FaRegFileAlt },
  ];

  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <Flex h="100vh" bg={bgColor}>
      {/* Left Sidebar */}
      <VStack
        spacing={4}
        align="center"
        py={4}
        px={2}
        bg="rgba(34, 39, 29, 0.65)"
        borderRight="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
        h="100vh"
        w="50px"
        position="sticky"
        top={0}
      >
        <IconButton
          aria-label="Back"
          icon={<ChevronLeftIcon boxSize={5} />}
          variant="ghost"
          size="sm"
          color="#CDF683"
          onClick={() => navigate(-1)}
          _hover={{
            bg: 'rgba(205, 246, 131, 0.1)',
            transform: 'translateX(-2px)'
          }}
          transition="all 0.3s ease"
        />
        
        <Box h="4" />
        
        <Tooltip label="AI Assistant" placement="right" hasArrow>
          <IconButton
            aria-label="Magic Wand"
            icon={<FaMagic />}
            variant="ghost"
            color="#CDF683"
            size="sm"
            _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
          />
        </Tooltip>
        
        <Tooltip label="Version History" placement="right" hasArrow>
          <IconButton
            aria-label="Sync"
            icon={<FaHistory />}
            variant="ghost"
            color="#CDF683"
            size="sm"
            _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
          />
        </Tooltip>
        
        <Tooltip label="Copy Document" placement="right" hasArrow>
          <IconButton
            aria-label="Copy"
            icon={<FaCopy />}
            variant="ghost"
            color="#CDF683"
            size="sm"
            _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
          />
        </Tooltip>
        
        <Tooltip label="Document Notes" placement="right" hasArrow>
          <IconButton
            aria-label="Notes"
            icon={<FaRegFileAlt />}
            variant="ghost"
            color="#CDF683"
            size="sm"
            _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
          />
        </Tooltip>
      </VStack>

      {/* Main Editor Area */}
      <Flex 
        flex="1" 
        direction="column"
        transition="margin-right 0.2s"
        marginRight={isRightSidebarOpen ? "300px" : "40px"}
      >
        {/* Toolbar */}
        <Box 
          py={2} 
          px={4}
          borderBottom="1px solid"
          borderColor={borderColor}
          bg={toolbarBg}
        >
          <HStack spacing={4} justify="space-between">
            <HStack spacing={4}>
              {/* Document Title and Type */}
              <HStack spacing={4}>
                <Box 
                  position="relative"
                  role="group"
                  display="flex"
                  alignItems="center"
                  px={3}
                  py={1}
                  borderRadius="md"
                  transition="all 0.2s"
                  _hover={{
                    bg: 'rgba(205, 246, 131, 0.05)',
                  }}
                >
                  <Input
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    size="sm"
                    width="200px"
                    fontWeight="medium"
                    variant="unstyled"
                    color="white"
                    placeholder="Enter document title..."
                    _placeholder={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    sx={{
                      '&:hover + .edit-icon': {
                        opacity: 0.8,
                      },
                      '&:focus + .edit-icon': {
                        opacity: 0,
                      },
                      '&:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                      }
                    }}
                  />
                  <Box
                    className="edit-icon"
                    ml={2}
                    color="#CDF683"
                    opacity={0}
                    transition="all 0.2s"
                    display="flex"
                    alignItems="center"
                  >
                    <EditIcon boxSize={3} />
                  </Box>
                  <Box
                    position="absolute"
                    bottom="-2px"
                    left={0}
                    right={0}
                    height="1px"
                    bg="rgba(205, 246, 131, 0.2)"
                    transition="all 0.2s"
                    _groupHover={{
                      bg: "rgba(205, 246, 131, 0.3)",
                      height: "1px"
                    }}
                  />
                </Box>
                
                <Menu>
                  <MenuButton
                    as={Button}
                    size="sm"
                    rightIcon={<ChevronDownIcon />}
                    bg="rgba(22, 27, 34, 0.3)"
                    color="#CDF683"
                    borderColor={borderColor}
                    _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                    _active={{ bg: 'rgba(205, 246, 131, 0.15)' }}
                    fontSize="sm"
                    fontWeight="normal"
                    px={4}
                    h="32px"
                    zIndex={1}
                    variant="ghost"
                  >
                    {selectedMode || "General"}
                  </MenuButton>
                  <Portal>
                    <MenuList
                      bg="rgba(34, 39, 29, 0.95)"
                      borderColor="rgba(205, 246, 131, 0.2)"
                      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                      py={2}
                      zIndex={1000}
                      mt={1}
                      css={{
                        '& .chakra-menu__menuitem:focus': {
                          backgroundColor: 'rgba(205, 246, 131, 0.1)',
                          color: '#CDF683',
                        },
                        '& .chakra-menu__menuitem': {
                          backgroundColor: 'transparent',
                        }
                      }}
                    >
                      <MenuItem
                        onClick={() => setSelectedMode("General")}
                        color="#CDF683"
                        _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _focus={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _active={{ bg: 'rgba(205, 246, 131, 0.15)' }}
                        fontSize="sm"
                      >
                        General
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedMode("Academic")}
                        color="#CDF683"
                        _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _focus={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _active={{ bg: 'rgba(205, 246, 131, 0.15)' }}
                        fontSize="sm"
                      >
                        Academic
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedMode("Business")}
                        color="#CDF683"
                        _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _focus={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _active={{ bg: 'rgba(205, 246, 131, 0.15)' }}
                        fontSize="sm"
                      >
                        Business
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedMode("Creative")}
                        color="#CDF683"
                        _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _focus={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _active={{ bg: 'rgba(205, 246, 131, 0.15)' }}
                        fontSize="sm"
                      >
                        Creative
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedMode("Technical")}
                        color="#CDF683"
                        _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _focus={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _active={{ bg: 'rgba(205, 246, 131, 0.15)' }}
                        fontSize="sm"
                      >
                        Technical
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedMode("Scientific")}
                        color="#CDF683"
                        _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _focus={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _active={{ bg: 'rgba(205, 246, 131, 0.15)' }}
                        fontSize="sm"
                      >
                        Scientific
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedMode("Journalism")}
                        color="#CDF683"
                        _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _focus={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _active={{ bg: 'rgba(205, 246, 131, 0.15)' }}
                        fontSize="sm"
                      >
                        Journalism
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedMode("Poetry")}
                        color="#CDF683"
                        _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _focus={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _active={{ bg: 'rgba(205, 246, 131, 0.15)' }}
                        fontSize="sm"
                      >
                        Poetry
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedMode("Screenplay")}
                        color="#CDF683"
                        _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _focus={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _active={{ bg: 'rgba(205, 246, 131, 0.15)' }}
                        fontSize="sm"
                      >
                        Screenplay
                      </MenuItem>
                      <MenuItem
                        onClick={() => setSelectedMode("Blog")}
                        color="#CDF683"
                        _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _focus={{ bg: 'rgba(205, 246, 131, 0.1)' }}
                        _active={{ bg: 'rgba(205, 246, 131, 0.15)' }}
                        fontSize="sm"
                      >
                        Blog
                      </MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              </HStack>

              {/* Format Options */}
              <HStack spacing={2}>
                <FeatureButton
                  icon={<FaBold />}
                  label="Bold"
                  isActive={activeFeatures.bold}
                  onClick={() => setActiveFeatures(prev => ({ ...prev, bold: !prev.bold }))}
                />
                <FeatureButton
                  icon={<FaItalic />}
                  label="Italic"
                  isActive={activeFeatures.italic}
                  onClick={() => setActiveFeatures(prev => ({ ...prev, italic: !prev.italic }))}
                />
                <FeatureButton
                  icon={<FaUnderline />}
                  label="Underline"
                  isActive={activeFeatures.underline}
                  onClick={() => setActiveFeatures(prev => ({ ...prev, underline: !prev.underline }))}
                />
              </HStack>

              <Divider orientation="vertical" h="24px" />

              {/* Text Alignment */}
              <HStack spacing={2}>
                <FeatureButton icon={<FaAlignLeft />} label="Align Left" />
                <FeatureButton icon={<FaAlignCenter />} label="Align Center" />
                <FeatureButton icon={<FaAlignRight />} label="Align Right" />
                <FeatureButton icon={<FaAlignJustify />} label="Justify" />
              </HStack>

              <Divider orientation="vertical" h="24px" />

              {/* Lists and Special Formats */}
              <HStack spacing={2}>
                <FeatureButton icon={<FaListUl />} label="Bullet List" />
                <FeatureButton icon={<FaListOl />} label="Numbered List" />
                <FeatureButton icon={<FaQuoteRight />} label="Quote" />
                <FeatureButton icon={<FaCode />} label="Code Block" />
              </HStack>
            </HStack>

            {/* Right side content */}
            <HStack spacing={4}>
              {/* Save Button */}
              <Button
                leftIcon={isSaved ? <CheckIcon /> : <FaRegSave />}
                onClick={handleSave}
                isLoading={isSaving}
                loadingText="Saving"
                size="sm"
                bg={isSaved ? "rgba(205, 246, 131, 0.2)" : "rgba(205, 246, 131, 0.1)"}
                color="#CDF683"
                _hover={{ bg: 'rgba(205, 246, 131, 0.2)' }}
                _active={{ bg: 'rgba(205, 246, 131, 0.3)' }}
                border="1px solid"
                borderColor={isSaved ? "rgba(205, 246, 131, 0.4)" : "rgba(205, 246, 131, 0.2)"}
              >
                {isSaved ? "Saved" : "Save"}
              </Button>

              {/* Word and Character Count */}
              <HStack spacing={2}>
                <Badge variant="subtle" colorScheme="blue" p={1.5} borderRadius="md" size="sm">
                  <HStack spacing={1}>
                    <Text fontSize="xs">Words:</Text>
                    <Text fontSize="xs" fontWeight="bold">{wordCount}</Text>
                  </HStack>
                </Badge>
                <Badge variant="subtle" colorScheme="green" p={1.5} borderRadius="md" size="sm">
                  <HStack spacing={1}>
                    <Text fontSize="xs">Characters:</Text>
                    <Text fontSize="xs" fontWeight="bold">{charCount}</Text>
                  </HStack>
                </Badge>
              </HStack>

              {/* Check Features */}
              <HStack spacing={2}>
                <FeatureButton
                  icon={<FaSpellCheck />}
                  label="Spell Check"
                  isActive={activeFeatures.spellcheck}
                  onClick={() => setActiveFeatures(prev => ({ ...prev, spellcheck: !prev.spellcheck }))}
                />
                <FeatureButton
                  icon={<FaGlasses />}
                  label="Grammar Check"
                  isActive={activeFeatures.grammarcheck}
                  onClick={() => {
                    setActiveFeatures(prev => ({ ...prev, grammarcheck: !prev.grammarcheck }));
                    handleGrammarCheck();
                  }}
                />
              </HStack>

              <Divider orientation="vertical" h="24px" />

              {/* Document Options */}
              <Menu>
                <MenuButton 
                  as={Button} 
                  size="sm" 
                  rightIcon={<ChevronDownIcon />}
                  colorScheme="green"
                  variant="solid"
                >
                  Options
                </MenuButton>
                <Portal>
                  <MenuList
                    bg="rgba(22, 27, 34, 0.95)"
                    borderColor="rgba(48, 54, 61, 0.8)"
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                    backdropFilter="blur(8px)"
                    border="1px solid"
                    zIndex={2000}
                    p={1}
                  >
                    <MenuItem 
                      icon={<FaFileImport />} 
                      bg="transparent"
                      color={textColor}
                      _hover={{ bg: 'rgba(48, 54, 61, 0.5)' }}
                      borderRadius="md"
                      mb={1}
                    >
                      Import
                    </MenuItem>
                    <MenuItem 
                      icon={<FaFileExport />} 
                      bg="transparent"
                      color={textColor}
                      _hover={{ bg: 'rgba(48, 54, 61, 0.5)' }}
                      borderRadius="md"
                      mb={1}
                    >
                      Export
                    </MenuItem>
                    <MenuItem 
                      icon={<FaPalette />} 
                      bg="transparent"
                      color={textColor}
                      _hover={{ bg: 'rgba(48, 54, 61, 0.5)' }}
                      borderRadius="md"
                      mb={1}
                    >
                      Theme
                    </MenuItem>
                    <MenuItem 
                      icon={<FaCog />} 
                      bg="transparent"
                      color={textColor}
                      _hover={{ bg: 'rgba(48, 54, 61, 0.5)' }}
                      borderRadius="md"
                    >
                      Settings
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </HStack>
          </HStack>
        </Box>

        {/* Editor Area */}
        <Flex flex="1" p={8} position="relative" zIndex="1">
          <Box
            flex="1"
            bg="white"
            borderRadius="xl"
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.08)"
            position="relative"
            border="1px solid"
            borderColor="rgba(0, 0, 0, 0.06)"
            display="flex"
            flexDirection="column"
            overflow="hidden"
          >
            {/* Paper-like texture */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), 
                  repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0, 0, 0, 0.03) 28px, rgba(0, 0, 0, 0.03) 29px)"
              pointerEvents="none"
              opacity={0.4}
            />

            {/* Writing Area */}
            <Box
              flex="1"
              position="relative"
              maxWidth="800px"
              width="100%"
              mx="auto"
              px={12}
              py={8}
            >
              <StyledTitleInput
                placeholder="Title"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                autoFocus
              />
              <StyledTextArea
                value={content}
                onChange={handleContentChange}
                placeholder="Start writing your content..."
                onFocus={(e) => {
                  if (!content) {
                    e.target.placeholder = '';
                  }
                }}
                onBlur={(e) => {
                  if (!content) {
                    e.target.placeholder = 'Start writing your content...';
                  }
                }}
              />
            </Box>
          </Box>
        </Flex>
      </Flex>
      <WriterSidebar 
        isOpen={isRightSidebarOpen}
        onOpen={() => setIsRightSidebarOpen(true)}
        onClose={() => setIsRightSidebarOpen(false)}
        suggestions={suggestions}
        content={content}
        messages={messages}
        chatInput={chatInput}
        onChatInputChange={(value) => setChatInput(value)}
        onSendMessage={handleSendMessage}
      />
    </Flex>
  );
};

export default WriterPage;
