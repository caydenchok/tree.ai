# TREE8 GLOBAL Design System

## Brand Colors
- **Primary**: `#CDF683` (Lime Green)
- **Secondary**: `#4ECDC4` (Turquoise)
- **Dark**: 
  - Primary: `#1A202C`
  - Secondary: `#2D3748`
- **Accent**: `#CDF683` (Lime Green)
- **Text**:
  - Primary: `#FFFFFF`
  - Secondary: `#E2E8F0`
  - Muted: `rgba(255, 255, 255, 0.6)`

## Typography
### Fonts
- **Primary**: Inter
- **Secondary**: System UI
- **Monospace**: Consolas (for code)

### Font Sizes
- **xs**: 0.75rem
- **sm**: 0.875rem
- **md**: 1rem
- **lg**: 1.125rem
- **xl**: 1.25rem
- **2xl**: 1.5rem
- **3xl**: 1.875rem
- **4xl**: 2.25rem

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

## Components

### Buttons
```css
/* Primary Button */
background: #CDF683;
color: black;
border-radius: 0.75rem;
padding: 0.5rem 1rem;
font-weight: 500;
transition: all 0.3s ease;

/* Ghost Button */
background: transparent;
color: #E2E8F0;
border: 1px solid rgba(255, 255, 255, 0.2);
_hover: {
  background: rgba(255, 255, 255, 0.1);
  color: #CDF683;
}
```

### Cards
```css
/* Standard Card */
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 1rem;
backdrop-filter: blur(8px);

/* Gradient Card */
background: linear-gradient(to bottom right, rgba(205, 246, 131, 0.05), rgba(26, 32, 44, 0.95));
```

### Calendar
```css
/* Calendar Container */
--fc-border-color: rgba(205, 246, 131, 0.2);
--fc-button-text-color: #E2E8F0;
--fc-button-bg-color: rgba(205, 246, 131, 0.15);
--fc-button-border-color: rgba(205, 246, 131, 0.2);
--fc-button-hover-bg-color: rgba(205, 246, 131, 0.3);
--fc-today-bg-color: rgba(205, 246, 131, 0.1);

/* Calendar Header */
.fc-col-header-cell-cushion {
  color: #CDF683;
  font-weight: 600;
}

/* Calendar Dates */
.fc-daygrid-day-number {
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
}

/* Today's Date */
.fc-day-today .fc-daygrid-day-number {
  background: #CDF683;
  color: black;
  font-weight: bold;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(205, 246, 131, 0.3);
}
```

### Inputs
```css
/* Text Input */
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 0.75rem;
color: white;
_focus: {
  border-color: #CDF683;
  box-shadow: 0 0 0 1px #CDF683;
}

/* Textarea */
background: transparent;
border: none;
color: white;
_focus: {
  border: none;
  box-shadow: none;
}
```

### Navigation
```css
/* Sidebar */
background: rgba(26, 32, 44, 0.95);
border-right: 1px solid rgba(255, 255, 255, 0.1);
backdrop-filter: blur(8px);

/* Nav Item */
padding: 0.75rem 1rem;
border-radius: 0.75rem;
color: #E2E8F0;
_hover: {
  background: rgba(255, 255, 255, 0.1);
  color: #CDF683;
}

/* Active Nav Item */
background: rgba(205, 246, 131, 0.1);
color: #CDF683;
```

### Modals & Drawers
```css
/* Overlay */
backdrop-filter: blur(12px);
background: rgba(26, 32, 44, 0.3);

/* Content */
background: #1A202C;
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 1rem;
```

### Animations
```css
/* Hover Transform */
transform: translateY(-2px);
transition: all 0.3s ease;

/* Fade In */
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.3 }

/* Pulse */
@keyframes pulse {
  0%, 100% { opacity: 0.4 }
  50% { opacity: 1 }
}

/* Background Node Movement */
speed-range: 0.02-0.07;
angle-increment: 0.002;
position-change: 0.2;
transition: all 0.3s ease;
```

## Layout

### Spacing
- **xs**: 0.25rem
- **sm**: 0.5rem
- **md**: 1rem
- **lg**: 1.5rem
- **xl**: 2rem
- **2xl**: 3rem

### Breakpoints
- **sm**: 30em (480px)
- **md**: 48em (768px)
- **lg**: 62em (992px)
- **xl**: 80em (1280px)
- **2xl**: 96em (1536px)

### Grid
- **Container Max Width**: 1280px
- **Gap**: 1rem
- **Column Count**: 12

### Z-Index
- **Base**: 0
- **Dropdown**: 1000
- **Sticky**: 1100
- **Fixed**: 1200
- **Modal Backdrop**: 1300
- **Modal**: 1400
- **Popover**: 1500
- **Tooltip**: 1600
