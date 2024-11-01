"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface PointsCounterProps {
  initialPoints: number;
  newPoints?: number;
}

export function PointsCounter({ initialPoints, newPoints }: PointsCounterProps) {
  const [points, setPoints] = useState(initialPoints);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (newPoints && newPoints !== points) {
      setIsAnimating(true);
      const difference = newPoints - points;
      const increment = difference / 20; // Divide the animation into 20 steps
      let currentPoints = points;

      const interval = setInterval(() => {
        currentPoints += increment;
        setPoints(Math.round(currentPoints));

        if ((difference > 0 && currentPoints >= newPoints) ||
            (difference < 0 && currentPoints <= newPoints)) {
          clearInterval(interval);
          setPoints(newPoints);
          setIsAnimating(false);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [newPoints, points]);

  return (
    <div className="relative flex items-center gap-2">
      <Trophy className="h-5 w-5 text-primary" />
      <span className="text-2xl font-bold">
        {points.toLocaleString()}
      </span>
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -top-6 right-0 text-sm font-medium text-green-500"
          >
            +{(newPoints! - initialPoints).toLocaleString()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}