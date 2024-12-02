import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

const MotionBox = motion(Box);

const DigitalTree: React.FC = () => {
  const controls = useAnimation();
  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateTree = async () => {
      await controls.start({
        opacity: [0.4, 0.8, 0.4],
        scale: [1, 1.05, 1],
        rotate: [0, 5, -5, 0],
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }
      });
    };
    animateTree();
  }, [controls]);

  const branchVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "backOut" }
    }
  };

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      overflow="hidden"
      zIndex={0}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Background Gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-br, rgba(205, 246, 131, 0.05), rgba(26, 32, 44, 0.8))"
        filter="blur(20px)"
      />

      {/* 3D Digital Tree */}
      <MotionBox
        ref={treeRef}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="100%"
        height="100%"
        animate={controls}
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
          style={{
            filter: "drop-shadow(0 0 20px rgba(205, 246, 131, 0.2))",
          }}
        >
          {/* Main Trunk */}
          <motion.path
            d="M400 600 L400 400"
            stroke="#CDF683"
            strokeWidth="4"
            fill="none"
            variants={branchVariants}
            initial="initial"
            animate="animate"
            style={{ filter: "drop-shadow(0 0 5px #CDF683)" }}
          />

          {/* Branches */}
          {[
            "M400 400 L300 300",
            "M400 400 L500 300",
            "M300 300 L250 250",
            "M300 300 L350 200",
            "M500 300 L450 200",
            "M500 300 L550 250",
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="#CDF683"
              strokeWidth="3"
              fill="none"
              variants={branchVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: i * 0.2 }}
              style={{ filter: "drop-shadow(0 0 3px #CDF683)" }}
            />
          ))}

          {/* Nodes */}
          {[
            [400, 400],
            [300, 300],
            [500, 300],
            [250, 250],
            [350, 200],
            [450, 200],
            [550, 250],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="8"
              fill="#CDF683"
              variants={nodeVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 1 + i * 0.1 }}
              style={{ filter: "drop-shadow(0 0 10px #CDF683)" }}
            />
          ))}

          {/* Floating Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              cx={Math.random() * 800}
              cy={Math.random() * 800}
              r="2"
              fill="#CDF683"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -50],
                x: [0, Math.random() * 40 - 20],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Connection Lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line
              key={`connection-${i}`}
              x1={Math.random() * 800}
              y1={Math.random() * 800}
              x2={Math.random() * 800}
              y2={Math.random() * 800}
              stroke="#CDF683"
              strokeWidth="1"
              strokeOpacity="0.3"
              animate={{
                opacity: [0, 0.3, 0],
                pathLength: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </svg>
      </MotionBox>
    </Box>
  );
};

export default DigitalTree;
