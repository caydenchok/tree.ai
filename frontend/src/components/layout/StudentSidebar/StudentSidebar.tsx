import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  VStack,
  Icon,
  Text,
  Avatar,
  IconButton,
  Badge,
  Button,
} from '@chakra-ui/react';
import {
  FaHome,
  FaBook,
  FaCalendarAlt,
  FaClipboardList,
  FaChartLine,
  FaEnvelope,
  FaRobot,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { useSidebar } from '../../../contexts/SidebarContext';
import { motion } from 'framer-motion';

interface StudentSidebarProps {
  className?: string;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ className }) => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      icon: FaHome, 
      label: 'Dashboard', 
      href: '/dashboard/student',
    },
    { 
      icon: FaRobot, 
      label: 'AI Assistant', 
      href: '/dashboard/student/ai-assistant',
      badge: 'New'
    },
    { 
      icon: FaCalendarAlt, 
      label: 'Schedule', 
      href: '/dashboard/student/schedule',
    },
    { 
      icon: FaClipboardList, 
      label: 'Homeworks', 
      href: '/dashboard/student/homeworks',
      badge: '3'
    },
    { 
      icon: FaEnvelope, 
      label: 'Messages', 
      href: '/dashboard/student/messages',
      badge: '5'
    },
    { 
      icon: FaChartLine, 
      label: 'Progress', 
      href: '/dashboard/student/progress',
    },
    { 
      icon: FaCog, 
      label: 'Settings', 
      href: '/dashboard/student/settings',
    },
  ];

  const MotionBox = motion(Box);

  return (
    <Box
      as="nav"
      pos="fixed"
      left={0}
      w={isCollapsed ? "60px" : "240px"}
      h="100vh"
      bg="rgba(0, 0, 0, 0.3)"
      backdropFilter="blur(10px)"
      borderRight="1px solid"
      borderColor="whiteAlpha.200"
      transition="all 0.3s"
      zIndex={1000}
      className={className}
    >
      <Flex direction="column" h="full" pt="5" pb="10">
        {/* Profile Section */}
        <Box px={isCollapsed ? "4" : "6"} mb="8">
          <Flex align="center" mb={isCollapsed ? "0" : "4"}>
            <Avatar size={isCollapsed ? "sm" : "md"} name="Student Name" src="/avatar.jpg" />
            {!isCollapsed && (
              <Box ml="3">
                <Text color="white" fontWeight="medium">Student Name</Text>
                <Text color="whiteAlpha.600" fontSize="sm">Class 3A</Text>
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

        {/* Bottom Buttons */}
        <Box px={isCollapsed ? "4" : "6"} mt="8">
          <VStack spacing={2} align="stretch">
            {/* Logout Button */}
            <Button
              leftIcon={<FaSignOutAlt />}
              variant="ghost"
              color="whiteAlpha.600"
              justifyContent={isCollapsed ? "center" : "flex-start"}
              _hover={{
                color: "#CDF683",
                bg: "whiteAlpha.100",
              }}
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  navigate('/login');
                }
              }}
              size="md"
              w="full"
              iconSpacing={isCollapsed ? 0 : 3}
            >
              {!isCollapsed && "Logout"}
            </Button>

            {/* Collapse Button */}
            <Button
              leftIcon={isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
              variant="ghost"
              color="whiteAlpha.600"
              justifyContent={isCollapsed ? "center" : "flex-start"}
              _hover={{
                color: "#CDF683",
                bg: "whiteAlpha.100",
              }}
              onClick={() => setIsCollapsed(!isCollapsed)}
              size="md"
              w="full"
              iconSpacing={isCollapsed ? 0 : 3}
              borderRadius="md"
            >
              {!isCollapsed && "Toggle Sidebar"}
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default StudentSidebar;
