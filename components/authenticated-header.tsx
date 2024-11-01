"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth-store';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Icons } from '@/components/icons';

const mainNavItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Training', href: '/dashboard/training' },
  { label: 'Rewards', href: '/dashboard/rewards' },
  { label: 'Leaderboard', href: '/dashboard/leaderboard' },
  { label: 'Team', href: '/dashboard/team' },
];

const adminNavItems = [
  { label: 'Users', href: '/dashboard/users' },
  { label: 'Analytics', href: '/dashboard/analytics' },
  { label: 'Settings', href: '/dashboard/settings' },
  { label: 'Manage Rewards', href: '/admin/rewards' },
];

export function AuthenticatedHeader() {
  const pathname = usePathname();
  const { user, company, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const isAdmin = user?.role === 'ADMIN';

  if (!user || !company) return null;

  const brandingStyles = {
    '--primary': company.branding.colors.primary,
    '--background': company.branding.colors.background,
    '--foreground': company.branding.colors.text,
  } as React.CSSProperties;

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={brandingStyles}
    >
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              {company.branding.logo ? (
                <img 
                  src={company.branding.logo} 
                  alt={company.name} 
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <Trophy className="h-6 w-6 text-primary" />
              )}
              <span className="font-bold text-xl">{company.branding.siteName || company.name}</span>
            </Link>

            <nav>
              <ul className="flex items-center gap-6">
                {mainNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {isAdmin && (
                  <li>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-1">
                          Admin
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuGroup>
                          {adminNavItems.map((item) => (
                            <DropdownMenuItem key={item.href} asChild>
                              <Link href={item.href}>{item.label}</Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-muted rounded-full">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="font-medium">{user.points || 0} pts</span>
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Icons.sun className="h-5 w-5" />
              ) : (
                <Icons.moon className="h-5 w-5" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt={user.name || ''} />
                    <AvatarFallback>
                      {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 cursor-pointer"
                  onClick={() => logout()}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}