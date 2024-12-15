import { useState, useEffect, useCallback } from 'react';
import { useToast, VStack, Text } from '@chakra-ui/react';

interface UseRateLimitReturn {
  isRateLimited: boolean;
  rateLimitEndTime: Date | null;
  handleRateLimit: () => void;
  formatTimeRemaining: (endTime: Date) => string;
}

export const useRateLimit = (): UseRateLimitReturn => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitEndTime, setRateLimitEndTime] = useState<Date | null>(null);
  const toast = useToast();

  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    if (diff <= 0) return "0:00";
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleRateLimit = useCallback(() => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 1);
    setRateLimitEndTime(endTime);
    setIsRateLimited(true);

    toast({
      title: "",
      description: (
        <VStack align="start" spacing={2}>
          <Text>You've reached the free plan limit.</Text>
          <Text>Upgrade to continue chatting!</Text>
        </VStack>
      ),
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  }, [toast]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (rateLimitEndTime) {
      timer = setInterval(() => {
        if (new Date() >= rateLimitEndTime) {
          setIsRateLimited(false);
          setRateLimitEndTime(null);
          toast({
            title: "You're back!",
            description: "You can now continue chatting.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [rateLimitEndTime, toast]);

  return {
    isRateLimited,
    rateLimitEndTime,
    handleRateLimit,
    formatTimeRemaining,
  };
};
