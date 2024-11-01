"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gamepad2, Book, Trophy, Star, Brain, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { QuizComponent } from './quiz';

const trainingModules = [
  {
    id: 1,
    title: "Company Culture",
    description: "Learn about our values and workplace culture",
    progress: 75,
    difficulty: "Beginner",
    duration: "15 min",
    points: 100,
    icon: Book,
  },
  {
    id: 2,
    title: "Leadership Skills",
    description: "Essential leadership and team management",
    progress: 30,
    difficulty: "Advanced",
    duration: "30 min",
    points: 250,
    icon: Target,
  },
  {
    id: 3,
    title: "Communication",
    description: "Effective workplace communication",
    progress: 0,
    difficulty: "Intermediate",
    duration: "20 min",
    points: 150,
    icon: Brain,
  },
];

const difficultyColors = {
  Beginner: "text-green-500 bg-green-500/10",
  Intermediate: "text-yellow-500 bg-yellow-500/10",
  Advanced: "text-red-500 bg-red-500/10",
};

export function TrainingView({ user }: { user: any }) {
  const { toast } = useToast();
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const startTraining = (moduleId: number) => {
    setSelectedModule(moduleId);
    setShowQuiz(true);
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    setSelectedModule(null);
    
    // Update module progress
    const moduleIndex = trainingModules.findIndex(m => m.id === selectedModule);
    if (moduleIndex !== -1) {
      trainingModules[moduleIndex].progress = 100;
    }
  };

  if (showQuiz && selectedModule) {
    return <QuizComponent moduleId={selectedModule} onComplete={handleQuizComplete} />;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Interactive Training</h1>
        <p className="text-muted-foreground">
          Enhance your skills through gamified learning experiences
        </p>
      </div>

      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-2xl font-bold">{user?.points || 0}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed Modules</p>
              <p className="text-2xl font-bold">2/6</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Gamepad2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold">3 days</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainingModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="flex flex-col h-full">
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <module.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} />
                  </div>

                  <div className="flex justify-between items-center">
                    <Badge
                      variant="outline"
                      className={difficultyColors[module.difficulty as keyof typeof difficultyColors]}
                    >
                      {module.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {module.duration}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Reward Points
                    </span>
                    <Badge variant="secondary">{module.points} pts</Badge>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t">
                <Button
                  className="w-full"
                  onClick={() => startTraining(module.id)}
                  disabled={selectedModule === module.id}
                >
                  {module.progress === 0
                    ? "Start Training"
                    : module.progress === 100
                    ? "Review Module"
                    : "Continue Training"}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}