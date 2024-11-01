export interface Company {
  id: string;
  name: string;
  domain: string;
  branding: {
    logo?: string;
    siteName: string;
    colors: {
      primary: string;
      background: string;
      text: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
  points: number;
  department?: string;
  image?: string;
  title?: string;
  location?: string;
  bio?: string;
  timezone?: string;
  companyId: string;
}

export interface Session {
  user: User | null;
  company: Company | null;
}