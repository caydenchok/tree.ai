# TreeChat Component Design Documentation

## ⚠️ STRICT DESIGN PRESERVATION
**ABSOLUTELY NO DESIGN CHANGES ARE PERMITTED**
- No color adjustments
- No spacing modifications
- No animation changes
- No layout alterations
- No style overrides
- No new design elements
- No removal of existing design elements
- No modification to responsive behavior
- No changes to transitions or effects
- No alterations to component positioning

The current design has been carefully crafted and tested. Any deviation, no matter how small, is strictly prohibited. This includes:
- Font sizes and weights
- Padding and margins
- Border styles and colors
- Background gradients
- Shadow effects
- Hover states
- Animation timings
- Transition effects
- Component spacing
- Mobile responsiveness

## Important Notice
**This documentation is crucial for maintaining design consistency. Any modifications to TreeChat.tsx MUST follow these specifications exactly.**

## Purpose
This document serves as the single source of truth for the TreeChat component's design and structure. It was created to:
1. Preserve the exact design when refactoring large components
2. Ensure consistent styling across all child components
3. Maintain the precise user experience during code maintenance
4. Guide future developers in understanding critical design decisions

## Design Philosophy
The TreeChat component implements a minimalist, modern interface with carefully crafted animations and spacing. Every visual element, from gradients to transitions, has been intentionally designed and must be preserved.

## Overview
This document details the design and structure of the TreeChat component, ensuring consistent styling and behavior when refactoring.

## Component Structure

### Welcome Screen
```tsx
<VStack spacing={8} align="stretch" pt={8}>
  {/* Badge and Greeting */}
  <Flex 
    direction="column" 
    align="center" 
    textAlign="center"
    color="whiteAlpha.900"
  >
    <Text fontSize="xl" fontWeight="bold">
      {getGreeting()}
    </Text>
    <Text color="whiteAlpha.800" fontSize="lg">
      {getLateNightMessage()}
    </Text>
  </Flex>

  {/* QuickActions placement */}
  <Box mt={8} px={4}>
    <QuickActions />
  </Box>

  {/* Desktop Cards Layout */}
  <Box 
    display={{ base: 'none', md: 'block' }} 
    w="100%" 
    px={4}
    h="calc(100vh - 250px)"
    overflow="hidden"
  >
    <AIFeatures />
  </Box>
</VStack>
```

## Styling Guidelines

### Colors
- Background: `radial-gradient(circle at 50% 50%, rgba(205, 246, 131, 0.03), rgba(0, 0, 0, 1))`
- Text: 
  - Primary: `whiteAlpha.900`
  - Secondary: `whiteAlpha.800`
- Accent: `#CDF683`
- Border: `rgba(205, 246, 131, 0.3)`

### Spacing
- Component Spacing: `spacing={8}`
- Padding:
  - Top: `pt={8}`
  - Horizontal: `px={4}`
- Margins:
  - Top (QuickActions): `mt={8}`

### Typography
- Greeting: `fontSize="xl" fontWeight="bold"`
- Message: `fontSize="lg"`

### Layout
- Container: `maxW={{ base: "100%", md: "4xl", lg: "6xl" }}`
- Responsive:
  - Desktop Cards: `display={{ base: 'none', md: 'block' }}`
  - Height: `h="calc(100vh - 250px)"`

## Animation
```typescript
const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 50,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      delay: i * 0.1
    }
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      delay: i * 0.1
    }
  })
};
```

## Component Interactions
1. Welcome Screen → Chat Interface
   - Triggered by: QuickAction selection or message send
   - State change: `setShowWelcome(false)`

2. Chat → Welcome Screen
   - Triggered by: Back button
   - State reset: 
     ```typescript
     setShowWelcome(true);
     setSelectedMode('default');
     setMessages([]);
     setInputValue('');
     ```

## Current Status & Next Steps

### Completed Components
1. **Welcome Components:**
   - `WelcomeHeader.tsx`
   - `QuickActionGrid.tsx`
   - `AIFeatureGrid.tsx`
2. **Chat Components:**
   - `ChatHeader.tsx`
   - `MessageList.tsx`
   - `ChatInput.tsx`
   - `ChatControls.tsx`
3. **Modal Components:**
   - `SettingsModal.tsx`
   - `HelpModal.tsx`
   - `ConfirmationModal.tsx`
4. **Shared Components:**
   - `LoadingSpinner.tsx`
   - `ErrorBoundary.tsx`
   - `AnimatedContainer.tsx`

### Custom Hooks Created
1. **useChat.ts**
   - Handles message state and sending
   - *Needs update:* Add setMessages functionality
2. **useChatHistory.ts**
   - Manages chat history
   - *Needs update:* Add loadChatHistory function
3. **useChatSettings.ts**
   - Manages UI settings and modes
   - *Needs update:* Add showWelcome state
4. **useRateLimit.ts**
   - Manages rate limiting
   - Currently complete

