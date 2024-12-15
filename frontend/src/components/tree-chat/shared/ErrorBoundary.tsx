import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  return (
    <Box
      p={8}
      bg="gray.900"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="red.500"
    >
      <VStack spacing={4} align="center">
        <Icon as={FaExclamationTriangle} color="red.500" boxSize={8} />
        <Text color="white" fontSize="lg" fontWeight="bold">
          Something went wrong
        </Text>
        {error && (
          <Text color="whiteAlpha.800" fontSize="sm">
            {error.message}
          </Text>
        )}
        <Button
          onClick={() => window.location.reload()}
          colorScheme="red"
          size="sm"
        >
          Refresh Page
        </Button>
      </VStack>
    </Box>
  );
};
