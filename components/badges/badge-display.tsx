"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, Flame, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof badgeIcons;
  progress: number;
  total: number;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const badgeIcons = {
  trophy: Trophy,
  star: Star,
  target: Target,
  flame: Flame,
  zap: Zap,
  award: Award,
};

const rarityColors = {
  common: "bg-slate-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-amber-500",
};

interface BadgeDisplayProps {
  badges: AchievementBadge[];
  onBadgeClick?: (badge: AchievementBadge) => void;
}

export function BadgeDisplay({ badges, onBadgeClick }: BadgeDisplayProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge, index) => {
        const Icon = badgeIcons[badge.icon];
        const isUnlocked = badge.progress >= badge.total;

        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onBadgeClick?.(badge)}
            className="cursor-pointer"
          >
            <Card className={`relative p-4 ${isUnlocked ? 'bg-card' : 'bg-muted/50'}`}>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className={`${rarityColors[badge.rarity]} text-white`}>
                  {badge.rarity}
                </Badge>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-full ${isUnlocked ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Icon className={`h-6 w-6 ${isUnlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                
                <div>
                  <h3 className="font-semibold">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>

                <div className="w-full">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {badge.progress}/{badge.total}
                  </p>
                </div>

                {isUnlocked && badge.unlockedAt && (
                  <p className="text-xs text-muted-foreground">
                    Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}