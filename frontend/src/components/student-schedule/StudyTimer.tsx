import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  CircularProgress,
  CircularProgressLabel,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from '@chakra-ui/react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import MinimizableWidget from './MinimizableWidget';

const StudyTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(minutes * 60 + seconds);
  const [initialTime, setInitialTime] = useState(minutes * 60 + seconds);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const toast = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time <= 1) {
            clearInterval(interval);
            setIsActive(false);
            toast({
              title: "Time's up!",
              description: "Take a break and start fresh!",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, toast]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (time === 0) {
      setTime(initialTime);
    }
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(initialTime);
  };

  const handleMinutesChange = (value: string) => {
    const mins = parseInt(value) || 0;
    setMinutes(mins);
    const newTime = mins * 60 + seconds;
    setTime(newTime);
    setInitialTime(newTime);
  };

  const handleSecondsChange = (value: string) => {
    const secs = parseInt(value) || 0;
    setSeconds(secs);
    const newTime = minutes * 60 + secs;
    setTime(newTime);
    setInitialTime(newTime);
  };

  const progress = (time / initialTime) * 100;

  return (
    <MinimizableWidget title="Study Timer">
      <VStack spacing={4}>
        <CircularProgress
          value={progress}
          color="#CDF683"
          size="100px"
          thickness="4px"
          trackColor="whiteAlpha.200"
        >
          <CircularProgressLabel color="white">
            {formatTime(time)}
          </CircularProgressLabel>
        </CircularProgress>

        {!isActive && (
          <HStack spacing={2} align="center">
            <VStack spacing={1}>
              <Text fontSize="xs" color="whiteAlpha.700">Minutes</Text>
              <NumberInput
                size="sm"
                maxW={20}
                min={0}
                max={99}
                value={minutes}
                onChange={handleMinutesChange}
                isDisabled={isActive}
              >
                <NumberInputField 
                  textAlign="center"
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="rgba(205, 246, 131, 0.2)"
                  color="white"
                  _hover={{
                    borderColor: "rgba(205, 246, 131, 0.4)",
                  }}
                  _focus={{
                    borderColor: "#CDF683",
                    boxShadow: "0 0 0 1px #CDF683",
                  }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper 
                    border="none"
                    color="#CDF683"
                    _active={{ bg: "rgba(205, 246, 131, 0.2)" }}
                  />
                  <NumberDecrementStepper 
                    border="none"
                    color="#CDF683"
                    _active={{ bg: "rgba(205, 246, 131, 0.2)" }}
                  />
                </NumberInputStepper>
              </NumberInput>
            </VStack>

            <Text color="whiteAlpha.700" mt={6}>:</Text>

            <VStack spacing={1}>
              <Text fontSize="xs" color="whiteAlpha.700">Seconds</Text>
              <NumberInput
                size="sm"
                maxW={20}
                min={0}
                max={59}
                value={seconds}
                onChange={handleSecondsChange}
                isDisabled={isActive}
              >
                <NumberInputField 
                  textAlign="center"
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="rgba(205, 246, 131, 0.2)"
                  color="white"
                  _hover={{
                    borderColor: "rgba(205, 246, 131, 0.4)",
                  }}
                  _focus={{
                    borderColor: "#CDF683",
                    boxShadow: "0 0 0 1px #CDF683",
                  }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper 
                    border="none"
                    color="#CDF683"
                    _active={{ bg: "rgba(205, 246, 131, 0.2)" }}
                  />
                  <NumberDecrementStepper 
                    border="none"
                    color="#CDF683"
                    _active={{ bg: "rgba(205, 246, 131, 0.2)" }}
                  />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </HStack>
        )}

        <HStack spacing={3}>
          <Button
            size="sm"
            variant="outline"
            color="#CDF683"
            borderColor="#CDF683"
            leftIcon={isActive && !isPaused ? <FaPause /> : <FaPlay />}
            onClick={isActive && !isPaused ? handlePause : handleStart}
            _hover={{
              bg: "rgba(205, 246, 131, 0.1)",
            }}
          >
            {isActive && !isPaused ? 'Pause' : 'Start'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            color="#CDF683"
            borderColor="#CDF683"
            leftIcon={<FaRedo />}
            onClick={handleReset}
            _hover={{
              bg: "rgba(205, 246, 131, 0.1)",
            }}
          >
            Reset
          </Button>
        </HStack>
      </VStack>
    </MinimizableWidget>
  );
};

export default StudyTimer;
