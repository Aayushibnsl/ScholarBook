import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar: string;
  department?: string;
  subjects?: string[];
  bio?: string;
  rating?: number;
  totalAppointments?: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  login: (role: 'student' | 'teacher' | 'admin') => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: 'student' | 'teacher' | 'admin') => {
    const userData: User = {
      id: '1',
      name: role === 'student' ? 'Alex Johnson' : role === 'teacher' ? 'Dr. Sarah Smith' : 'Admin User',
      email: role === 'student' ? 'alex.johnson@university.edu' : role === 'teacher' ? 'sarah.smith@university.edu' : 'admin@university.edu',
      role,
      avatar: role === 'student' 
        ? 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
        : role === 'teacher'
        ? 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400'
        : 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      department: role === 'student' ? 'Computer Science' : role === 'teacher' ? 'Computer Science' : 'Administration',
      bio: role === 'student' 
        ? 'Third-year computer science student passionate about machine learning and web development.'
        : role === 'teacher'
        ? 'Experienced computer science professor with expertise in software engineering and data structures.'
        : 'System administrator managing the ScholarBook platform.',
      totalAppointments: role === 'student' ? 24 : role === 'teacher' ? 156 : 0
    };
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      isLoggedIn: !!user,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}