"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trophy, Medal, Star, TrendingUp, Users, Crown } from "lucide-react";
import { motion } from "framer-motion";

const teamLeaderboard = [
  {
    rank: 1,
    name: "Marketing",
    points: 32450,
    members: 12,
    trend: "+12%",
    achievements: 28,
  },
  {
    rank: 2,
    name: "Sales",
    points: 28900,
    members: 8,
    trend: "+8%",
    achievements: 24,
  },
  {
    rank: 3,
    name: "Development",
    points: 25400,
    members: 15,
    trend: "+15%",
    achievements: 22,
  },
  {
    rank: 4,
    name: "Support",
    points: 21200,
    members: 10,
    trend: "+5%",
    achievements: 19,
  },
];

const individualLeaderboard = [
  {
    rank: 1,
    name: "Sarah Chen",
    role: "Marketing Lead",
    points: 8250,
    streak: 15,
    badges: 12,
  },
  {
    rank: 2,
    name: "John Smith",
    role: "Sales Manager",
    points: 7890,
    streak: 12,
    badges: 10,
  },
  {
    rank: 3,
    name: "Emily Brown",
    role: "Senior Developer",
    points: 7450,
    streak: 8,
    badges: 9,
  },
  {
    rank: 4,
    name: "Michael Wong",
    role: "Customer Success",
    points: 6920,
    streak: 10,
    badges: 8,
  },
];

export default function LeaderboardPage() {
  const [selectedTab, setSelectedTab] = useState("teams");

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">
          Track team and individual performance rankings
        </p>
      </div>

      <Tabs defaultValue="teams" className="space-y-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="individuals">Individuals</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-8">
          {/* Top Teams Podium */}
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* Second Place */}
            <div className="flex flex-col items-center justify-end">
              <div className="text-center mb-4">
                <h3 className="font-semibold">{teamLeaderboard[1].name}</h3>
                <p className="text-2xl font-bold text-primary">
                  {teamLeaderboard[1].points.toLocaleString()}
                </p>
              </div>
              <div className="bg-secondary h-32 w-full rounded-t-lg flex items-center justify-center">
                <Medal className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* First Place */}
            <div className="flex flex-col items-center">
              <Crown className="h-8 w-8 text-yellow-500 mb-2" />
              <div className="text-center mb-4">
                <h3 className="font-semibold">{teamLeaderboard[0].name}</h3>
                <p className="text-2xl font-bold text-primary">
                  {teamLeaderboard[0].points.toLocaleString()}
                </p>
              </div>
              <div className="bg-primary h-40 w-full rounded-t-lg flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>

            {/* Third Place */}
            <div className="flex flex-col items-center justify-end">
              <div className="text-center mb-4">
                <h3 className="font-semibold">{teamLeaderboard[2].name}</h3>
                <p className="text-2xl font-bold text-primary">
                  {teamLeaderboard[2].points.toLocaleString()}
                </p>
              </div>
              <div className="bg-muted h-24 w-full rounded-t-lg flex items-center justify-center">
                <Medal className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Team Rankings */}
          <div className="space-y-4">
            {teamLeaderboard.map((team, index) => (
              <motion.div
                key={team.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <span className="font-bold text-primary">#{team.rank}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{team.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {team.members} members
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{team.achievements} achievements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">{team.trend}</span>
                      </div>
                      <div className="w-32 text-right">
                        <div className="font-bold text-lg">
                          {team.points.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">points</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="individuals" className="space-y-4">
          {individualLeaderboard.map((individual, index) => (
            <motion.div
              key={individual.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <span className="font-bold text-primary">
                        #{individual.rank}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{individual.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {individual.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge variant="secondary" className="gap-1">
                      <Star className="h-3 w-3" />
                      {individual.badges} badges
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Trophy className="h-3 w-3" />
                      {individual.streak} day streak
                    </Badge>
                    <div className="w-32 text-right">
                      <div className="font-bold text-lg">
                        {individual.points.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">points</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}