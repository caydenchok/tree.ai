import * as React from 'react';
import {
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Icon,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

interface HomeworkFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

const HomeworkFilters: React.FC<HomeworkFiltersProps> = React.memo(({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) => {
  return (
    <HStack spacing={4} w="100%">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiSearch} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search homeworks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          bg="whiteAlpha.50"
          border="1px solid"
          borderColor="whiteAlpha.100"
          _hover={{ borderColor: 'whiteAlpha.300' }}
          _focus={{ borderColor: 'green.300', boxShadow: 'none' }}
        />
      </InputGroup>
      <Select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        bg="whiteAlpha.50"
        border="1px solid"
        borderColor="whiteAlpha.100"
        _hover={{ borderColor: 'whiteAlpha.300' }}
        _focus={{ borderColor: 'green.300', boxShadow: 'none' }}
        w="200px"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="submitted">Submitted</option>
        <option value="graded">Graded</option>
        <option value="overdue">Overdue</option>
      </Select>
    </HStack>
  );
});

export default HomeworkFilters;
