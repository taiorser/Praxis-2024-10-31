"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Trophy,
  Users,
  BarChart,
  Gift,
  Target,
  Gamepad2,
  Medal,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    icon: Trophy,
    title: 'Recognition Engine',
    description: 'Peer-to-peer recognition system with customizable rewards and achievements.',
    details: [
      'Real-time recognition feed',
      'Custom badges and achievements',
      'Point-based rewards system',
      'Recognition analytics',
    ],
  },
  {
    icon: Gamepad2,
    title: 'Interactive Training',
    description: 'Gamified learning experiences that make professional development engaging.',
    details: [
      'Interactive quizzes and challenges',
      'Skill-based progression system',
      'Team-based learning competitions',
      'Personalized learning paths',
    ],
  },
  {
    icon: Medal,
    title: 'Leaderboards',
    description: 'Dynamic leaderboards that drive healthy competition and engagement.',
    details: [
      'Department rankings',
      'Individual achievements',
      'Team performance metrics',
      'Custom competition periods',
    ],
  },
  {
    icon: Gift,
    title: 'Reward Marketplace',
    description: 'Extensive marketplace where employees can redeem points for meaningful rewards.',
    details: [
      'Gift cards and experiences',
      'Custom company rewards',
      'Charitable donations',
      'Time-off rewards',
    ],
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Set and track individual and team goals with real-time progress monitoring.',
    details: [
      'OKR integration',
      'Visual progress tracking',
      'Goal-based rewards',
      'Performance insights',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics to measure engagement and recognition patterns.',
    details: [
      'Engagement metrics',
      'Recognition patterns',
      'ROI calculations',
      'Trend analysis',
    ],
  },
];

export function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Build a
            <span className="text-primary"> Thriving Workplace Culture</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform combines recognition, gamification, and analytics
            to create an engaging employee experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeFeature === index
                    ? 'ring-2 ring-primary shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Sparkles className="h-4 w-4 text-primary mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                {activeFeature === index && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-primary" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
