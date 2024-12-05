import { useState, type FC } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Button,
  Avatar,
  Input,
  FormControl,
  FormLabel,
  Switch,
  Divider,
  useToast,
  Icon as ChakraIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
} from '@chakra-ui/react';
import {
  FaUser,
  FaBell,
  FaLock,
  FaPalette,
  FaLanguage,
  FaUpload,
  FaCheck,
} from 'react-icons/fa';
import TeacherSidebar from '../components/layout/TeacherSidebar';

interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    messages: boolean;
    updates: boolean;
  };
  appearance: {
    theme: string;
    fontSize: string;
    language: string;
  };
  privacy: {
    profileVisibility: string;
    onlineStatus: boolean;
    activityStatus: boolean;
  };
}

const TeacherSettings: FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      push: true,
      messages: true,
      updates: false,
    },
    appearance: {
      theme: 'dark',
      fontSize: 'medium',
      language: 'en',
    },
    privacy: {
      profileVisibility: 'public',
      onlineStatus: true,
      activityStatus: true,
    },
  });

  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  // Theme colors (matching other pages)
  const bgColor = "#22271d";
  const cardBg = "#2a2f25";
  const textColor = "white";
  const mutedColor = "whiteAlpha.700";
  const accentColor = "#CDF683";
  const hoverBg = "#32392c";

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleSettingChange = (category: keyof Settings, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, you would save to backend here
    toast({
      title: 'Settings saved',
      status: 'success',
      duration: 2000,
      position: 'top',
    });
  };

  const handleAvatarUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: 'Profile photo updated',
        status: 'success',
        duration: 2000,
        position: 'top',
      });
    }, 1500);
  };

  return (
    <Flex h="100vh" bg={bgColor} color={textColor}>
      <TeacherSidebar onCollapse={handleSidebarCollapse} />

      <Box
        flex="1"
        ml={isSidebarCollapsed ? '80px' : '240px'}
        transition="margin-left 0.3s"
        p={8}
      >
        <Text fontSize="2xl" fontWeight="bold" mb={8}>Settings</Text>

        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb={6}>
            <Tab _selected={{ bg: '#cdf683', color: 'black' }} mr={4}>
              <ChakraIcon as={FaUser} mr={2} />
              Profile
            </Tab>
            <Tab _selected={{ bg: '#cdf683', color: 'black' }} mr={4}>
              <ChakraIcon as={FaBell} mr={2} />
              Notifications
            </Tab>
            <Tab _selected={{ bg: '#cdf683', color: 'black' }} mr={4}>
              <ChakraIcon as={FaPalette} mr={2} />
              Appearance
            </Tab>
            <Tab _selected={{ bg: '#cdf683', color: 'black' }}>
              <ChakraIcon as={FaLock} mr={2} />
              Privacy
            </Tab>
          </TabList>

          <TabPanels>
            {/* Profile Settings */}
            <TabPanel>
              <Box bg={cardBg} p={6} borderRadius="lg">
                <VStack spacing={6} align="stretch">
                  <HStack spacing={8}>
                    <VStack>
                      <Avatar size="2xl" name="Teacher Name" src="https://bit.ly/dan-abramov" />
                      <Button
                        leftIcon={<ChakraIcon as={FaUpload} />}
                        size="sm"
                        onClick={handleAvatarUpload}
                        isLoading={isUploading}
                        bg={accentColor}
                        color="black"
                        _hover={{ bg: accentColor, opacity: 0.8 }}
                      >
                        Upload Photo
                      </Button>
                    </VStack>
                    <VStack flex={1} align="stretch" spacing={4}>
                      <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Input defaultValue="John Doe" bg={bgColor} border="none" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input defaultValue="john.doe@school.edu" bg={bgColor} border="none" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Input defaultValue="Mathematics Teacher" bg={bgColor} border="none" />
                      </FormControl>
                    </VStack>
                  </HStack>
                </VStack>
              </Box>
            </TabPanel>

            {/* Notification Settings */}
            <TabPanel>
              <Box bg={cardBg} p={6} borderRadius="lg">
                <VStack spacing={6} align="stretch">
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb={0}>Email Notifications</FormLabel>
                    <Switch
                      isChecked={settings.notifications.email}
                      onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                      colorScheme="green"
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb={0}>Push Notifications</FormLabel>
                    <Switch
                      isChecked={settings.notifications.push}
                      onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                      colorScheme="green"
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb={0}>Message Notifications</FormLabel>
                    <Switch
                      isChecked={settings.notifications.messages}
                      onChange={(e) => handleSettingChange('notifications', 'messages', e.target.checked)}
                      colorScheme="green"
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb={0}>Update Notifications</FormLabel>
                    <Switch
                      isChecked={settings.notifications.updates}
                      onChange={(e) => handleSettingChange('notifications', 'updates', e.target.checked)}
                      colorScheme="green"
                    />
                  </FormControl>
                </VStack>
              </Box>
            </TabPanel>

            {/* Appearance Settings */}
            <TabPanel>
              <Box bg={cardBg} p={6} borderRadius="lg">
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel>Theme</FormLabel>
                    <Select
                      value={settings.appearance.theme}
                      onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                      bg={bgColor}
                      border="none"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Font Size</FormLabel>
                    <Select
                      value={settings.appearance.fontSize}
                      onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                      bg={bgColor}
                      border="none"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Language</FormLabel>
                    <Select
                      value={settings.appearance.language}
                      onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                      bg={bgColor}
                      border="none"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </Select>
                  </FormControl>
                </VStack>
              </Box>
            </TabPanel>

            {/* Privacy Settings */}
            <TabPanel>
              <Box bg={cardBg} p={6} borderRadius="lg">
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel>Profile Visibility</FormLabel>
                    <Select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                      bg={bgColor}
                      border="none"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="school">School Only</option>
                    </Select>
                  </FormControl>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb={0}>Show Online Status</FormLabel>
                    <Switch
                      isChecked={settings.privacy.onlineStatus}
                      onChange={(e) => handleSettingChange('privacy', 'onlineStatus', e.target.checked)}
                      colorScheme="green"
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb={0}>Show Activity Status</FormLabel>
                    <Switch
                      isChecked={settings.privacy.activityStatus}
                      onChange={(e) => handleSettingChange('privacy', 'activityStatus', e.target.checked)}
                      colorScheme="green"
                    />
                  </FormControl>
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Flex justify="flex-end" mt={8}>
          <Button
            leftIcon={<ChakraIcon as={FaCheck} />}
            onClick={handleSaveSettings}
            bg={accentColor}
            color="black"
            _hover={{ bg: accentColor, opacity: 0.8 }}
            size="lg"
          >
            Save Changes
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default TeacherSettings;
