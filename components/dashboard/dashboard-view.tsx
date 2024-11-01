"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Users, Gift, TrendingUp, Medal, Flame } from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';
import { ActivityChart } from '@/components/dashboard/activity-chart';
import { PointsCounter } from '@/components/dashboard/points-counter';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth-store';

export function DashboardView() {
  const { user } = useAuth();
  const [points, setPoints] = useState(user?.points || 0);
  const [level, setLevel] = useState(12);
  const levelProgress = 75;
  const { toast } = useToast();

  const earnPoints = () => {
    const earnedPoints = Math.floor(Math.random() * 50) + 10;
    setPoints(prev => prev + earnedPoints);
    
    toast({
      title: "Challenge Completed!",
      description: `You've earned ${earnedPoints} points for completing the daily challenge.`,
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 rounded-lg"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">Level {level} Achievement Hunter</p>
          </div>
          <div className="text-right">
            <PointsCounter initialPoints={user?.points || 0} newPoints={points} />
            <div className="text-sm text-muted-foreground">
              Next level: {5000 - points} points needed
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={levelProgress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>Level {level}</span>
            <span>Level {level + 1}</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: Flame,
            label: "Daily Streak",
            value: "15 Days",
            badge: "+2 days",
          },
          {
            icon: Star,
            label: "Team Rank",
            value: "#2",
            badge: "Top 5%",
          },
          {
            icon: Medal,
            label: "Achievements",
            value: "28/50",
            badge: "+3 new",
          },
          {
            icon: Trophy,
            label: "Team Points",
            value: "12,450",
            badge: "+1,200",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                    {stat.badge}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mb-8">
        <ActivityChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Recent Achievements</h2>
          <div className="space-y-4">
            {[
              { title: "Team Player of the Month", points: 500 },
              { title: "100% Goals Achieved", points: 300 },
              { title: "5 Star Customer Rating", points: 250 },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span>{achievement.title}</span>
                </div>
                <span className="text-sm font-medium">+{achievement.points} pts</span>
              </motion.div>
            ))}
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/dashboard/achievements">
                View All Achievements
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Team Leaderboard</h2>
          <div className="space-y-4">
            {[
              { team: "Marketing", points: 3250, rank: 1 },
              { team: "Sales", points: 3120, rank: 2 },
              { team: "Development", points: 2980, rank: 3 },
            ].map((team, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">#{team.rank}</span>
                  <span>{team.team}</span>
                </div>
                <span className="font-medium">{team.points}</span>
              </motion.div>
            ))}
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/dashboard/leaderboard">
                View Full Leaderboard
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Available Rewards</h2>
          <div className="space-y-4">
            {[
              { title: "Extra Day Off", points: 5000 },
              { title: "$100 Gift Card", points: 2500 },
              { title: "Team Lunch", points: 1000 },
            ].map((reward, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Gift className="h-4 w-4 text-primary" />
                  <span>{reward.title}</span>
                </div>
                <span className="text-sm font-medium">{reward.points} pts</span>
              </motion.div>
            ))}
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/dashboard/rewards">
                Browse Rewards
              </Link>
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Button onClick={earnPoints} variant="default">
          Complete Daily Challenge
        </Button>
      </div>
    </div>
  );
}