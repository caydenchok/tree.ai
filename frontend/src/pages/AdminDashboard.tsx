import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  useColorModeValue,
  IconButton,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const drawerBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Flex h="100vh">
      {/* Drawer */}
      <Box
        w={isDrawerOpen ? '240px' : '0'}
        bg={drawerBg}
        borderRight="1px"
        borderColor={borderColor}
        transition="width 0.2s"
        overflow="hidden"
      >
        <VStack p={4} spacing={4} align="stretch">
          <Heading size="md">{t('Navigation')}</Heading>
          {/* Add drawer content here */}
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" bg={useColorModeValue('gray.50', 'gray.900')} overflow="auto">
        <Flex p={4} borderBottom="1px" borderColor={borderColor} align="center">
          <IconButton
            aria-label="Toggle drawer"
            icon={isDrawerOpen ? <ChevronLeftIcon /> : <HamburgerIcon />}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            variant="ghost"
          />
          <Heading size="lg" ml={4}>
            {t('Admin Dashboard')}
          </Heading>
        </Flex>

        <Container maxW="7xl" py={8}>
          {/* Add admin dashboard content here */}
        </Container>
      </Box>
    </Flex>
  );
};

export default AdminDashboard;
