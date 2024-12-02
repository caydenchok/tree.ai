import React, { useState } from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import StudentSidebar from '../StudentSidebar';
import TeacherSidebar from '../TeacherSidebar';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  userType: 'student' | 'teacher';
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children, userType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Show sidebar as drawer on mobile, normal sidebar on desktop
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const SidebarComponent = userType === 'student' ? StudentSidebar : TeacherSidebar;

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          position="fixed"
          left={0}
          w={isCollapsed ? '60px' : '240px'}
          transition="width 0.2s"
        >
          <SidebarComponent
            isCollapsed={isCollapsed}
            onCollapse={(collapsed) => setIsCollapsed(collapsed)}
          />
        </Box>
      )}

      {/* Mobile Hamburger Button */}
      {isMobile && (
        <IconButton
          aria-label="Open Menu"
          icon={<FaBars />}
          position="fixed"
          top={4}
          left={4}
          zIndex={20}
          onClick={onOpen}
        />
      )}

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent maxW="240px">
          <SidebarComponent isCollapsed={false} />
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box
        ml={isMobile ? 0 : isCollapsed ? '60px' : '240px'}
        transition="margin-left 0.2s"
        p={4}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ResponsiveLayout;
