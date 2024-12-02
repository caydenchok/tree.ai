import React from 'react';
import { Box, Flex, Heading, Icon, IconButton } from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface CardGroupProps {
  title: string;
  icon: IconType;
  children: React.ReactNode;
  isMinimizable?: boolean;
  bg?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  boxShadow?: string;
  p?: number;
  transition?: string;
  _hover?: any;
}

const CardGroup: React.FC<CardGroupProps> = ({ 
  title, 
  icon, 
  children, 
  isMinimizable,
  bg,
  borderColor,
  borderWidth,
  borderRadius,
  boxShadow,
  p,
  transition,
  _hover,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const cardBg = "rgba(0, 0, 0, 0.2)";
  const borderColorDefault = "rgba(205, 246, 131, 0.2)";
  const accentColor = "#cdf683";

  return (
    <MotionBox
      bg={bg || cardBg}
      borderColor={borderColor || borderColorDefault}
      borderWidth={borderWidth || "1px"}
      borderRadius={borderRadius || "xl"}
      boxShadow={boxShadow || "lg"}
      p={p || 4}
      transition={transition || "all 0.2s"}
      _hover={_hover || {
        transform: "translateY(-2px)",
        boxShadow: "2xl",
        borderColor: accentColor,
      }}
      layout
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Flex align="center" gap={2}>
          <Icon as={icon} color={accentColor} boxSize={5} />
          <Heading size="md" color="white">{title}</Heading>
        </Flex>
        {isMinimizable && (
          <IconButton
            aria-label={isCollapsed ? "Expand" : "Collapse"}
            icon={isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="ghost"
            color={accentColor}
            _hover={{ bg: "transparent", transform: "scale(1.1)" }}
          />
        )}
      </Flex>
      <MotionBox
        initial={false}
        animate={{
          height: isCollapsed ? 0 : "auto",
          opacity: isCollapsed ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        overflow="hidden"
      >
        {children}
      </MotionBox>
    </MotionBox>
  );
};

export default CardGroup;
