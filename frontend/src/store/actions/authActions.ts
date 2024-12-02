import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCredentials } from '../../types';

// Mock users for testing
const MOCK_USERS = [
  {
    email: 'student@test.com',
    password: 'password123',
    role: 'student',
    fullName: 'Test Student',
    id: '1'
  },
  {
    email: 'teacher@test.com',
    password: 'password123',
    role: 'teacher',
    fullName: 'Test Teacher',
    id: '2'
  }
];

// Mock login function
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find matching user
    const mockUser = MOCK_USERS.find(user => 
      user.email === credentials.email && 
      user.password === credentials.password
    );

    if (!mockUser) {
      throw new Error('Invalid email or password');
    }

    // Check role match
    if (mockUser.role !== credentials.role) {
      throw new Error('Invalid role for this user');
    }

    // Generate mock token
    const mockToken = `mock-token-${mockUser.role}-${Date.now()}`;

    const responseData = {
      user: {
        id: mockUser.id,
        email: mockUser.email,
        fullName: mockUser.fullName,
        role: mockUser.role
      },
      token: mockToken
    };

    // Store in localStorage
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(responseData.user));
    
    return responseData;
  }
);

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
}

// Mock register function
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if email already exists
    const emailExists = MOCK_USERS.some(user => user.email === data.email);
    if (emailExists) {
      throw new Error('Email already registered');
    }

    // Create mock user
    const mockUser = {
      id: `mock-${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      role: data.role
    };

    // Generate mock token
    const mockToken = `mock-token-${data.role}-${Date.now()}`;

    const responseData = {
      user: mockUser,
      token: mockToken
    };

    // Store in localStorage
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(responseData.user));
    
    return responseData;
  }
);
