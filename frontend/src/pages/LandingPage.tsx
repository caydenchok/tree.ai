import { 
  Box, 
  Container, 
  Flex, 
  Grid, 
  VStack, 
  HStack, 
  Heading, 
  Text, 
  Button, 
  IconButton, 
  Badge, 
  Image, 
  Icon, 
  SimpleGrid, 
  useBreakpointValue,
  Avatar,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useColorModeValue,
  Divider,
  Link,
  Tooltip,
  Spacer,
  Center
} from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaBook, 
  FaCalculator, 
  FaLightbulb, 
  FaRobot, 
  FaClock, 
  FaAward 
} from 'react-icons/fa';
import { 
  BsBook, 
  BsCalculator, 
  BsLightning, 
  BsDroplet, 
  BsHeart, 
  BsGlobe, 
  BsGlobe2, 
  BsCashCoin, 
  BsGraphUp, 
  BsBriefcase, 
  BsLaptop,
  BsClock,
  BsRobot,
  BsStarFill,
  BsArrowRight,
  BsAward,
  BsSend,
  BsList,
  BsChevronDown,
  BsChevronRight,
  BsChat
} from 'react-icons/bs';
import { MdLocationOn, MdEmail, MdPhone, MdArrowForward } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/common/Navbar/Navbar';
import ParticlesBackground from '../components/common/ParticlesBackground';
import TechTreeBackground from '../components/common/TechTreeBackground/TechTreeBackground';

const MotionBox = motion(Box);

