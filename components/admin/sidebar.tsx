"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useAuth } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Icons.analytics,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: Icons.team,
  },
  {
    title: 'Rewards',
    href: '/dashboard/rewards',
    icon: Icons.gift,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: Icons.analytics,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Icons.settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuth((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="w-64 border-r bg-muted/30 p-6">
      <div className="flex items-center gap-2 mb-8">
        <Icons.logo className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg">Admin Portal</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === item.href 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <Icons.logout className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
}