import { Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { ReactNode } from 'react';

const MotionBox = motion(Box);

interface AnimatedContainerProps {
  children: ReactNode;
  isVisible?: boolean;
  delay?: number;
  duration?: number;
  animation?: 'fadeIn' | 'slideIn' | 'scale';
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  isVisible = true,
  delay = 0,
  duration = 0.3,
  animation = 'fadeIn',
}) => {
  const variants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          variants={variants[animation]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration,
            delay,
            ease: 'easeInOut',
          }}
        >
          {children}
        </MotionBox>
      )}
    </AnimatePresence>
  );
};
