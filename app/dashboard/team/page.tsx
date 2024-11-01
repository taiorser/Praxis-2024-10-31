"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Trophy, Star, Target, MessageSquare, Mail } from "lucide-react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Team Lead",
    email: "sarah@demo.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
    points: 2450,
    achievements: 28,
    status: "online",
    recentActivity: "Completed Q1 Goals",
    badges: ["Top Performer", "Innovation Star", "Team Player"],
  },
  {
    id: 2,
    name: "Michael Wong",
    role: "Senior Developer",
    email: "michael@demo.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&auto=format&fit=crop",
    points: 2100,
    achievements: 24,
    status: "offline",
    recentActivity: "Earned 'Code Ninja' badge",
    badges: ["Code Ninja", "Mentor", "Problem Solver"],
  },
  {
    id: 3,
    name: "Emily Brown",
    role: "Product Designer",
    email: "emily@demo.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&auto=format&fit=crop",
    points: 1950,
    achievements: 22,
    status: "online",
    recentActivity: "Submitted new design system",
    badges: ["Design Expert", "Collaborator", "Creative Mind"],
  },
  {
    id: 4,
    name: "David Kim",
    role: "Marketing Specialist",
    email: "david@demo.com",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&auto=format&fit=crop",
    points: 1850,
    achievements: 20,
    status: "online",
    recentActivity: "Launched social media campaign",
    badges: ["Social Media Guru", "Content Creator"],
  },
];

const recentUpdates = [
  {
    id: 1,
    user: "Sarah Chen",
    action: "completed the quarterly team challenge",
    time: "2 hours ago",
    type: "achievement",
  },
  {
    id: 2,
    user: "Michael Wong",
    action: "earned the 'Problem Solver' badge",
    time: "4 hours ago",
    type: "badge",
  },
  {
    id: 3,
    user: "Emily Brown",
    action: "reached level 15",
    time: "yesterday",
    type: "level",
  },
];

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("members");

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team Overview</h1>
          <p className="text-muted-foreground">
            Manage and collaborate with your team members
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Team Chat
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="updates">Recent Updates</TabsTrigger>
            <TabsTrigger value="achievements">Team Achievements</TabsTrigger>
          </TabsList>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value="members" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                        member.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <Badge variant="secondary">{member.points} pts</Badge>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Trophy className="h-4 w-4" />
                          <span>{member.achievements} achievements</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {member.badges.map((badge, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Recent: {member.recentActivity}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="updates">
          <Card className="p-6">
            <div className="space-y-6">
              {recentUpdates.map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
                >
                  <div className={`p-2 rounded-full ${
                    update.type === 'achievement' ? 'bg-green-100 text-green-600' :
                    update.type === 'badge' ? 'bg-blue-100 text-blue-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {update.type === 'achievement' ? <Trophy className="h-4 w-4" /> :
                     update.type === 'badge' ? <Star className="h-4 w-4" /> :
                     <Target className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p>
                      <span className="font-medium">{update.user}</span>{" "}
                      {update.action}
                    </p>
                    <p className="text-sm text-muted-foreground">{update.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg bg-primary/10">
                  <Trophy className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">85%</h3>
                  <p className="text-muted-foreground">Team Goals Completed</p>
                </div>
                <div className="p-6 rounded-lg bg-blue-500/10">
                  <Star className="h-8 w-8 text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">124</h3>
                  <p className="text-muted-foreground">Badges Earned</p>
                </div>
                <div className="p-6 rounded-lg bg-amber-500/10">
                  <Target className="h-8 w-8 text-amber-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">12,450</h3>
                  <p className="text-muted-foreground">Total Team Points</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Recent Team Achievements</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Q1 Goals Exceeded",
                      description: "Team surpassed quarterly targets by 15%",
                      date: "March 15, 2024",
                    },
                    {
                      title: "Perfect Sprint Completion",
                      description: "Completed all sprint goals for 4 consecutive sprints",
                      date: "March 10, 2024",
                    },
                    {
                      title: "Team Collaboration Award",
                      description: "Recognized for outstanding cross-functional collaboration",
                      date: "March 5, 2024",
                    },
                  ].map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                        <Badge variant="outline">{achievement.date}</Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}