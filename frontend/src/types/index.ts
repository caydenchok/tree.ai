// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  profile: UserProfile;
}

export interface UserProfile {
  fullName: string;
  language: string;
  avatar?: string;
}

// Authentication Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
}

// Education Types
export interface Course {
  id: string;
  title: string;
  description: string;
  curriculum: 'KSSR' | 'KSSM';
  subject: string;
  language: string;
  level: string;
}

// Dashboard Types
export interface DashboardData {
  courses: Course[];
  announcements: Announcement[];
  upcomingTasks: Task[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  type: 'assignment' | 'quiz' | 'exam';
  status: 'pending' | 'completed';
}
