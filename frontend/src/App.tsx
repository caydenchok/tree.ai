import * as React from 'react';
import { Box, Text, Flex, Icon } from '@chakra-ui/react';
import { FaBrain } from 'react-icons/fa';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SidebarProvider } from './contexts/SidebarContext';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const TreeChat = React.lazy(() => import('./pages/TreeChat'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const StudentDashboard = React.lazy(() => import('./pages/StudentDashboard'));
const StudentCourses = React.lazy(() => import('./pages/StudentCourses'));
const StudentSchedule = React.lazy(() => import('./pages/StudentSchedule'));
const StudentProgress = React.lazy(() => import('./pages/StudentProgress'));
const StudentMessages = React.lazy(() => import('./pages/StudentMessages'));
const StudentAIAssistant = React.lazy(() => import('./pages/StudentAIAssistant'));
const StudentProfile = React.lazy(() => import('./pages/StudentProfile'));
const StudentHomeworks = React.lazy(() => import('./pages/StudentHomeworks'));
const StudentSettings = React.lazy(() => import('./pages/StudentSettings'));
const TeacherDashboard = React.lazy(() => import('./pages/TeacherDashboard'));
const TeacherStudents = React.lazy(() => import('./pages/TeacherStudents'));
const TeacherClasses = React.lazy(() => import('./pages/TeacherClasses'));
const TeacherAnalytics = React.lazy(() => import('./pages/TeacherAnalytics'));
const TeacherMessage = React.lazy(() => import('./pages/TeacherMessage'));
const TeacherAIAssistant = React.lazy(() => import('./pages/TeacherAIAssistant'));
const TeacherSettings = React.lazy(() => import('./pages/TeacherSettings'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const ParentDashboard = React.lazy(() => import('./pages/ParentDashboard'));

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <LandingPage />
      </React.Suspense>
    ),
  },
  {
    path: "/tree-chat",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <TreeChat />
      </React.Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <Login />
      </React.Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <Register />
      </React.Suspense>
    ),
  },
  // Student Routes
  {
    path: "/dashboard/student",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/student/courses",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['student']}>
          <StudentCourses />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/student/schedule",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['student']}>
          <StudentSchedule />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/student/progress",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['student']}>
          <StudentProgress />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/student/messages",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['student']}>
          <StudentMessages />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/student/ai-assistant",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['student']}>
          <StudentAIAssistant />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/student/profile",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['student']}>
          <StudentProfile />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/student/homeworks",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['student']}>
          <StudentHomeworks />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/student/settings",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['student']}>
          <StudentSettings />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  // Teacher Routes
  {
    path: "/dashboard/teacher",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherDashboard />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/teacher/students",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherStudents />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/teacher/classes",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherClasses />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/teacher/analytics",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherAnalytics />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/teacher/messages",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherMessage />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/teacher/ai-assistant",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherAIAssistant />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/teacher/settings",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherSettings />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/admin/*",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard/parent/*",
    element: (
      <React.Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute allowedRoles={['parent']}>
          <ParentDashboard />
        </ProtectedRoute>
      </React.Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
],
{
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
  basename: "/",
}
);

// Optimize page loading
const LoadingFallback = () => (
  <Box
    minH="100vh"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    bg="brand.dark.primary"
    color="brand.primary"
    style={{ willChange: 'opacity' }}
  >
    <Flex
      alignItems="center"
      gap={3}
      mb={4}
      bgGradient="linear(to-r, #CDF683, #B5E853)"
      bgClip="text"
      fontSize="2xl"
      fontWeight="bold"
      animation="pulse 2s infinite"
    >
      <Icon as={FaBrain} boxSize={8} />
      <Text>Tree.AI</Text>
    </Flex>
    <Box
      w="200px"
      h="2px"
      bgGradient="linear(to-r, #CDF683, #B5E853)"
      opacity={0.3}
      animation="loadingBar 2s infinite"
    />
    <style>
      {`
        @keyframes pulse {
          0% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.6; transform: scale(1); }
        }
        @keyframes loadingBar {
          0% { transform: scaleX(0); opacity: 0.1; }
          50% { transform: scaleX(1); opacity: 0.3; }
          100% { transform: scaleX(0); opacity: 0.1; }
        }
      `}
    </style>
  </Box>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SidebarProvider>
          <React.Suspense fallback={<LoadingFallback />}>
            <RouterProvider router={router} />
          </React.Suspense>
        </SidebarProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;