import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { registerUser } from '../../redux/actions/authActions';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

  const inputStyle = {
    bg: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    _hover: {
      borderColor: 'rgba(205, 246, 131, 0.4)',
    },
    _focus: {
      borderColor: '#CDF683',
      boxShadow: '0 0 0 1px rgba(205, 246, 131, 0.4)',
    },
    _placeholder: {
      color: 'whiteAlpha.400',
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel color="whiteAlpha.900">Full Name</FormLabel>
          <Input
            placeholder={t('Enter your full name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            {...inputStyle}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="whiteAlpha.900">Email</FormLabel>
          <Input
            type="email"
            placeholder={t('Enter your email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            {...inputStyle}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="whiteAlpha.900">Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('Enter your password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              {...inputStyle}
            />
            <InputRightElement>
              <Icon
                as={showPassword ? FaEyeSlash : FaEye}
                color="whiteAlpha.400"
                cursor="pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="whiteAlpha.900">Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t('Confirm your password')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              {...inputStyle}
            />
            <InputRightElement>
              <Icon
                as={showConfirmPassword ? FaEyeSlash : FaEye}
                color="whiteAlpha.400"
                cursor="pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          type="submit"
          w="full"
          bg="#CDF683"
          color="black"
          _hover={{
            bg: '#B5E853',
            transform: 'translateY(-2px)',
          }}
          _active={{
            bg: '#98D626',
          }}
          isLoading={isLoading}
          loadingText={t('Creating Account...')}
          transition="all 0.2s"
          mt={2}
        >
          {t('Create Account')}
        </Button>
      </VStack>
    </form>
  );
};

export default RegisterForm;
