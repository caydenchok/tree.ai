# Overlay Design Pattern

## Overview

A modern, glassmorphic overlay design pattern that combines depth, transparency, and blur effects to create layered UI elements with visual hierarchy.

### Core Components

```tsx
// Basic Overlay with Blur
<Box
  position="absolute"
  inset={0}
  backdropFilter="blur(10px)"
  bg="rgba(26, 32, 44, 0.3)"
/>

// Gradient Overlay
<Box
  position="absolute"
  inset={0}
  bgGradient="linear(to-b, rgba(205, 246, 131, 0.05), rgba(26, 32, 44, 0.95))"
  pointerEvents="none"
/>
```

### Color Palette

```css
/* Base Colors */
--color-accent: #CDF683;          /* Lime Green */
--color-background: #1A202C;      /* Dark Blue/Gray */

/* Overlay Colors */
--overlay-dark: rgba(26, 32, 44, 0.3);     /* Dark overlay */
--overlay-light: rgba(205, 246, 131, 0.05); /* Light accent overlay */
--overlay-glass: rgba(255, 255, 255, 0.05); /* Glass effect */

/* Border Colors */
--border-light: rgba(255, 255, 255, 0.2);  /* Light border */
--border-accent: rgba(205, 246, 131, 0.3); /* Accent border */
```

### Design Features

1. **Layering**
   - Multiple layers of transparency create depth
   - Blur effects enhance readability of overlaid content
   - Gradient overlays for visual interest

2. **Interaction States**
   - Hover states with subtle background changes
   - Active states with increased opacity
   - Focus states with accent-colored borders

3. **Accessibility**
   - Maintains sufficient contrast ratios
   - Clear visual hierarchy
   - Readable text on transparent backgrounds

### Usage Examples

#### 1. Modal Overlay
```tsx
<Box
  position="fixed"
  inset={0}
  zIndex={1000}
  backdropFilter="blur(10px)"
  bg="rgba(26, 32, 44, 0.3)"
>
  <Box
    position="relative"
    maxW="600px"
    mx="auto"
    mt="10vh"
    bg="rgba(205, 246, 131, 0.05)"
    borderRadius="xl"
    borderWidth="1px"
    borderColor="whiteAlpha.200"
    overflow="hidden"
  >
    {/* Content */}
  </Box>
</Box>
```

#### 2. Card with Gradient Overlay
```tsx
<Box
  position="relative"
  borderRadius="lg"
  overflow="hidden"
>
  <Box
    position="absolute"
    inset={0}
    bgGradient="linear(to-b, rgba(205, 246, 131, 0.05), rgba(26, 32, 44, 0.95))"
    pointerEvents="none"
  />
  <VStack spacing={4} p={6} position="relative">
    {/* Card Content */}
  </VStack>
</Box>
```

#### 3. Interactive Button with Overlay
```tsx
<Button
  position="relative"
  overflow="hidden"
  _hover={{
    '&::before': {
      opacity: 0.2
    }
  }}
  _before={{
    content: '""',
    position: 'absolute',
    inset: 0,
    bg: 'white',
    opacity: 0.1,
    transition: 'opacity 0.2s'
  }}
>
  {/* Button Content */}
</Button>
```

### Best Practices

1. **Depth and Hierarchy**
   - Use consistent z-index values
   - Layer overlays thoughtfully
   - Maintain clear visual hierarchy

2. **Performance**
   - Use hardware-accelerated properties
   - Optimize blur effects
   - Consider reducing effects on mobile

3. **Accessibility**
   - Test contrast ratios
   - Ensure readable text
   - Provide focus indicators

4. **Responsive Design**
   - Adjust blur intensity for different screens
   - Scale overlay opacity appropriately
   - Consider touch interactions
