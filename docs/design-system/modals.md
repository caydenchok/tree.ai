# Modal Design Patterns

## Glassmorphic Chat Modal

A modern, chat-style modal design that matches our app's theme with a glassy effect and subtle animations.

### Core Components

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

### Action Buttons

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

### Key Features

1. Transparent Background
   - Modal content has transparent background
   - Uses backdrop blur for depth
   - Blurred overlay for focus

2. Card Design
   - Consistent with chat message style
   - Green gradient backgrounds
   - Subtle borders and shadows
   - Hover animations

3. Interactive Elements
   - Prominent action buttons
   - Scale animations on hover
   - Color transitions
   - Clear visual feedback

4. Theme Colors
   - Primary: rgba(205, 246, 131, x) [Green]
   - Background: rgba(0, 0, 0, x) [Black]
   - Text: whiteAlpha.900 [White]
   - Accents: Various alpha values for depth

### Usage

This modal design is ideal for:
- Chat histories
- Message collections
- Settings panels
- Any content that should feel integrated with the chat interface

The design maintains consistency with the chat UI while providing a clear modal context through the blurred overlay and elevated positioning.
