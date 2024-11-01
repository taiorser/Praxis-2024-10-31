"use client";

import { useAuth } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Role = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
  redirectTo?: string;
}

export function RoleGuard({ children, allowedRoles, redirectTo = '/dashboard' }: RoleGuardProps) {
  const router = useRouter();
  const user = useAuth((state) => state.user);

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.push(redirectTo);
    }
  }, [user, allowedRoles, redirectTo, router]);

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}