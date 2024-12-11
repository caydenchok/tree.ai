import { Box, VStack, Text, Button, IconButton, Icon, Avatar } from '@chakra-ui/react';
import { BsX } from 'react-icons/bs';
import { FaUser, FaCog, FaCrown, FaHistory, FaPalette, FaBell } from 'react-icons/fa';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      height="100vh"
      width={{ base: "270px", lg: "300px" }}
      bgGradient="linear(to-b, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.85))"
      transform={isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'}
      transition="all 0.3s ease-in-out"
      borderRight="1px solid rgba(205, 246, 131, 0.1)"
      backdropFilter="blur(10px)"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(205, 246, 131, 0.2)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(205, 246, 131, 0.3)',
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        aria-label="Close Sidebar"
        icon={<Icon as={BsX} boxSize={5} />}
        position="absolute"
        top={4}
        right={4}
        onClick={() => setIsSidebarOpen(false)}
        bg="transparent"
        _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
        color="#CDF683"
        size="md"
      />

      <VStack spacing={8} p={6} align="stretch" mt={16}>
        {/* Profile Section */}
        <Box 
          p={4} 
          bg="rgba(205, 246, 131, 0.05)" 
          borderRadius="xl"
          borderWidth="1px"
          borderColor="rgba(205, 246, 131, 0.1)"
        >
          <VStack spacing={3}>
            <Avatar 
              size="lg" 
              icon={<FaUser />}
              bg="rgba(205, 246, 131, 0.2)"
              color="#CDF683"
            />
            <Text color="whiteAlpha.900" fontSize="lg" fontWeight="bold">User Name</Text>
            <Text color="whiteAlpha.600" fontSize="sm">user@example.com</Text>
          </VStack>
        </Box>

        {/* Menu Sections */}
        <VStack align="stretch" spacing={6}>
          {/* Account Section */}
          <MenuSection 
            title="Account" 
            items={[
              { icon: FaUser, label: "Profile" },
              { icon: FaCog, label: "Settings" }
            ]} 
          />

          {/* Subscription Section */}
          <MenuSection 
            title="Subscription" 
            items={[
              { icon: FaCrown, label: "Upgrade Plan" },
              { icon: FaHistory, label: "Billing History" }
            ]} 
          />

          {/* Preferences Section */}
          <MenuSection 
            title="Preferences" 
            items={[
              { icon: FaPalette, label: "Theme" },
              { icon: FaBell, label: "Notifications" }
            ]} 
          />
        </VStack>
      </VStack>
    </Box>
  );
};

interface MenuSectionProps {
  title: string;
  items: Array<{ icon: any; label: string }>;
}

const MenuSection = ({ title, items }: MenuSectionProps) => (
  <VStack align="stretch" spacing={2}>
    <Text 
      color="whiteAlpha.600" 
      fontSize="sm" 
      fontWeight="medium"
      textTransform="uppercase"
      letterSpacing="wide"
      px={4}
    >
      {title}
    </Text>
    {items.map((item, index) => (
      <Button
        key={index}
        variant="ghost"
        justifyContent="flex-start"
        color="whiteAlpha.900"
        leftIcon={<Icon as={item.icon} color="#CDF683" />}
        _hover={{ bg: 'rgba(205, 246, 131, 0.1)' }}
        h="45px"
        borderRadius="xl"
      >
        {item.label}
      </Button>
    ))}
  </VStack>
);
