"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import dynamic from 'next/dynamic';

const LineChart = dynamic(
  () => import('recharts').then(mod => mod.LineChart),
  { ssr: false }
);
const Line = dynamic(
  () => import('recharts').then(mod => mod.Line),
  { ssr: false }
);
const XAxis = dynamic(
  () => import('recharts').then(mod => mod.XAxis),
  { ssr: false }
);
const YAxis = dynamic(
  () => import('recharts').then(mod => mod.YAxis),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import('recharts').then(mod => mod.Tooltip),
  { ssr: false }
);
const ResponsiveContainer = dynamic(
  () => import('recharts').then(mod => mod.ResponsiveContainer),
  { ssr: false }
);

interface ActivityData {
  date: string;
  points: number;
  rewards: number;
}

const generateDemoData = (days: number): ActivityData[] => {
  return Array.from({ length: days }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      points: Math.floor(Math.random() * 500) + 100,
      rewards: Math.floor(Math.random() * 10),
    };
  });
};

export function ActivityChart() {
  const [data, setData] = useState<ActivityData[]>(generateDemoData(7));
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('7d');
  const [isAnimating, setIsAnimating] = useState(false);

  const updateTimeframe = (newTimeframe: '7d' | '30d' | '90d') => {
    setIsAnimating(true);
    setTimeframe(newTimeframe);
    setData(generateDemoData(parseInt(newTimeframe)));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev];
        const lastEntry = newData[newData.length - 1];
        newData[newData.length - 1] = {
          ...lastEntry,
          points: lastEntry.points + Math.floor(Math.random() * 50),
          rewards: lastEntry.rewards + (Math.random() > 0.7 ? 1 : 0),
        };
        return newData;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Activity Overview</h3>
        <div className="flex items-center gap-2">
          <Button
            variant={timeframe === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateTimeframe('7d')}
          >
            7D
          </Button>
          <Button
            variant={timeframe === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateTimeframe('30d')}
          >
            30D
          </Button>
          <Button
            variant={timeframe === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateTimeframe('90d')}
          >
            90D
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={timeframe}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border rounded-lg shadow-lg p-3">
                        <p className="font-medium">{label}</p>
                        <p className="text-primary">
                          Points: {payload[0].value}
                        </p>
                        <p className="text-blue-500">
                          Rewards: {payload[1].value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="points"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="rewards"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Points</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Rewards</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>Updated in real-time</span>
        </div>
      </div>
    </Card>
  );
}