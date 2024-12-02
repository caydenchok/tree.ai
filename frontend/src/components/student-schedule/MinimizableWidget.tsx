import React, { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Text,
  useDisclosure,
  Collapse,
} from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface MinimizableWidgetProps {
  title: string;
  children: React.ReactNode;
}

const MinimizableWidget: React.FC<MinimizableWidgetProps> = ({ title, children }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Box
      bg="rgba(0, 0, 0, 0.4)"
      borderRadius="xl"
      border="1px solid rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
      overflow="hidden"
      transition="all 0.2s"
    >
      <Flex
        p={3}
        alignItems="center"
        justifyContent="space-between"
        borderBottom={isOpen ? "1px solid rgba(255, 255, 255, 0.1)" : "none"}
        cursor="pointer"
        onClick={onToggle}
        _hover={{
          bg: "rgba(255, 255, 255, 0.05)"
        }}
      >
        <Text
          color="#CDF683"
          fontSize="sm"
          fontWeight="medium"
        >
          {title}
        </Text>
        <IconButton
          aria-label="Toggle widget"
          icon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
          size="sm"
          variant="ghost"
          color="#CDF683"
          _hover={{
            bg: "rgba(205, 246, 131, 0.1)"
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        />
      </Flex>
      <Collapse in={isOpen}>
        <Box p={4}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default MinimizableWidget;