### Next Steps
1. **Update Custom Hooks**
   - Add missing functionality to useChat.ts
   - Add loadChatHistory to useChatHistory.ts
   - Add showWelcome state to useChatSettings.ts
   - Test all hooks individually

2. **TreeChat.tsx Updates**
   - Import updated hooks
   - Replace local state with hook state
   - Remove duplicate functionality
   - Test integration with hooks

3. **Final Testing**
   - Verify all functionality works with new hooks
   - Ensure no design changes occurred
   - Test mobile responsiveness
   - Verify animations and transitions

### Important Notes
- All refactoring must maintain existing design
- No visual changes are permitted
- Functionality must remain identical
- Mobile responsiveness must be preserved

## Current Design State Snapshot

### Core Design Values
```typescript
// These values MUST remain exactly as specified
const designConstants = {
  colors: {
    background: "radial-gradient(circle at 50% 50%, rgba(205, 246, 131, 0.03), rgba(0, 0, 0, 1))",
    accent: "#CDF683",
    border: "rgba(205, 246, 131, 0.3)",
    text: {
      primary: "whiteAlpha.900",
      secondary: "whiteAlpha.800"
    }
  },
  spacing: {
    componentGap: "spacing={8}",
    padding: {
      top: "pt={8}",
      horizontal: "px={4}"
    },
    margins: {
      quickActions: "mt={8}"
    }
  },
  animations: {
    type: "spring",
    damping: 25,
    stiffness: 200,
    delayIncrement: 0.1
  },
  breakpoints: {
    desktop: "md",
    container: {
      base: "100%",
      md: "4xl",
      lg: "6xl"
    }
  }
};
```

### Visual Reference Points
Key visual elements that MUST remain unchanged:
1. Welcome Screen
   - Centered text alignment
   - Gradient background effect
   - Spacing between elements
2. Quick Actions
   - Card hover effects
   - Icon placement
   - Button dimensions
3. Chat Interface
   - Message bubbles styling
   - Input field appearance
   - Transition animations

### Mobile Design Elements
The following mobile-specific designs MUST be preserved:
- Responsive breakpoints
- Touch-friendly spacing
- Mobile navigation
- Keyboard handling
- Scroll behavior

This documentation ensures that any refactoring maintains the exact design and user experience of the original TreeChat component.

## Refactoring Progress

### Components Created (Exact Match with Original Design)

