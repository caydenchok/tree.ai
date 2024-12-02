import * as React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Container,
  Card,
  CardBody,
  Switch,
  FormControl,
  FormLabel,
  Select,
  Button,
  useToast,
  SimpleGrid,
  Icon,
  Flex,
  Divider,
} from '@chakra-ui/react';
import {
  FaBell,
  FaGlobe,
  FaMoon,
  FaLock,
  FaEnvelope,
  FaDesktop,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSidebar } from '../contexts/SidebarContext';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const StudentSettings: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: 'Settings Updated',
      description: 'Your settings have been successfully saved.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex h="100vh" bg="gray.100" overflow="hidden">
      <StudentSidebar />
      <Box
        flex="1"
        ml={isCollapsed ? "60px" : "240px"}
        transition="all 0.3s"
        w={`calc(100% - ${isCollapsed ? "60px" : "240px"})`}
        position="relative"
        p={8}
      >
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heading mb={2}>Settings</Heading>
              <Text color="gray.600">Customize your learning experience</Text>
            </MotionBox>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {/* Notifications */}
              <MotionCard
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <Flex align="center" mb={4}>
                      <Icon as={FaBell} mr={2} />
                      <Heading size="md">Notifications</Heading>
                    </Flex>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Email Notifications</FormLabel>
                      <Switch defaultChecked />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Assignment Reminders</FormLabel>
                      <Switch defaultChecked />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Course Updates</FormLabel>
                      <Switch defaultChecked />
                    </FormControl>
                  </VStack>
                </CardBody>
              </MotionCard>

              {/* Appearance */}
              <MotionCard
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <Flex align="center" mb={4}>
                      <Icon as={FaDesktop} mr={2} />
                      <Heading size="md">Appearance</Heading>
                    </Flex>

                    <FormControl>
                      <FormLabel>Theme</FormLabel>
                      <Select defaultValue="light">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Font Size</FormLabel>
                      <Select defaultValue="medium">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </Select>
                    </FormControl>
                  </VStack>
                </CardBody>
              </MotionCard>

              {/* Language & Region */}
              <MotionCard
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <Flex align="center" mb={4}>
                      <Icon as={FaGlobe} mr={2} />
                      <Heading size="md">Language & Region</Heading>
                    </Flex>

                    <FormControl>
                      <FormLabel>Language</FormLabel>
                      <Select defaultValue="en">
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Time Zone</FormLabel>
                      <Select defaultValue="utc">
                        <option value="utc">UTC</option>
                        <option value="est">Eastern Time</option>
                        <option value="pst">Pacific Time</option>
                        <option value="gmt">GMT</option>
                      </Select>
                    </FormControl>
                  </VStack>
                </CardBody>
              </MotionCard>

              {/* Privacy & Security */}
              <MotionCard
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <Flex align="center" mb={4}>
                      <Icon as={FaLock} mr={2} />
                      <Heading size="md">Privacy & Security</Heading>
                    </Flex>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Two-Factor Authentication</FormLabel>
                      <Switch />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Show Profile to Other Students</FormLabel>
                      <Switch defaultChecked />
                    </FormControl>

                    <Button colorScheme="blue" variant="outline">
                      Change Password
                    </Button>
                  </VStack>
                </CardBody>
              </MotionCard>
            </SimpleGrid>

            <Flex justify="flex-end" mt={4}>
              <Button colorScheme="blue" size="lg" onClick={handleSave}>
                Save Changes
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
};

export default StudentSettings;
