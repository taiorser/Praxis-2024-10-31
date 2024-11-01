import { cookies } from "next/headers";
import type { Session, User, Company } from "@/lib/types";

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
      companyId: '2'
    }
  }
};

export async function getSession(): Promise<Session | null> {
  if (typeof window !== 'undefined') {
    const cookieStore = cookies();
    const authCookie = cookieStore.get("auth");
    
    if (!authCookie) {
      return null;
    }

    try {
      const { user, company } = JSON.parse(authCookie.value);
      return { user, company };
    } catch (error) {
      return null;
    }
  }
  return null;
}