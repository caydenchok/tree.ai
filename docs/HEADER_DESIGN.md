# Tree AI Header Design System

This document outlines the standardized header designs used across the Tree AI platform. These designs ensure consistency and provide a modern, cohesive look across all pages.

## Common Header Styles

### Base Header Style
```typescript
const headerStyle = {
  background: 'linear-gradient(180deg, rgba(205, 246, 131, 0.15) 0%, rgba(181, 232, 83, 0.1) 100%)',
  backdropFilter: 'blur(8px)',
  borderBottom: '1px solid rgba(205, 246, 131, 0.2)',
  padding: '1.5rem',
  position: 'relative' as const,
  willChange: 'transform',
};
```

### Icon Container Style
```typescript
const iconContainerStyle = {
  position: 'relative' as const,
  padding: '0.5rem',
  borderRadius: '0.75rem',
  background: 'rgba(205, 246, 131, 0.08)',
  border: '1px solid rgba(205, 246, 131, 0.15)',
  willChange: 'transform',
};
```

### Icon Style
```typescript
const iconStyle = {
  color: '#CDF683',
  transition: 'transform 0.2s ease',
  _hover: {
    transform: 'scale(1.05)',
  }
};
```

### Badge Style
```typescript
const badgeStyle = {
  background: 'rgba(205, 246, 131, 0.08)',
  borderRadius: '9999px',
  padding: '0.5rem 1rem',
  border: '1px solid rgba(205, 246, 131, 0.2)',
  transition: 'transform 0.2s ease, background-color 0.2s ease',
  _hover: {
    background: 'rgba(205, 246, 131, 0.12)',
    transform: 'translateY(-1px)',
  }
};
```

## Header Layout Structure

### Basic Header Layout
```tsx
<Box w="full" {...headerStyle}>
  <Flex justify="space-between" align="center" maxW="1800px" mx="auto" w="100%" px={6}>
    {/* Left Side */}
    <HStack spacing={4}>
      <Box {...iconContainerStyle}>
        <Icon 
          as={HeaderIcon} 
          {...iconStyle}
          boxSize={6}
        />
      </Box>
      <VStack align="start" spacing={0}>
        <Text fontSize="xl" fontWeight="bold" color="#CDF683">
          Page Title
        </Text>
        <Text fontSize="sm" color="rgba(205, 246, 131, 0.8)">
          Subtitle Text
        </Text>
      </VStack>
    </HStack>

    {/* Right Side */}
    <Box {...badgeStyle}>
      <HStack spacing={2}>
        <Text fontSize="sm" color="rgba(205, 246, 131, 0.7)" fontStyle="italic">
          Powered by
        </Text>
        <Text fontSize="sm" fontWeight="bold" color="#CDF683">
          Tree AI
        </Text>
      </HStack>
    </Box>
  </Flex>
</Box>
```

## Modal Header Design

### Modal Content Style
```typescript
const modalStyle = {
  bg: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(20px)',
  borderRadius: 'xl',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  color: 'white',
};
```

### Modal Header Layout
```tsx
<ModalContent {...modalStyle}>
  <ModalHeader
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    {...headerStyle}
  >
    <Flex justify="space-between" align="center" width="100%">
      <HStack spacing={4} align="center">
        <Box {...iconContainerStyle}>
          <Icon 
            as={HeaderIcon}
            {...iconStyle}
            boxSize={6}
          />
        </Box>
        <VStack align="start" spacing={0}>
          <Text fontSize="xl" fontWeight="bold" color="#CDF683">
            Modal Title
          </Text>
          <Text fontSize="sm" color="rgba(205, 246, 131, 0.8)">
            Modal Subtitle
          </Text>
        </VStack>
      </HStack>
      
      <HStack spacing={4}>
        <Box {...badgeStyle}>
          <HStack spacing={2}>
            <Text fontSize="sm" color="rgba(205, 246, 131, 0.7)" fontStyle="italic">
              Powered by
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="#CDF683">
              Tree AI
            </Text>
          </HStack>
        </Box>
        <IconButton
          aria-label="Close modal"
          icon={<FaTimes />}
          size="sm"
          variant="ghost"
          color="whiteAlpha.700"
          onClick={onClose}
          _hover={{
            color: "#CDF683",
            transform: "rotate(90deg)",
            bg: "rgba(205, 246, 131, 0.1)",
          }}
          transition="all 0.2s"
        />
      </HStack>
    </Flex>
  </ModalHeader>
</ModalContent>
```

## Page Container Structure

To ensure proper header positioning and content scrolling, use this container structure:

```tsx
<Box
  flex="1"
  ml={isSidebarCollapsed ? "60px" : "240px"}
  transition="margin-left 0.3s"
  position="relative"
>
  <Box
    position="relative"
    zIndex={1}
    h="100vh"
    display="flex"
    flexDirection="column"
  >
    {/* Header Section */}
    <Box w="full" {...headerStyle}>
      {/* Header Content */}
    </Box>

    {/* Content Section */}
    <Box flex="1" overflowY="auto" p={8}>
      {/* Page Content */}
    </Box>
  </Box>
</Box>
```

## Color Palette

- Primary Green: `#CDF683`
- Hover Green: `#B5E853`
- Active Green: `#98D626`
- Background Gradient:
  - Start: `rgba(205, 246, 131, 0.15)`
  - End: `rgba(181, 232, 83, 0.1)`
- Text Colors:
  - Primary: `#CDF683`
  - Secondary: `rgba(205, 246, 131, 0.8)`
  - Muted: `rgba(205, 246, 131, 0.7)`

## Usage Guidelines

1. Always use the full width header with `maxW="1800px"` for consistency
2. Maintain the glass effect with `backdropFilter="blur(8px)"`
3. Use the standard icon size of `boxSize={6}`
4. Keep the "Powered by Tree AI" badge on all headers
5. For modals, include the close button with rotation animation
6. Use proper spacing with `px={6}` for header content padding
7. Ensure the content section is scrollable with `flex="1"` and `overflowY="auto"`
