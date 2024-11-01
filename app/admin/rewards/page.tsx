"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Gift, Edit, Trash } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-store';

const rewards = [
  {
    id: '1',
    name: 'Extra Day Off',
    description: 'Get an additional day of paid time off',
    points: 5000,
    category: 'Time Off',
    claimed: 12,
    available: true,
  },
  {
    id: '2',
    name: '$100 Amazon Gift Card',
    description: 'Digital gift card for Amazon.com',
    points: 2500,
    category: 'Gift Cards',
    claimed: 45,
    available: true,
  },
  {
    id: '3',
    name: 'Team Lunch',
    description: 'Lunch with your team at a restaurant of choice',
    points: 1000,
    category: 'Experiences',
    claimed: 8,
    available: true,
  },
];

export default function AdminRewardsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  // Redirect non-admin users
  if (user?.role !== 'ADMIN') {
    router.push('/dashboard/rewards');
    return null;
  }

  const filteredRewards = rewards.filter(reward =>
    reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reward.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Rewards Management</h1>
          <p className="text-muted-foreground">
            Manage available rewards and redemption options
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Reward
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rewards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filters</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => (
          <Card key={reward.id} className="flex flex-col">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{reward.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {reward.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Points Required</span>
                  <Badge variant="secondary">{reward.points.toLocaleString()} pts</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Badge variant="outline">{reward.category}</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Times Claimed</span>
                  <span>{reward.claimed}</span>
                </div>
              </div>
            </div>

            <div className="p-6 mt-auto border-t flex justify-end space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}