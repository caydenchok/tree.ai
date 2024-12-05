import { 
  Box, 
  Container, 
  Flex, 
  HStack, 
  Button, 
  IconButton, 
  Text, 
  Image,
  useDisclosure,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Avatar,
  AvatarBadge,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { FiChevronDown } from 'react-icons/fi';
import { BsChat } from 'react-icons/bs';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

interface NavItem {
  label: string;
  href?: string;
  submenu?: { label: string; href: string }[];
}

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const navigate = useNavigate();

  const navItems: NavItem[] = [];

  return (
    <Box 
      as="nav" 
      position="fixed" 
      top={0}
      left={0}
      right={0}
      w="100%" 
      zIndex={1000}
      bg="rgba(13, 17, 14, 0.92)"
      backdropFilter="blur(10px)"
      borderBottom="1px"
      borderColor="rgba(205, 246, 131, 0.2)"
      boxShadow="0 0 20px rgba(205, 246, 131, 0.05)"
      px={4}
      py={2}
      safeAreaInset="top"
    >
      <Container maxW="8xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <Link to="/">
            <HStack spacing={3}>
              <Image src="/logo.png" alt="Logo" h={8} />
              <Text
                display={{ base: 'none', md: 'block' }}
                fontSize="lg"
                fontWeight="bold"
                color="white"
              >
                Tree8 Global
              </Text>
            </HStack>
          </Link>

          {/* Right side items */}
          <HStack spacing={4}>
            {/* TreeChat Button */}
            <Button
              onClick={() => navigate('/tree-chat')}
              leftIcon={<BsChat />}
              bg="#CDF683"
              color="black"
              _hover={{ bg: "#b5e853", transform: 'translateY(-1px)' }}
              _active={{ transform: 'translateY(0)' }}
              transition="all 0.2s"
              size="sm"
              boxShadow="0 0 10px rgba(205, 246, 131, 0.3)"
            >
              Tree AI
            </Button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Login/Register Buttons */}
            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              size="sm"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="outline"
              color="white"
              borderColor="whiteAlpha.200"
              _hover={{ bg: 'whiteAlpha.200' }}
              size="sm"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
