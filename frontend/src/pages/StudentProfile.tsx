import * as React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Container,
  Card,
  CardBody,
  SimpleGrid,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSidebar } from '../contexts/SidebarContext';
import { useState } from 'react';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const StudentProfile: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex h="100vh" bg="brand.dark.primary" overflow="hidden">
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
              <Heading mb={2} color="brand.primary">My Profile</Heading>
              <Text color="brand.text">Manage your personal information and preferences</Text>
            </MotionBox>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {/* Profile Information */}
              <MotionCard
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                bg="brand.dark.primary"
                borderColor="whiteAlpha.200"
              >
                <CardBody>
                  <VStack spacing={6} align="center">
                    <Avatar size="2xl" name="Student Name" src="" bg="brand.primary" color="brand.dark.primary" />
                    <Button variant="outline">Change Photo</Button>
                    
                    <FormControl>
                      <FormLabel color="brand.text">Full Name</FormLabel>
                      <Input 
                        placeholder="Your full name" 
                        defaultValue="John Doe" 
                        bg="brand.dark.secondary"
                        borderColor="whiteAlpha.200"
                        _hover={{ borderColor: "brand.primary" }}
                        _focus={{ borderColor: "brand.primary", boxShadow: "0 0 0 1px var(--chakra-colors-brand-primary)" }}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel color="brand.text">Email</FormLabel>
                      <Input 
                        type="email" 
                        placeholder="Your email" 
                        defaultValue="john.doe@example.com"
                        bg="brand.dark.secondary"
                        borderColor="whiteAlpha.200"
                        _hover={{ borderColor: "brand.primary" }}
                        _focus={{ borderColor: "brand.primary", boxShadow: "0 0 0 1px var(--chakra-colors-brand-primary)" }}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel color="brand.text">Phone Number</FormLabel>
                      <Input 
                        placeholder="Your phone number" 
                        defaultValue="+1 234 567 8900"
                        bg="brand.dark.secondary"
                        borderColor="whiteAlpha.200"
                        _hover={{ borderColor: "brand.primary" }}
                        _focus={{ borderColor: "brand.primary", boxShadow: "0 0 0 1px var(--chakra-colors-brand-primary)" }}
                      />
                    </FormControl>
                  </VStack>
                </CardBody>
              </MotionCard>

              {/* Academic Information */}
              <MotionCard
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                bg="brand.dark.primary"
                borderColor="whiteAlpha.200"
              >
                <CardBody>
                  <VStack spacing={6}>
                    <Heading size="md" w="full" color="brand.primary">Academic Information</Heading>
                    
                    <Flex w="full" align="center">
                      <Icon as={FaGraduationCap} mr={3} color="brand.primary" />
                      <FormControl>
                        <FormLabel color="brand.text">Grade Level</FormLabel>
                        <Input 
                          placeholder="Current grade" 
                          defaultValue="12th Grade"
                          bg="brand.dark.secondary"
                          borderColor="whiteAlpha.200"
                          _hover={{ borderColor: "brand.primary" }}
                          _focus={{ borderColor: "brand.primary", boxShadow: "0 0 0 1px var(--chakra-colors-brand-primary)" }}
                        />
                      </FormControl>
                    </Flex>

                    <Flex w="full" align="center">
                      <Icon as={FaCalendarAlt} mr={3} color="brand.primary" />
                      <FormControl>
                        <FormLabel color="brand.text">Academic Year</FormLabel>
                        <Input 
                          placeholder="Academic year" 
                          defaultValue="2023-2024"
                          bg="brand.dark.secondary"
                          borderColor="whiteAlpha.200"
                          _hover={{ borderColor: "brand.primary" }}
                          _focus={{ borderColor: "brand.primary", boxShadow: "0 0 0 1px var(--chakra-colors-brand-primary)" }}
                        />
                      </FormControl>
                    </Flex>

                    <Flex w="full" align="center">
                      <Icon as={FaUser} mr={3} color="brand.primary" />
                      <FormControl>
                        <FormLabel color="brand.text">Student ID</FormLabel>
                        <Input 
                          placeholder="Student ID" 
                          defaultValue="STU123456" 
                          isReadOnly
                          bg="brand.dark.secondary"
                          borderColor="whiteAlpha.200"
                          _hover={{ borderColor: "brand.primary" }}
                          _focus={{ borderColor: "brand.primary", boxShadow: "0 0 0 1px var(--chakra-colors-brand-primary)" }}
                        />
                      </FormControl>
                    </Flex>
                  </VStack>
                </CardBody>
              </MotionCard>
            </SimpleGrid>

            <Flex justify="flex-end" mt={4}>
              <Button variant="solid" size="lg" onClick={handleSave}>
                Save Changes
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
};

export default StudentProfile;
