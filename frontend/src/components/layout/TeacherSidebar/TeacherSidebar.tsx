import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Icon,
  Text,
  Avatar,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import {
  FaHome,
  FaGraduationCap,
  FaCalendarAlt,
  FaBook,
  FaChartLine,
  FaComments,
  FaBrain,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface TeacherSidebarProps {
  isCollapsed: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ isCollapsed, onCollapse }) => {
  const location = useLocation();

  const navItems = [
    { 
      icon: FaHome, 
      label: 'Dashboard', 
      href: '/teacher/dashboard',
    },
    { 
      icon: FaBrain, 
      label: 'AI Assistant', 
      href: '/teacher/ai-assistant',
      badge: 'New'
    },
    { 
      icon: FaCalendarAlt, 
      label: 'Schedule', 
      href: '/teacher/schedule',
    },
    { 
      icon: FaBook, 
      label: 'Classes', 
      href: '/teacher/classes',
    },
    { 
      icon: FaGraduationCap, 
      label: 'Students', 
      href: '/teacher/students',
      badge: '28'
    },
    { 
      icon: FaComments, 
      label: 'Messages', 
      href: '/teacher/messages',
      badge: '3'
    },
    { 
      icon: FaChartLine, 
      label: 'Analytics', 
      href: '/teacher/analytics',
    },
    { 
      icon: FaCog, 
      label: 'Settings', 
      href: '/teacher/settings',
    },
  ];

  const MotionBox = motion(Box);

  return (
    <Box
      as="nav"
      pos="fixed"
      left={0}
      h="100vh"
      bg="gray.900"
      borderRight="1px"
      borderColor="whiteAlpha.200"
      w={isCollapsed ? "20" : "64"}
      transition="width 0.2s"
      zIndex={100}
    >
      <Flex direction="column" h="full" pt="5" pb="10">
        {/* Profile Section */}
        <Box px={isCollapsed ? "4" : "6"} mb="8">
          <Flex align="center" mb={isCollapsed ? "0" : "4"}>
            <Avatar size={isCollapsed ? "sm" : "md"} name="Teacher Name" src="/teacher-avatar.jpg" />
            {!isCollapsed && (
              <Box ml="3">
                <Text color="white" fontWeight="medium">Teacher Name</Text>
                <Text color="whiteAlpha.600" fontSize="sm">Mathematics</Text>
              </Box>
            )}
          </Flex>
        </Box>

        {/* Navigation Items */}
        <VStack spacing="2" align="stretch" flex="1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link key={item.href} to={item.href}>
                <MotionBox
                  display="flex"
                  alignItems="center"
                  px={isCollapsed ? "4" : "6"}
                  py="3"
                  cursor="pointer"
                  userSelect="none"
                  position="relative"
                  transition="all 0.2s"
                  color={isActive ? "#CDF683" : "whiteAlpha.900"}
                  _hover={{
                    bg: "whiteAlpha.100",
                    color: "#CDF683",
                  }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <Box
                      position="absolute"
                      left="0"
                      top="0"
                      bottom="0"
                      w="1"
                      bg="#CDF683"
                      rounded="full"
                    />
                  )}
                  
                  <Icon as={item.icon} boxSize={5} />
                  
                  {!isCollapsed && (
                    <Text ml="3" flex="1">
                      {item.label}
                    </Text>
                  )}
                  
                  {!isCollapsed && item.badge && (
                    <Badge
                      colorScheme={item.badge === 'New' ? 'green' : 'red'}
                      variant="solid"
                      fontSize="xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </MotionBox>
              </Link>
            );
          })}
        </VStack>

        {/* Collapse Button */}
        <Box px={isCollapsed ? "4" : "6"} mt="8">
          <IconButton
            aria-label="Toggle sidebar"
            icon={<FaSignOutAlt />}
            variant="ghost"
            color="whiteAlpha.600"
            _hover={{
              color: "#CDF683",
              bg: "whiteAlpha.100",
            }}
            onClick={() => onCollapse?.(!isCollapsed)}
            size="sm"
            w={isCollapsed ? "auto" : "full"}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default TeacherSidebar;