const TestimonialCard = ({ name, role, image, content, rating, subject }: { 
  name: string; 
  role: string; 
  image: string; 
  content: string;
  rating: number;
  subject?: string;
}) => (
  <MotionBox
    bg="rgba(255, 255, 255, 0.03)"
    backdropFilter="blur(20px)"
    border="1px solid"
    borderColor="brand.primary"
    p={0}
    borderRadius="2xl"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    position="relative"
    overflow="hidden"
    role="group"
    _hover={{
      transform: 'translateY(-8px)',
      borderColor: 'brand.hover',
      boxShadow: '0 12px 24px -8px rgba(205, 246, 131, 0.2)',
      '& .hover-content': {
        opacity: 1,
        transform: 'translateY(0)',
      }
    }}
  >
    {/* Top Gradient Line */}
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      height="2px"
      bgGradient="linear(to-r, transparent, brand.primary, transparent)"
    />

    {/* Rating Badge */}
    <Badge
      position="absolute"
      top={4}
      right={4}
      bg="rgba(205, 246, 131, 0.1)"
      color="brand.primary"
      px={3}
      py={1}
      borderRadius="full"
      fontSize="sm"
    >
      {Array(5).fill('★').map((star, i) => (
        <Box
          key={i}
          as="span"
          color={i < rating ? 'brand.primary' : 'whiteAlpha.300'}
          display="inline-block"
        >
          {star}
        </Box>
      ))}
    </Badge>

    {/* Content */}
    <VStack spacing={0}>
      {/* Header with Avatar */}
      <Box 
        w="full" 
        p={8} 
        pb={4}
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
      >
        <HStack spacing={4}>
          <Avatar 
            src={image} 
            name={name}
            size="xl"
            border="2px solid"
            borderColor="brand.primary"
          />
          <VStack align="start" spacing={1}>
            <Text 
              color="brand.white.primary" 
              fontWeight="bold"
              fontSize="xl"
            >
              {name}
            </Text>
            <Text 
              color="brand.primary" 
              fontSize="md"
              fontWeight="medium"
            >
              {role}
            </Text>
            {subject && (
              <Badge
                colorScheme="green"
                bg="rgba(205, 246, 131, 0.1)"
                color="brand.primary"
                mt={1}
              >
                {subject}
              </Badge>
            )}
          </VStack>
        </HStack>
      </Box>

      {/* Testimonial Content */}
      <Box p={8} pt={6} position="relative">
        <Icon 
          as={BsStarFill} 
          color="brand.primary" 
          boxSize={6}
          position="absolute"
          top={-3}
          left={8}
          transform="rotate(-45deg)"
          filter="drop-shadow(0 0 8px rgba(205, 246, 131, 0.5))"
        />
        <Text 
          color="brand.white.primary" 
          fontSize="lg" 
          fontStyle="italic"
          lineHeight="1.8"
        >
          "{content}"
        </Text>
      </Box>
    </VStack>
  </MotionBox>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ahmad bin Ismail",
      role: "SPM Student, SMK Damansara",
      image: "/testimonials/student1.jpg",
      content: "TREE has helped me improve my understanding of complex subjects like Additional Mathematics and Physics. The AI tutor explains concepts in a way that's easy to understand.",
      rating: 5,
      subject: "Additional Mathematics"
    },
    {
      name: "Dr. Sarah Tan",
      role: "Computer Science Lecturer, UTM",
      image: "/testimonials/teacher1.jpg",
      content: "As an educator, I'm impressed by TREE's ability to adapt to each student's learning style. It's revolutionizing how we teach in Malaysian universities.",
      rating: 5,
      subject: "Computer Science"
    },
    {
      name: "Nur Amira",
      role: "STPM Student, Penang",
      image: "/testimonials/student2.jpg",
      content: "The personalized study plans and instant feedback have boosted my confidence in preparing for STPM. It's like having a personal tutor available 24/7!",
      rating: 5,
      subject: "Biology"
    },
    {
      name: "Lee Wei Ming",
      role: "Form 4 Student, Johor",
      image: "/testimonials/student3.jpg",
      content: "I used to struggle with Chemistry, but TREE's interactive lessons and 3D molecular visualizations have made it much easier to grasp difficult concepts.",
      rating: 5,
      subject: "Chemistry"
    },
    {
      name: "Puan Faridah",
      role: "Physics Teacher, MRSM",
      image: "/testimonials/teacher2.jpg",
      content: "TREE complements my teaching perfectly. It helps me track student progress and identify areas where they need additional support.",
      rating: 5,
      subject: "Physics"
    },
    {
      name: "Raj Kumar",
      role: "A-Levels Student, KL",
      image: "/testimonials/student4.jpg",
      content: "The AI tutor's ability to explain mathematical concepts step by step has been invaluable. My confidence in solving complex problems has grown significantly.",
      rating: 5,
      subject: "Mathematics"
    }
  ];

  return (
    <Box id="testimonials" py={20}>
      <Container maxW="container.xl" position="relative">
        <VStack spacing={16}>
          {/* Section Header */}
          <VStack spacing={6} textAlign="center">
            <Badge
              colorScheme="green"
              px={4}
              py={2}
              borderRadius="full"
              bg="rgba(205, 246, 131, 0.1)"
              color="brand.primary"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Success Stories
            </Badge>
            <Heading
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              color="brand.white.primary"
              bgGradient="linear(to-r, #CDF683, #98E5BE)"
              bgClip="text"
              fontWeight="bold"
            >
              Transforming Malaysian Education
            </Heading>
            <Text
              color="whiteAlpha.800"
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="3xl"
              lineHeight="tall"
            >
              Join thousands of Malaysian students and educators who are already experiencing
              the future of personalized learning with TREE.
            </Text>

            {/* Stats */}
            <SimpleGrid
              columns={{ base: 2, md: 4 }}
              gap={{ base: 8, md: 16 }}
              mt={8}
              w="full"
              maxW="4xl"
            >
              {[
                { label: 'Active Students', value: '10,000+' },
                { label: 'Success Rate', value: '95%' },
                { label: 'Subjects Covered', value: '25+' },
                { label: 'Learning Hours', value: '1M+' }
              ].map((stat, idx) => (
                <VStack key={idx} spacing={2}>
                  <Text
                    fontSize={{ base: '2xl', md: '3xl' }}
                    fontWeight="bold"
                    bgGradient="linear(to-r, #CDF683, #4CAF50)"
                    bgClip="text"
                  >
                    {stat.value}
                  </Text>
                  <Text color="whiteAlpha.600" fontSize="sm">
                    {stat.label}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Testimonial Grid */}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={8}
            w="full"
          >
            {testimonials.map((testimonial, idx) => (
              <MotionBox
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

const Footer = () => (
  <Box
    bg="rgba(0, 0, 0, 0.8)"
    backdropFilter="blur(20px)"
    borderTop="1px solid"
    borderColor="whiteAlpha.100"
    position="relative"
    zIndex={1}
  >
    <Container maxW="container.xl" py={16}>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={12}
      >
        {/* Company Info */}
        <VStack align="start" spacing={4}>
          <Image src="/logo.png" alt="Tree8 Global" h="50px" mb={4} />
          <Text color="whiteAlpha.800">
            Pioneering AI education in Malaysia, empowering students with cutting-edge learning technology.
          </Text>
          <HStack spacing={4} pt={4}>
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((SocialIcon, idx) => (
              <IconButton
                key={idx}
                aria-label="social media"
                icon={<Icon as={SocialIcon} />}
                variant="ghost"
                color="brand.primary"
                _hover={{
                  bg: 'whiteAlpha.100',
                  transform: 'translateY(-2px)'
                }}
              />
            ))}
          </HStack>
        </VStack>

        {/* Quick Links */}
        <VStack align="start" spacing={4}>
          <Heading size="md" color="brand.primary" mb={2}>Quick Links</Heading>
          {['About Us', 'Our Services', 'Success Stories', 'Blog', 'Careers'].map((link) => (
            <Button
              key={link}
              variant="link"
              color="whiteAlpha.800"
              _hover={{ color: 'brand.primary' }}
            >
              {link}
            </Button>
          ))}
        </VStack>

        {/* Education Resources */}
        <VStack align="start" spacing={4}>
          <Heading size="md" color="brand.primary" mb={2}>Education Resources</Heading>
          {[
            'SPM Study Materials',
            'STPM Resources',
            'University Prep',
            'Professional Courses',
            'Teacher Training'
          ].map((resource) => (
            <Button
              key={resource}
              variant="link"
              color="whiteAlpha.800"
              _hover={{ color: 'brand.primary' }}
            >
              {resource}
            </Button>
          ))}
        </VStack>

        {/* Contact Info */}
        <VStack align="start" spacing={6}>
          <Heading size="md" color="brand.primary" mb={2}>Contact Us</Heading>
          <VStack align="start" spacing={4}>
            <HStack color="whiteAlpha.800">
              <Icon as={MdLocationOn} color="brand.primary" />
              <Text>Kuala Lumpur, Malaysia</Text>
            </HStack>
            <HStack color="whiteAlpha.800">
              <Icon as={MdEmail} color="brand.primary" />
              <Text>info@tree8global.my</Text>
            </HStack>
            <HStack color="whiteAlpha.800">
              <Icon as={MdPhone} color="brand.primary" />
              <Text>+60 3-XXXX XXXX</Text>
            </HStack>
          </VStack>
          <Badge
            colorScheme="green"
            bg="rgba(205, 246, 131, 0.1)"
            color="brand.primary"
            p={2}
            borderRadius="md"
          >
            Proudly Malaysian
          </Badge>
        </VStack>
      </Grid>

      {/* Bottom Bar */}
      <Box
        borderTop="1px solid"
        borderColor="whiteAlpha.100"
        mt={16}
        pt={8}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text color="whiteAlpha.600" textAlign={{ base: 'center', md: 'left' }}>
            2024 Tree8 Global. All rights reserved.
          </Text>
          <HStack spacing={8} color="whiteAlpha.600">
            <Button variant="link" size="sm" color="whiteAlpha.600" _hover={{ color: 'brand.primary' }}>
              Privacy Policy
            </Button>
            <Button variant="link" size="sm" color="whiteAlpha.600" _hover={{ color: 'brand.primary' }}>
              Terms of Service
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Container>
  </Box>
);

const AIAssistantSection = () => {
  return (
    <Box py={20} bg="rgba(0, 0, 0, 0.6)" position="relative" overflow="hidden">
      <Container maxW="container.xl">
        {/* Hero Section */}
        <VStack spacing={6} textAlign="center" mb={16}>
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, #CDF683, #4CAF50)"
            bgClip="text"
            mb={4}
          >
            Welcome to Your Personal AI Learning Assistant
          </Heading>
          <Text fontSize="xl" color="whiteAlpha.900" maxW="800px">
            Enhance your learning journey with our intelligent AI assistant. Get instant help, practice with interactive exercises, and master your subjects effectively.
          </Text>
        </VStack>

        {/* Stats Section */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} mb={20}>
          {[
            { number: "6+", label: "Subjects" },
            { number: "24/7", label: "Availability" },
            { number: "100%", label: "Personalized" },
            { number: "∞", label: "Practice Questions" }
          ].map((stat, index) => (
            <Box
              key={index}
              p={6}
              textAlign="center"
              bg="rgba(205, 246, 131, 0.05)"
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(205, 246, 131, 0.2)"
              _hover={{
                transform: 'translateY(-4px)',
                bg: 'rgba(205, 246, 131, 0.1)',
              }}
              transition="all 0.3s"
            >
              <Text fontSize="4xl" fontWeight="bold" color="#CDF683" mb={2}>
                {stat.number}
              </Text>
              <Text color="whiteAlpha.900">{stat.label}</Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Features Section */}
        <Box mb={20}>
          <VStack spacing={4} textAlign="center" mb={12}>
            <Text color="#CDF683" fontWeight="bold">FEATURES</Text>
            <Heading color="white" size="xl">Everything You Need to Excel</Heading>
          </VStack>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {[
              {
                title: "Smart Tutoring",
                description: "Get instant help with step-by-step explanations tailored to your learning style.",
                icon: BsRobot
              },
              {
                title: "Progress Tracking",
                description: "Monitor your improvement and identify areas that need more attention.",
                icon: BsGraphUp
              },
              {
                title: "Interactive Learning",
                description: "Practice with dynamic exercises and real-time feedback.",
                icon: BsLaptop
              },
              {
                title: "Save & Review",
                description: "Create your personal study guide by saving important explanations.",
                icon: BsBook
              },
              {
                title: "Self Assessment",
                description: "Test your understanding with practice questions and quizzes.",
                icon: BsAward
              },
              {
                title: "Collaborative Learning",
                description: "Share your learning progress and compete with peers.",
                icon: BsGlobe
              }
            ].map((feature, index) => (
              <Box
                key={index}
                p={8}
                bg="rgba(0, 0, 0, 0.3)"
                borderRadius="xl"
                border="1px solid"
                borderColor="rgba(205, 246, 131, 0.15)"
                _hover={{
                  transform: 'translateY(-4px)',
                  bg: 'rgba(205, 246, 131, 0.05)',
                  borderColor: 'rgba(205, 246, 131, 0.3)',
                }}
                transition="all 0.3s"
              >
                <Icon as={feature.icon} boxSize={10} color="#CDF683" mb={4} />
                <Heading size="md" color="white" mb={4}>
                  {feature.title}
                </Heading>
                <Text color="whiteAlpha.900">
                  {feature.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Tips Section */}
        <Box>
          <VStack spacing={4} textAlign="center" mb={12}>
            <Text color="#CDF683" fontWeight="bold">AI LEARNING ASSISTANT TIPS</Text>
            <Heading color="white" size="xl">Make the most of your AI-powered study companion</Heading>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {[
              {
                title: "Ask Smart Questions",
                description: 'Be specific in your questions and provide context. For example, instead of "explain math", try "explain how to solve quadratic equations step by step".',
                icon: BsLightning
              },
              {
                title: "Interactive Learning",
                description: "Engage in active learning by asking follow-up questions, requesting examples, or challenging the AI to test your understanding with practice problems.",
                icon: BsCalculator
              },
              {
                title: "Save & Review",
                description: "Save important explanations and create a personalized study guide. Review saved messages to reinforce your learning and track your progress.",
                icon: BsBook
              },
              {
                title: "Track Progress",
                description: "Use the chat history to review your learning journey. Identify areas where you've improved and topics that need more attention.",
                icon: BsGraphUp
              },
              {
                title: "Multiple Approaches",
                description: "If you don't understand something, ask for alternative explanations or request the concept to be broken down into simpler terms.",
                icon: BsDroplet
              },
              {
                title: "Practice & Verify",
                description: "After learning a concept, ask for practice questions and verify your understanding by explaining it back to the AI assistant.",
                icon: BsAward
              }
            ].map((tip, index) => (
              <Box
                key={index}
                p={8}
                bg="rgba(0, 0, 0, 0.3)"
                borderRadius="xl"
                border="1px solid"
                borderColor="rgba(205, 246, 131, 0.15)"
                _hover={{
                  transform: 'translateY(-4px)',
                  bg: 'rgba(205, 246, 131, 0.05)',
                  borderColor: 'rgba(205, 246, 131, 0.3)',
                }}
                transition="all 0.3s"
              >
                <Icon as={tip.icon} boxSize={10} color="#CDF683" mb={4} />
                <Heading size="md" color="white" mb={4}>
                  {tip.title}
                </Heading>
                <Text color="whiteAlpha.900">
                  {tip.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [demoMessage, setDemoMessage] = useState('');

  const textColor = "brand.white.primary";
  const mutedColor = "whiteAlpha.700";
  const accentColor = "brand.primary";

  const chatMessages = [
    { 
      role: 'assistant', 
      content: "Hi! I'm TREE, your AI tutor. I can help you with all Malaysian education subjects. What would you like to learn today?",
      subject: null
    },
    { 
      role: 'user', 
      content: 'I need help with SPM Add Maths, specifically about Integration.',
      subject: 'Additional Mathematics'
    },
    { 
      role: 'assistant', 
      content: "Here's a simple way to remember integration by parts: u·dv = uv - ∫v·du. Let's practice with an example: ∫x·ln(x)dx",
      subject: 'Additional Mathematics'
    },
    { 
      role: 'user', 
      content: 'Can you show me how to solve integration by parts?',
      subject: 'Additional Mathematics'
    },
    { 
      role: 'assistant', 
      content: 'Here is a simple way to remember integration by parts: u·dv = uv - ∫v·du. Let us practice with an example: ∫x·ln(x)dx',
      subject: 'Additional Mathematics'
    }
  ];

  const subjects = [
    { name: 'Bahasa Melayu', icon: BsBook },
    { name: 'English', icon: BsBook },
    { name: 'Mathematics', icon: BsCalculator },
    { name: 'Additional Mathematics', icon: BsCalculator },
    { name: 'Physics', icon: BsLightning },
    { name: 'Chemistry', icon: BsDroplet },
    { name: 'Biology', icon: BsHeart },
    { name: 'Sejarah', icon: BsGlobe },
    { name: 'Geography', icon: BsGlobe2 },
    { name: 'Pendidikan Islam', icon: BsBook },
    { name: 'Moral Education', icon: BsBook },
    { name: 'Accounting', icon: BsCashCoin },
    { name: 'Economics', icon: BsGraphUp },
    { name: 'Business Studies', icon: BsBriefcase },
    { name: 'ICT', icon: BsLaptop }
  ];

  const features = [
    { icon: BsBook, text: '24/7 Learning Support', description: 'Get help anytime, anywhere' },
    { icon: BsRobot, text: 'Smart AI Tutor', description: 'Personalized learning experience' },
    { icon: BsClock, text: 'Real-time Feedback', description: 'Instant answers to your questions' },
    { icon: BsAward, text: 'Progress Tracking', description: 'Monitor your improvement' }
  ];

  return (
    <MotionBox
      w="full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      position="relative"
    >
      <ParticlesBackground />
      <Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <TechTreeBackground />
      </Box>

      {/* Background overlay */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-b, rgba(0,0,0,0.7) 0%, rgba(24,26,15,0.8) 100%)"
        backdropFilter="blur(5px)"
        zIndex={1}
        pointerEvents="none"
      />

      {/* Content wrapper */}
      <Box position="relative" zIndex={2}>
        <Navbar />
        
        {/* Hero Section */}
        <Box minH="100vh">
          <Container maxW="container.xl" position="relative" pt={{ base: 24, md: 32 }} pb={20}>
            {/* Main Content */}
            <Flex 
              direction={{ base: 'column', lg: 'row' }} 
              align="center" 
              justify="space-between"
              gap={10}
              mb={16}
            >
              {/* Left side - Text content */}
              <MotionBox
                flex={1}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <VStack align={{ base: 'center', lg: 'flex-start' }} spacing={6}>
                  <Badge 
                    colorScheme="green" 
                    fontSize="md" 
                    px={3} 
                    py={1} 
                    borderRadius="full"
                    bg="rgba(205, 246, 131, 0.1)"
                    color={accentColor}
                  >
                    AI-Powered Education
                  </Badge>
                  <Heading
                    fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                    bgGradient="linear(to-r, #CDF683, #98E5BE)"
                    bgClip="text"
                    fontWeight="extrabold"
                    letterSpacing="tight"
                    filter="drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))"
                  >
                    Learn Smarter with TREE
                  </Heading>
                  <Text 
                    fontSize={{ base: 'lg', md: 'xl' }} 
                    color={textColor}
                    maxW="600px"
                  >
                    Your personal AI tutor that adapts to your learning style. Get instant help, 
                    track your progress, and master any subject with confidence.
                  </Text>
                  
                  <HStack spacing={4} pt={6}>
                    <Button
                      size="lg"
                      bg={accentColor}
                      color="brand.dark.primary"
                      px={8}
                      _hover={{ 
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                        bg: 'brand.hover'
                      }}
                      onClick={() => navigate('/register')}
                    >
                      Get Started Free
                    </Button>
                    <Button
                      size="lg"
                      variant="ghost"
                      color={accentColor}
                      borderColor={accentColor}
                      borderWidth={1}
                      _hover={{ 
                        bg: 'whiteAlpha.100',
                        transform: 'translateY(-2px)'
                      }}
                      onClick={() => navigate('/login')}
                    >
                      Login →
                    </Button>
                  </HStack>
                </VStack>
              </MotionBox>

              {/* Right side - Chat Preview */}
              <MotionBox
                flex="1"
                maxW={{ base: "100%", lg: "600px" }}
                w="100%"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  bg="rgba(0, 0, 0, 0.3)"
                  borderRadius="xl"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  backdropFilter="blur(10px)"
                  boxShadow="xl"
                  position="relative"
                  w="100%"
                >
                  <VStack spacing={4} align="stretch" h="full">
                    {/* Header */}
                    <Box p={6} pb={3}>
                      <HStack justify="space-between" mb={2}>
                        <Heading size="md" color={textColor}>TREE Chat</Heading>
                        <Badge 
                          colorScheme="green" 
                          bg="rgba(205, 246, 131, 0.1)"
                          color={accentColor}
                        >
                          Live Demo
                        </Badge>
                      </HStack>

                      {/* Subject Pills */}
                      <Box 
                        overflowX="auto" 
                        pb={2}
                        sx={{
                          '&::-webkit-scrollbar': {
                            height: '4px',
                          },
                          '&::-webkit-scrollbar-track': {
                            background: 'rgba(0, 0, 0, 0.1)',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: accentColor,
                            borderRadius: '24px',
                          },
                        }}
                      >
                        <HStack spacing={2} py={2}>
                          {subjects.map((subject, idx) => (
                            <Badge
                              key={idx}
                              px={3}
                              py={1}
                              borderRadius="full"
                              bg={subject.name === 'Additional Mathematics' ? 'rgba(205, 246, 131, 0.2)' : 'rgba(255, 255, 255, 0.05)'}
                              color={subject.name === 'Additional Mathematics' ? 'brand.primary' : 'whiteAlpha.800'}
                              cursor="pointer"
                              whiteSpace="nowrap"
                              _hover={{
                                bg: 'rgba(205, 246, 131, 0.1)',
                                color: 'brand.primary'
                              }}
                            >
                              <HStack spacing={1}>
                                <Icon as={subject.icon} />
                                <Text>{subject.name}</Text>
                              </HStack>
                            </Badge>
                          ))}
                        </HStack>
                      </Box>
                    </Box>

                    {/* Chat Messages */}
                    <Box 
                      bg="rgba(0, 0, 0, 0.2)"
                      p={6}
                      minH="400px"
                      maxH="400px"
                      overflowY="auto"
                      sx={{
                        '&::-webkit-scrollbar': {
                          width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                          background: 'rgba(0, 0, 0, 0.1)',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: accentColor,
                          borderRadius: '24px',
                        },
                      }}
                    >
                      {chatMessages.map((msg, idx) => (
                        <MotionBox
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          mb={4}
                        >
                          <Flex
                            justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                          >
                            {msg.role === 'assistant' && (
                              <Avatar 
                                size="sm" 
                                bg={accentColor}
                                icon={<Icon as={BsRobot} color="brand.dark.primary" />} 
                                mr={2}
                              />
                            )}
                            <VStack align={msg.role === 'user' ? 'flex-end' : 'flex-start'} spacing={1}>
                              {msg.subject && (
                                <Badge
                                  size="sm"
                                  colorScheme="green"
                                  bg="rgba(205, 246, 131, 0.1)"
                                  color={accentColor}
                                  fontSize="xs"
                                  mb={1}
                                >
                                  {msg.subject}
                                </Badge>
                              )}
                              <Box
                                bg={msg.role === 'user' ? accentColor : 'rgba(255, 255, 255, 0.08)'}
                                color={msg.role === 'user' ? 'brand.dark.primary' : textColor}
                                py={3}
                                px={5}
                                borderRadius="2xl"
                                maxW="400px"
                                boxShadow="sm"
                              >
                                <Text fontSize="md">{msg.content}</Text>
                              </Box>
                            </VStack>
                          </Flex>
                        </MotionBox>
                      ))}
                    </Box>

                    {/* Input Area */}
                    <Box p={6} pt={3}>
                      <InputGroup size="lg">
                        <Input
                          placeholder="Ask about any subject..."
                          bg="rgba(0, 0, 0, 0.2)"
                          border="1px solid"
                          borderColor="rgba(255, 255, 255, 0.1)"
                          color={textColor}
                          value={demoMessage}
                          onChange={(e) => setDemoMessage(e.target.value)}
                          _focus={{
                            boxShadow: `0 0 0 1px ${accentColor}`,
                            borderColor: accentColor
                          }}
                          _hover={{
                            borderColor: "rgba(255, 255, 255, 0.2)"
                          }}
                        />
                        <InputRightElement>
                          <Icon 
                            as={BsSend} 
                            color={accentColor}
                            cursor="pointer"
                            onClick={() => setDemoMessage('')}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </Box>
                  </VStack>
                </Box>
              </MotionBox>
            </Flex>

            {/* Features Grid */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Box
                bg="rgba(255, 255, 255, 0.08)"
                backdropFilter="blur(20px) saturate(180%)"
                border="1px solid rgba(255, 255, 255, 0.12)"
                boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
                borderRadius="2xl"
                p={8}
              >
                <Heading
                  size="lg"
                  color={textColor}
                  bgGradient="linear(to-r, #CDF683, #98E5BE)"
                  bgClip="text"
                  textAlign="center"
                  mb={8}
                >
                  Why Choose TREE?
                </Heading>
                
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                  {features.map((feature, idx) => (
                    <MotionBox
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      bg="rgba(255, 255, 255, 0.03)"
                      p={4}
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      _hover={{ 
                        transform: 'translateY(-2px)',
                        borderColor: 'brand.primary',
                        boxShadow: '0 4px 12px rgba(205, 246, 131, 0.1)'
                      }}
                    >
                      <VStack align="start" spacing={3}>
                        <Icon 
                          as={feature.icon} 
                          boxSize={6} 
                          color={accentColor}
                        />
                        <Text color={textColor} fontWeight="bold">{feature.text}</Text>
                        <Text color={mutedColor} fontSize="sm">{feature.description}</Text>
                      </VStack>
                    </MotionBox>
                  ))}
                </SimpleGrid>
              </Box>
            </MotionBox>
          </Container>
        </Box>

        {/* AI Assistant Section */}
        <Box py={20}>
          <AIAssistantSection />
        </Box>

        {/* Testimonials Section */}
        <Box py={20}>
          <TestimonialsSection />
        </Box>

        {/* Contact Section */}
        <Box py={20}>
          <Container maxW="container.xl">
            <VStack
              spacing={8}
              bg="rgba(255, 255, 255, 0.08)"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255, 255, 255, 0.12)"
              p={8}
              borderRadius="2xl"
            >
              <Heading
                textAlign="center"
                color={textColor}
                bgGradient="linear(to-r, #CDF683, #98E5BE)"
                bgClip="text"
              >
                Ready to Transform Your Learning?
              </Heading>
              <Text color={textColor} textAlign="center" fontSize="lg">
                Join thousands of students who are already experiencing the future of education.
              </Text>
              <Button
                size="lg"
                bg={accentColor}
                color="brand.dark.primary"
                px={8}
                _hover={{ 
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                  bg: 'brand.hover'
                }}
                onClick={() => navigate('/register')}
              >
                Get Started Free
              </Button>
            </VStack>
          </Container>
        </Box>

        <Footer />
      </Box>
    </MotionBox>
  );
};

export default LandingPage;
