"use client";

import { AuthenticatedHeader } from '@/components/authenticated-header';
import { useAuth } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <AuthenticatedHeader />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-6">
          {children}
        </div>
      </main>
    </div>
  );
}