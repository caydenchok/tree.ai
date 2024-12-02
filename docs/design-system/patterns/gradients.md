# Gradient Design Patterns

## AI Assistant Gradient Pattern

A modern, glassmorphic gradient design that combines lime green accents with dark backgrounds and blur effects.

### Core Components

```tsx
// Drawer with Gradient Header
<Drawer>
  <DrawerOverlay 
    backdropFilter="blur(10px)" 
    bg="rgba(26, 32, 44, 0.3)" 
  />
  <DrawerContent>
    <DrawerHeader>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-b, rgba(205, 246, 131, 0.05), rgba(26, 32, 44, 0.95))"
        pointerEvents="none"
      />
    </DrawerHeader>
  </DrawerContent>
</Drawer>

// Glassmorphic Card
<Box
  p={4}
  bg="rgba(205, 246, 131, 0.05)"
  borderRadius="xl"
  borderWidth="1px"
  borderColor="#CDF683"
  transition="all 0.3s"
  backdropFilter="blur(8px)"
/>
```

### Color Palette

```css
/* Primary Colors */
--color-accent: #CDF683;          /* Lime Green */
--color-background: #1A202C;      /* Dark Blue/Gray */

/* Gradient Colors */
--gradient-header: linear-gradient(
  to bottom,
  rgba(205, 246, 131, 0.05),    /* Very Light Lime Green */
  rgba(26, 32, 44, 0.95)        /* Dark Background */
);

/* Transparency Levels */
--overlay-dark: rgba(26, 32, 44, 0.3);
--overlay-light: rgba(205, 246, 131, 0.05);
--border-light: rgba(255, 255, 255, 0.2);
```

### Usage Examples

#### 1. Gradient Header
```tsx
<Box
  position="relative"
  overflow="hidden"
  borderRadius="xl"
>
  <Box
    position="absolute"
    inset={0}
    bgGradient="linear(to-b, rgba(205, 246, 131, 0.05), rgba(26, 32, 44, 0.95))"
    pointerEvents="none"
  />
  {/* Content */}
</Box>
```

#### 2. Glassmorphic Card
```tsx
<Box
  bg="rgba(205, 246, 131, 0.05)"
  borderRadius="xl"
  borderWidth="1px"
  borderColor="#CDF683"
  backdropFilter="blur(8px)"
  transition="all 0.3s"
  _hover={{
    transform: "translateY(-2px)",
    boxShadow: "0 4px 20px rgba(205, 246, 131, 0.2)"
  }}
>
  {/* Content */}
</Box>
```

#### 3. Gradient Overlay
```tsx
<Box
  position="absolute"
  inset={0}
  backdropFilter="blur(10px)"
  bg="rgba(26, 32, 44, 0.3)"
  zIndex={10}
/>
```

### Design Features

1. **Depth and Layering**
   - Multiple transparency levels
   - Blur effects for depth
   - Subtle shadows
   - Gradient overlays

2. **Interactive Elements**
   - Hover state transformations
   - Opacity transitions
   - Scale animations
   - Shadow effects

3. **Visual Hierarchy**
   - Gradient backgrounds for headers
   - Semi-transparent cards for content
   - Accent borders for emphasis
   - Consistent border radius

### Best Practices

1. **Gradient Usage**
   - Use gradients sparingly for visual hierarchy
   - Keep gradients subtle with low opacity
   - Maintain consistent direction (top to bottom)
   - Ensure text remains readable

2. **Glassmorphic Effects**
   - Apply blur effects consistently
   - Use semi-transparent backgrounds
   - Add subtle borders for definition
   - Consider backdrop-filter performance

3. **Color Application**
   - Use lime green (#CDF683) as accent
   - Keep dark background for contrast
   - Apply white with low opacity for borders
   - Maintain consistent transparency levels

4. **Accessibility**
   - Ensure sufficient contrast ratios
   - Test readability with blur effects
   - Provide fallbacks for older browsers
   - Consider reduced motion preferences
