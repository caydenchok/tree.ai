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
      bg="rgba(34, 39, 29, 0.65)"
      backdropFilter="blur(12px)"
      WebkitBackdropFilter="blur(12px)"
      borderBottom="1px"
      borderColor="rgba(255, 255, 255, 0.1)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
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
              _hover={{ bg: "#bde472", transform: 'translateY(-1px)' }}
              _active={{ transform: 'translateY(0)' }}
              transition="all 0.2s"
              size="sm"
              boxShadow="0 0 10px rgba(205, 246, 131, 0.3)"
            >
              Tree AI
            </Button>

            {/* Mobile menu button */}
            {isMobile && (
              <IconButton
                aria-label="Open menu"
                icon={<HiMenu />}
                variant="ghost"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={onOpen}
              />
            )}
          </HStack>

          {/* Mobile drawer */}
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg="gray.900">
              <DrawerCloseButton color="white" />
              <DrawerHeader borderBottomWidth="1px" borderColor="whiteAlpha.300" color="white">
                Menu
              </DrawerHeader>
              <DrawerBody>
                <VStack spacing={4} align="stretch" mt={4}>
                  <Button
                    onClick={() => {
                      navigate('/tree-chat');
                      onClose();
                    }}
                    leftIcon={<BsChat />}
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.200' }}
                    justifyContent="flex-start"
                  >
                    Tree AI Chat
                  </Button>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          {/* Language Selector */}
          {!isMobile && <LanguageSelector />}

          {/* Login/Register Buttons */}
          {!isMobile && (
            <Button
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              size="sm"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
