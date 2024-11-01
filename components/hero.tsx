"use client";

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted mb-8">
            <Star className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium">
              Trusted by 1000+ companies worldwide
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Transform Your Workplace with{' '}
            <span className="text-primary">Gamified Recognition</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Boost employee engagement, productivity, and retention through an innovative platform that makes workplace recognition fun and rewarding.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">Request Demo</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: '98%',
                description: 'Employee satisfaction rate',
              },
              {
                icon: Users,
                title: '250K+',
                description: 'Active users worldwide',
              },
              {
                icon: Star,
                title: '45%',
                description: 'Increase in engagement',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 rounded-lg bg-card/50 backdrop-blur-sm"
              >
                <stat.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-3xl font-bold mb-2">{stat.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}