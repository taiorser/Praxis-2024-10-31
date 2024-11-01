"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { type AchievementBadge } from './badge-display';

interface BadgeNotificationProps {
  badge: AchievementBadge;
  onClose: () => void;
}

export function BadgeNotification({ badge, onClose }: BadgeNotificationProps) {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "New Badge Unlocked!",
      description: (
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">{badge.name}</p>
            <p className="text-sm text-muted-foreground">{badge.description}</p>
          </div>
        </div>
      ),
    });
  }, [badge, toast]);

  return null;
}