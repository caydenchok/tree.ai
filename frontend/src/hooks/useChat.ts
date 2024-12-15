import { useState, useCallback, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import chatService, { Message } from '../services/chatService';

interface UseChatReturn {
  messages: Message[];
  inputValue: string;
  isLoading: boolean;
  showWelcome: boolean;
  handleSendMessage: () => Promise<void>;
  setInputValue: (value: string) => void;
  handleBackToHome: () => void;
}

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setShowWelcome(false);
      
      // Add user message immediately
      const userMessage: Message = {
        role: 'user',
        content: inputValue.trim()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      
      // Blur input to dismiss keyboard on mobile
      inputRef.current?.blur();

      // Get response from API
      const response = await chatService.sendMessage(userMessage.content);
      setMessages(prev => [...prev, response]);
      
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = useCallback(() => {
    setShowWelcome(true);
    setMessages([]);
    setInputValue('');
  }, []);

  return {
    messages,
    inputValue,
    isLoading,
    showWelcome,
    handleSendMessage,
    setInputValue,
    handleBackToHome,
  };
};
