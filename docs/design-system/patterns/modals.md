# Modal Design Patterns

## Overview
Our modal system follows a glassmorphic design language that emphasizes depth, transparency, and modern aesthetics while maintaining readability and usability.

## Types of Modals

### 1. Glassmorphic Chat Modal
A modern, chat-style modal design that matches our app's theme with a glassy effect and subtle animations.

#### Core Components

```tsx
<Modal size="2xl">
  <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.700" />
  <ModalContent
    bg="transparent"
    boxShadow="none"
    maxW="850px"
    mx="auto"
  >
    <ModalBody p={8}>
      <VStack spacing={4} align="stretch">
        {/* Header Card */}
        <Box
          p={4}
          bgGradient="linear(to-r, rgba(205, 246, 131, 0.15), rgba(205, 246, 131, 0.1))"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="rgba(205, 246, 131, 0.2)"
          backdropFilter="blur(8px)"
          boxShadow="lg"
        >
          <HStack justify="space-between">
            {/* Content */}
          </HStack>
        </Box>

        {/* Content Cards */}
        <Box
          p={4}
          bgGradient="linear(to-r, rgba(205, 246, 131, 0.15), rgba(205, 246, 131, 0.1))"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="rgba(205, 246, 131, 0.2)"
          backdropFilter="blur(8px)"
          boxShadow="lg"
          _hover={{
            transform: "translateY(-2px)",
            transition: "all 0.2s",
          }}
        >
          {/* Content */}
        </Box>
      </VStack>
    </ModalBody>
  </ModalContent>
</Modal>
```

#### Action Buttons

```tsx
<IconButton
  variant="solid"
  size="md"
  bg="rgba(205, 246, 131, 0.15)"
  color="white"
  _hover={{ 
    bg: "rgba(205, 246, 131, 0.3)",
    transform: "scale(1.1)",
    color: "#cdf683"
  }}
  _active={{
    bg: "rgba(205, 246, 131, 0.2)"
  }}
  transition="all 0.2s"
/>
```

### 2. Form Modal
(Coming soon)

### 3. Alert Modal
(Coming soon)

## Design Features

### Visual Characteristics
1. **Transparent Background**
   - Modal content has transparent background
   - Uses backdrop blur for depth
   - Blurred overlay for focus

2. **Card Design**
   - Consistent with chat message style
   - Green gradient backgrounds
   - Subtle borders and shadows
   - Hover animations

3. **Interactive Elements**
   - Prominent action buttons
   - Scale animations on hover
   - Color transitions
   - Clear visual feedback

### Theme Colors
- Primary: rgba(205, 246, 131, x) [Green]
- Background: rgba(0, 0, 0, x) [Black]
- Text: whiteAlpha.900 [White]
- Accents: Various alpha values for depth

## Accessibility
- Modals trap focus when open
- Keyboard navigation support
- ARIA labels for all interactive elements
- High contrast text for readability
- Clear visual hierarchy

## Best Practices
1. Keep modal content concise and focused
2. Provide clear exit points
3. Use consistent animations
4. Maintain proper spacing
5. Follow color contrast guidelines
