import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Text,
  Icon,
  Button,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FiDatabase, FiFile, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface DatabaseFile {
  name: string;
  path: string;
  type: string;
  size: number;
  lastModified: string;
}

export const DatabaseBrowser: React.FC = () => {
  const [files, setFiles] = useState<DatabaseFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const toast = useToast();

  useEffect(() => {
    fetchDatabaseFiles();
  }, []);

  const fetchDatabaseFiles = async () => {
    try {
      const response = await fetch('/api/database/files');
      if (!response.ok) throw new Error('Failed to fetch database files');
      
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      toast({
        title: 'Error fetching database files',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFileSelection = (path: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(path)) {
      newSelected.delete(path);
    } else {
      newSelected.add(path);
    }
    setSelectedFiles(newSelected);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <VStack spacing={4} align="stretch">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiSearch} color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search database files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          bg="whiteAlpha.100"
          border="1px solid"
          borderColor="whiteAlpha.200"
          _hover={{ borderColor: "whiteAlpha.300" }}
          _focus={{ borderColor: "#cdf683", boxShadow: "0 0 0 1px #cdf683" }}
          color="white"
        />
      </InputGroup>

      <Box
        overflowX="auto"
        bg="whiteAlpha.50"
        borderRadius="lg"
        p={4}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
          },
        }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="gray.400">Name</Th>
              <Th color="gray.400">Type</Th>
              <Th color="gray.400">Size</Th>
              <Th color="gray.400">Last Modified</Th>
              <Th color="gray.400">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredFiles.map((file) => (
              <MotionBox
                as={Tr}
                key={file.path}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                cursor="pointer"
                onClick={() => toggleFileSelection(file.path)}
              >
                <Td color="white">
                  <Box display="flex" alignItems="center" gap={2}>
                    <Icon as={FiFile} color="#cdf683" />
                    {file.name}
                  </Box>
                </Td>
                <Td>
                  <Badge colorScheme="green">{file.type}</Badge>
                </Td>
                <Td color="white">{formatFileSize(file.size)}</Td>
                <Td color="white">{new Date(file.lastModified).toLocaleDateString()}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme={selectedFiles.has(file.path) ? "green" : "gray"}
                    variant={selectedFiles.has(file.path) ? "solid" : "outline"}
                  >
                    {selectedFiles.has(file.path) ? 'Selected' : 'Select'}
                  </Button>
                </Td>
              </MotionBox>
            ))}
          </Tbody>
        </Table>

        {filteredFiles.length === 0 && (
          <Box textAlign="center" py={8}>
            <Icon as={FiDatabase} boxSize={8} color="gray.500" mb={4} />
            <Text color="gray.500">No database files found</Text>
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default DatabaseBrowser;
