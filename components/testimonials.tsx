"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'HR Director',
    company: 'TechCorp Solutions',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop',
    quote: 'Praxis transformed our company culture. Employee engagement increased by 47% within just three months of implementation.',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CEO',
    company: 'InnovateLabs',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop',
    quote: 'The gamification elements have made recognition fun and meaningful. Our team loves the reward marketplace and competitive challenges.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'People Operations Manager',
    company: 'GrowthWorks Inc',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop',
    quote: 'The analytics dashboard provides invaluable insights into our team\'s engagement. It\'s become an essential tool for our retention strategy.',
    rating: 5,
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about their experience with Praxis
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative"
              >
                <Card className="p-8">
                  <div className="absolute -top-4 -left-4">
                    <Quote className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-shrink-0">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                        />
                        <AvatarFallback>
                          {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-lg mb-4 italic">
                        "{testimonials[activeIndex].quote}"
                      </p>
                      
                      <div>
                        <p className="font-semibold">
                          {testimonials[activeIndex].name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                        </p>
                        <div className="flex gap-1 mt-2">
                          {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-primary text-primary"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}