#### 1. Welcome Components (/components/tree-chat/welcome/)
- ✅ `WelcomeHeader.tsx` (~30 lines)
  - Greeting and message display
  - Exact color scheme (#CDF683)
  - Original animations
- ✅ `QuickActionGrid.tsx` (~45 lines)
  - Grid layout for quick actions
  - Original hover effects
- ✅ `AIFeatureGrid.tsx` (~40 lines)
  - Feature cards display
  - Original animations and transitions
- ✅ `index.ts` - Exports all welcome components

#### 2. Chat Components (/components/tree-chat/chat/)
- ✅ `ChatHeader.tsx` (~35 lines)
  - Back button and header
  - Original styling preserved
- ✅ `MessageList.tsx` (~100 lines)
  - Message display with animations
  - Original message bubbles design
- ✅ `ChatInput.tsx` (~80 lines)
  - Input field and send button
  - Original blur effects
- ✅ `ChatControls.tsx` (~70 lines)
  - Stop, regenerate, and clear buttons
  - Original button styles
- ✅ `index.ts` - Exports all chat components

#### 3. Modal Components (/components/tree-chat/modals/)
- ✅ `SettingsModal.tsx` (~70 lines)
  - Settings configuration
  - Original modal styling
- ✅ `HelpModal.tsx` (~80 lines)
  - Help and tips display
  - Original card design
- ✅ `ConfirmationModal.tsx` (~80 lines)
  - Confirmation dialogs
  - Original alert styling
- ✅ `index.ts` - Exports all modal components

#### 4. Shared Components (/components/tree-chat/shared/)
- ✅ `LoadingSpinner.tsx` (~25 lines)
  - Custom loading animation
- ✅ `ErrorBoundary.tsx` (~70 lines)
  - Error handling
- ✅ `AnimatedContainer.tsx` (~50 lines)
  - Reusable animation wrapper
- ✅ `index.ts` - Exports all shared components

#### 5. State Management Hooks (/hooks/)
- ✅ `useChat.ts` (~80 lines)
  - Message handling
  - Send message logic
  - Loading states
  - Welcome screen toggle
- ✅ `useRateLimit.ts` (~70 lines)
  - Rate limiting logic
  - Timer management
  - Toast notifications
- ✅ `useChatHistory.ts` (~90 lines)
  - Recent chats
  - Saved messages
  - History loading
- ✅ `useChatSettings.ts` (~70 lines)
  - Mode selection
  - Sidebar state
  - Mobile overlay
  - Time-based greetings

### Next Steps

1. **TreeChat.tsx Cleanup**
   - Remove extracted component code
   - Import new components
   - Replace state with hooks
   - Maintain exact functionality

2. **Final Testing**
   - Verify all animations
   - Test color schemes
   - Check interactions
   - Test mobile responsiveness

### Important Notes

- ⚠️ NO design changes made
- ⚠️ All components maintain exact styling
- ⚠️ All animations preserved
- ⚠️ All functionality identical
- ⚠️ Only code organization changed

### Code to Remove from TreeChat.tsx

```typescript
// 1. State Declarations
const [messages, setMessages] = useState<Message[]>([]);
const [inputValue, setInputValue] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [isRateLimited, setIsRateLimited] = useState(false);
const [rateLimitEndTime, setRateLimitEndTime] = useState<Date | null>(null);
const [showWelcome, setShowWelcome] = useState(true);
const [showMobileOverlay, setShowMobileOverlay] = useState(false);
const [selectedMode, setSelectedMode] = useState('default');
const [selectedMessage, setSelectedMessage] = useState<string>("");
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// 2. Utility Functions
const handleSendMessage = async () => { ... }
const handleRateLimit = useCallback(() => { ... }
const formatTimeRemaining = (endTime: Date) => { ... }
const getGreeting = () => { ... }
const getLateNightMessage = () => { ... }

// 3. Effect Hooks
useEffect(() => { ... }, [messages]); // Scroll effect
useEffect(() => { ... }, [rateLimitEndTime]); // Rate limit effect
useEffect(() => { ... }, [toast]); // Chat history effect
```

### Code to Add to TreeChat.tsx

```typescript
// 1. Import Hooks
import { useChat } from '../hooks/useChat';
import { useRateLimit } from '../hooks/useRateLimit';
import { useChatHistory } from '../hooks/useChatHistory';
import { useChatSettings } from '../hooks/useChatSettings';

// 2. Use Hooks in Component
const {
  messages,
  inputValue,
  isLoading,
  showWelcome,
  handleSendMessage,
  setInputValue,
  handleBackToHome,
} = useChat();

const {
  isRateLimited,
  rateLimitEndTime,
  handleRateLimit,
  formatTimeRemaining,
} = useRateLimit();

const {
  recentChats,
  savedMessages,
  handleSaveMessage,
  loadChatHistory,
} = useChatHistory();

const {
  selectedMode,
  isSidebarOpen,
  showMobileOverlay,
  activeTab,
  getGreeting,
  getLateNightMessage,
  setSelectedMode,
  setIsSidebarOpen,
  setShowMobileOverlay,
  setActiveTab,
} = useChatSettings();
```

## Recommended Component Breakdown
To maintain manageable file sizes while preserving exact design, break down TreeChat.tsx (~860 lines) into these specific components:

### 1. Welcome Components (150-200 lines total)
```typescript
/components/tree-chat/welcome/
├── WelcomeHeader.tsx (~50 lines)
│   // Contains greeting and late night message
├── QuickActionGrid.tsx (~50 lines)
│   // Grid layout for quick actions
└── AIFeatureGrid.tsx (~50 lines)
    // Grid layout for AI features
```

### 2. Chat Components (250-300 lines total)
```typescript
/components/tree-chat/chat/
├── ChatHeader.tsx (~50 lines)
│   // Chat interface header
├── MessageList.tsx (~100 lines)
│   // Message display and animations
├── ChatInput.tsx (~50 lines)
│   // Input field and send button
└── ChatControls.tsx (~50 lines)
    // Additional chat controls
```

### 3. Modal Components (150-200 lines total)
```typescript
/components/tree-chat/modals/
├── HistoryModal.tsx (~75 lines)
│   // Chat history modal
└── SettingsModal.tsx (~75 lines)
    // Settings modal
```

### 4. Shared Components (100-150 lines total)
```typescript
/components/tree-chat/shared/
├── AnimatedCard.tsx (~50 lines)
│   // Reusable animated card
└── BackgroundEffects.tsx (~50 lines)
    // Background gradients and effects
```

### 5. State Management (150-200 lines total)
```typescript
/hooks/tree-chat/
├── useChatState.ts (~50 lines)
│   // Chat-related state
├── useMessageHandling.ts (~50 lines)
│   // Message operations
└── useTimeBasedUI.ts (~50 lines)
    // Time-based UI elements
```

### Size Guidelines
Each component should follow these size limits:
- Presentational Components: 50-75 lines
- Container Components: 75-100 lines
- Custom Hooks: 50-75 lines
- Utility Functions: 25-50 lines

### Component Integration Rules
When breaking down components:
1. Each component must maintain its exact current styling
2. Props must preserve all current functionality
3. Animations must remain synchronized
4. State management must stay consistent
5. No design changes are allowed

This breakdown ensures manageable file sizes while strictly preserving the current design.
