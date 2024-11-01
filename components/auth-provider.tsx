"use client";

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  useEffect(() => {
    // Initialize auth state from cookie on mount
    const authCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth='));
    
    if (authCookie && !user) {
      try {
        const authData = JSON.parse(decodeURIComponent(authCookie.split('=')[1]));
        useAuth.setState({ user: authData, isAuthenticated: true });
      } catch (error) {
        console.error('Failed to parse auth cookie:', error);
      }
    }
  }, [user]);

  return <>{children}</>;
}