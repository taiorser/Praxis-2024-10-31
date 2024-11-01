"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import type { User, Company } from '@/lib/types';

interface AuthState {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, companyId: string) => Promise<boolean>;
  logout: () => void;
  updateCompanyBranding: (branding: Company['branding']) => void;
}

const DEMO_COMPANIES: Record<string, Company> = {
  '1': {
    id: '1',
    name: 'Demo Company',
    domain: 'demo.com',
    branding: {
      siteName: 'Praxis',
      colors: {
        primary: '#000000',
        background: '#ffffff',
        text: '#000000'
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  '2': {
    id: '2',
    name: 'Acme Corp',
    domain: 'acme.com',
    branding: {
      siteName: 'Acme Rewards',
      colors: {
        primary: '#2563eb',
        background: '#ffffff',
        text: '#000000'
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

const DEMO_USERS: Record<string, Record<string, User>> = {
  '1': {
    'admin@praxis.com': {
      id: '1',
      name: 'Demo Admin',
      email: 'admin@praxis.com',
      role: 'ADMIN',
      points: 2450,
      department: 'Management',
      title: 'System Administrator',
      location: 'San Francisco, CA',
      timezone: 'PST',
      companyId: '1'
    },
    'manager@praxis.com': {
      id: '2',
      name: 'John Manager',
      email: 'manager@praxis.com',
      role: 'MANAGER',
      points: 2100,
      department: 'Sales',
      title: 'Sales Manager',
      location: 'New York, NY',
      timezone: 'EST',
      companyId: '1'
    },
    'employee@praxis.com': {
      id: '3',
      name: 'Sarah Chen',
      email: 'employee@praxis.com',
      role: 'EMPLOYEE',
      points: 1850,
      department: 'Marketing',
      title: 'Marketing Specialist',
      location: 'Chicago, IL',
      timezone: 'CST',
      companyId: '1'
    }
  },
  '2': {
    'admin@acme.com': {
      id: '4',
      name: 'Acme Admin',
      email: 'admin@acme.com',
      role: 'ADMIN',
      points: 3200,
      department: 'Management',
      title: 'System Administrator',
      location: 'Los Angeles, CA',
      timezone: 'PST',
      companyId: '2'
    }
  }
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      company: null,
      isAuthenticated: false,
      login: async (email: string, password: string, companyId: string) => {
        // Validate company exists
        const company = DEMO_COMPANIES[companyId];
        if (!company) return false;

        // Check if user exists in the company
        const companyUsers = DEMO_USERS[companyId];
        if (!companyUsers) return false;

        const user = companyUsers[email];
        if (!user || password !== 'demo123') return false;

        set({ user, company, isAuthenticated: true });
        Cookies.set('auth', JSON.stringify({ user, company }));
        return true;
      },
      logout: () => {
        set({ user: null, company: null, isAuthenticated: false });
        Cookies.remove('auth');
      },
      updateCompanyBranding: (branding) => {
        set((state) => ({
          company: state.company ? {
            ...state.company,
            branding: {
              ...state.company.branding,
              ...branding
            }
          } : null
        }));
      },
    }),
    {
      name: 'auth-storage',
      skipHydration: true,
    }
  )
);