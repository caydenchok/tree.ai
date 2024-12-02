import React, { useState, memo, useMemo, useCallback } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Image,
  Center,
  HStack,
  Link,
  Heading,
  Container
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/actions/authActions';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { LanguageSelector } from '../components/common';
import TechTreeBackground from '../components/common/TechTreeBackground/TechTreeBackground';

const MotionBox = motion(Box);

const RegisterForm = memo(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const cardBg = useMemo(() => "rgba(17, 21, 14, 0.7)", []);
  const borderColor = useMemo(() => "rgba(205, 246, 131, 0.2)", []);
  const hoverBg = useMemo(() => "rgba(205, 246, 131, 0.1)", []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: t('Error'),
        description: t('Passwords do not match'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    if (!email || !password || !name) {
      toast({
        title: t('Error'),
        description: t('Please fill in all required fields'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(registerUser({ email, password, name, role: 'student' }));
      toast({
        title: t('Registration Successful'),
        description: t('Welcome to Tree8 Global!'),
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      navigate('/dashboard/student');
    } catch (error) {
      toast({
        title: t('Registration Failed'),
        description: error instanceof Error ? error.message : t('An error occurred'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setIsLoading(false);
    }
  }, [email, password, confirmPassword, name, dispatch, toast, t, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>{t('Name')}</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('Name')}
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            _hover={{ borderColor: hoverBg }}
            _focus={{ borderColor: "green.200", boxShadow: "0 0 0 1px var(--chakra-colors-green-200)" }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('Email')}</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('Email')}
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            _hover={{ borderColor: hoverBg }}
            _focus={{ borderColor: "green.200", boxShadow: "0 0 0 1px var(--chakra-colors-green-200)" }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('Password')}</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('Password')}
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            _hover={{ borderColor: hoverBg }}
            _focus={{ borderColor: "green.200", boxShadow: "0 0 0 1px var(--chakra-colors-green-200)" }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('Confirm Password')}</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t('Confirm Password')}
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            _hover={{ borderColor: hoverBg }}
            _focus={{ borderColor: "green.200", boxShadow: "0 0 0 1px var(--chakra-colors-green-200)" }}
          />
        </FormControl>

        <Button
          type="submit"
          w="full"
          isLoading={isLoading}
          bgGradient="linear(to-r, #CDF683, #98E5BE)"
          color="gray.800"
          fontWeight="600"
          fontSize="md"
          h="48px"
          _hover={{
            bgGradient: "linear(to-r, #bde772, #89d4ad)",
            transform: "translateY(-1px)",
            boxShadow: "lg"
          }}
          _active={{
            transform: "translateY(0)",
            bgGradient: "linear(to-r, #aed35f, #7ac39c)"
          }}
          transition="all 0.2s"
          boxShadow="md"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)",
            transform: "rotate(45deg)",
            zIndex: 1,
            transition: "0.5s",
            animation: "buttonSweep 3s linear infinite"
          }}
        >
          <Text position="relative" zIndex={2}>
            {t('Register')}
          </Text>
        </Button>
      </VStack>
    </form>
  );
});

RegisterForm.displayName = 'RegisterForm';

const Register = () => {
  const { t } = useTranslation();

  const motionVariants = useMemo(() => ({
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 }
    },
    box: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { delay: 0.2, duration: 0.5 }
    }
  }), []);

  return (
    <MotionBox
      minH="100vh"
      position="relative"
      w="full"
      bg="rgba(13, 17, 14, 0.97)"
      color="white"
      overflow="hidden"
      {...motionVariants.container}
    >
      {/* Tech Tree Background */}
      <Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <TechTreeBackground />
      </Box>

      {/* Language Selector */}
      <Box
        position="absolute"
        top={4}
        right={4}
        zIndex={10}
      >
        <LanguageSelector />
      </Box>

      <Center
        position="relative"
        minH="100vh"
        px={4}
      >
        <MotionBox
          w={{ base: "full", sm: "400px" }}
          p={8}
          borderRadius="lg"
          bg="rgba(17, 21, 14, 0.7)"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          backdropFilter="blur(10px)"
          boxShadow="dark-lg"
          position="relative"
          overflow="hidden"
          {...motionVariants.box}
        >
          <Image src="/logo.png" alt="Tree8 Global" h="70px" mb={6} />
            
          <VStack spacing={4}>
            <Heading
              as="h1"
              size="xl"
              textAlign="center"
              fontFamily="'Poppins', sans-serif"
              fontWeight="700"
              letterSpacing="-0.02em"
              bgGradient="linear(to-r, #CDF683, #98E5BE)"
              bgClip="text"
              filter="drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))"
              mb={1}
            >
              {t('Create Account')}
            </Heading>

            <Text
              color="whiteAlpha.900"
              textAlign="center"
              fontSize="md"
              fontFamily="'Inter', sans-serif"
              fontWeight="500"
              letterSpacing="-0.01em"
              maxW="sm"
              textShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
              mb={2}
            >
              {t('Join Tree8 Global and start your learning journey')}
            </Text>
          </VStack>

          <RegisterForm />

          <HStack spacing={2} justify="center" pt={3} position="relative" zIndex={2}>
            <Text 
              color="whiteAlpha.900" 
              fontSize="sm"
              fontWeight="500"
              letterSpacing="0.01em"
              textShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
            >
              {t('Already have an account?')}
            </Text>
            <Link
              as={RouterLink}
              to="/login"
              color="brand.primary"
              fontWeight="700"
              fontSize="sm"
              letterSpacing="0.01em"
              textShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
              _hover={{
                textDecoration: 'none',
                color: '#CDF683',
                transform: 'translateX(2px)'
              }}
              transition="all 0.2s"
              position="relative"
              zIndex={2}
              cursor="pointer"
            >
              {t('Login here')}
            </Link>
          </HStack>
        </MotionBox>
      </Center>
    </MotionBox>
  );
};

export default Register;
