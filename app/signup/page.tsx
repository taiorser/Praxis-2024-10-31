"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="flex flex-col space-y-2 text-center">
          <Link href="/" className="mx-auto">
            <div className="flex items-center gap-2">
              <Icons.logo className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">Praxis</span>
            </div>
          </Link>
          <h1 className="text-xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to get started
          </p>
        </div>

        <Card className="border-0 shadow-none">
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-3 px-0">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Acme Inc."
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 px-0 pt-2">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Account
              </Button>
              <Button variant="outline" className="w-full">
                <Icons.google className="mr-2 h-4 w-4" />
                Sign up with Google
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center text-sm">
          <Link 
            href="/login" 
            className="text-muted-foreground hover:text-primary underline underline-offset-4"
          >
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}