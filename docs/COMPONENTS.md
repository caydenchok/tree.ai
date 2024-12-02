# TREE8 GLOBAL Component Documentation

## Core Components

### TeacherDashboard
The main dashboard component for teachers, providing an overview of their teaching activities and student management.

```typescript
interface TeacherDashboardProps {
  user: User;
  students: Student[];
  schedule: Event[];
  stats: Statistics;
}
```

#### Features
- Quick stats overview
- Student list management
- Schedule visualization
- AI Teaching Assistant integration

### TeacherSidebar
Navigation component providing access to different sections of the teacher dashboard.

```typescript
interface TeacherSidebarProps {
  user: User;
  activeRoute: string;
  onRouteChange: (route: string) => void;
}
```

#### Features
- Collapsible sidebar
- Dynamic route highlighting
- User profile section
- Quick navigation links

### AITeachingAssistant
AI-powered teaching assistant component with chat interface and teaching tools.

```typescript
interface AITeachingAssistantProps {
  user: User;
  onMessageSend: (message: string) => void;
  onToolSelect: (tool: Tool) => void;
}
```

#### Features
- Modern chat interface
- File attachments
- Voice input
- Teaching tools integration

### StudentList
Component for displaying and managing student information.

```typescript
interface StudentListProps {
  students: Student[];
  onStudentSelect: (student: Student) => void;
  onStatusChange: (studentId: string, status: Status) => void;
}
```

#### Features
- Student profiles
- Status management
- Performance tracking
- Quick actions

### ScheduleCalendar
Calendar component for managing teaching schedule and events.

```typescript
interface ScheduleCalendarProps {
  events: Event[];
  onEventAdd: (event: Event) => void;
  onEventUpdate: (event: Event) => void;
  onEventDelete: (eventId: string) => void;
}
```

#### Features
- Weekly/monthly views
- Event management
- Drag-and-drop support
- Recurring events

## UI Components

### StatsCard
Reusable component for displaying statistics.

```typescript
interface StatsCardProps {
  title: string;
  value: number | string;
  icon: IconType;
  change?: number;
  timeframe?: string;
}
```

### MessageBubble
Chat message component for the AI Teaching Assistant.

```typescript
interface MessageBubbleProps {
  message: Message;
  isAI: boolean;
  timestamp: Date;
  actions?: MessageAction[];
}
```

### ToolButton
Button component for AI teaching tools.

```typescript
interface ToolButtonProps {
  tool: Tool;
  isActive: boolean;
  onClick: (tool: Tool) => void;
  icon: IconType;
}
```

### FileUpload
Component for handling file attachments.

```typescript
interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes: string[];
  maxSize: number;
  multiple?: boolean;
}
```

### VoiceInput
Component for voice input functionality.

```typescript
interface VoiceInputProps {
  onRecordStart: () => void;
  onRecordStop: (audio: Blob) => void;
  isRecording: boolean;
}
```

## Layout Components

### PageLayout
Base layout component for all pages.

```typescript
interface PageLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}
```

### Modal
Reusable modal component.

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}
```

### Drawer
Sliding drawer component for the AI Teaching Assistant.

```typescript
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement: 'left' | 'right';
  children: ReactNode;
}
```

## Form Components

### SearchInput
Advanced search input component.

```typescript
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  filters?: Filter[];
}
```

### FilterSelect
Component for applying filters.

```typescript
interface FilterSelectProps {
  options: Option[];
  selected: Option[];
  onChange: (selected: Option[]) => void;
  isMulti?: boolean;
}
```

## Utility Components

### LoadingSpinner
Loading indicator component.

```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  thickness?: number;
}
```

### ErrorBoundary
Error handling component.

```typescript
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  onError?: (error: Error) => void;
}
```

### Toast
Notification component.

```typescript
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}
```
