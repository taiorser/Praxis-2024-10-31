"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy | typeof Star | typeof Target | typeof Flame;
  progress: number;
  total: number;
  unlockedAt?: string;
  rarity: Rarity;
}

const achievements: Achievement[] = [
  {
    id: '1',
    name: 'Team Player',
    description: 'Collaborate with team members',
    icon: Trophy,
    progress: 8,
    total: 10,
    rarity: 'common',
  },
  {
    id: '2',
    name: 'Goal Crusher',
    description: 'Complete personal goals',
    icon: Target,
    progress: 5,
    total: 5,
    unlockedAt: '2024-03-15',
    rarity: 'rare',
  },
  {
    id: '3',
    name: 'Innovation Star',
    description: 'Submit innovative ideas',
    icon: Star,
    progress: 3,
    total: 5,
    rarity: 'epic',
  },
  {
    id: '4',
    name: 'Perfect Streak',
    description: 'Maintain a 30-day activity streak',
    icon: Flame,
    progress: 15,
    total: 30,
    rarity: 'legendary',
  },
];

const rarityColors: Record<Rarity, string> = {
  common: "bg-slate-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-amber-500",
};

export default function AchievementsPage() {
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredAchievements = achievements.filter(achievement => {
    if (selectedTab === "unlocked") return achievement.progress >= achievement.total;
    if (selectedTab === "in-progress") return achievement.progress < achievement.total;
    return true;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Achievements</h1>
        <p className="text-muted-foreground">
          Track your progress and unlock achievement badges
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Badges</TabsTrigger>
          <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAchievements.map((achievement, index) => {
              const isUnlocked = achievement.progress >= achievement.total;
              const AchievementIcon = achievement.icon;

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 relative">
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant="outline" 
                        className={`${rarityColors[achievement.rarity]} text-white`}
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-3 rounded-full ${isUnlocked ? 'bg-primary/10' : 'bg-muted'}`}>
                        <AchievementIcon 
                          className={`h-6 w-6 ${isUnlocked ? 'text-primary' : 'text-muted-foreground'}`} 
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold mb-1">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>

                      <div className="w-full">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {achievement.progress}/{achievement.total}
                        </p>
                      </div>

                      {isUnlocked && achievement.unlockedAt && (
                        <p className="text-xs text-muted-foreground">
                          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}