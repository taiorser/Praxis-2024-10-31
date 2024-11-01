"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth-store';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Gift } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

export default function RewardsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<string[]>([]);

  const filteredRewards = rewards.filter(reward =>
    reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reward.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (user?.points && user.points < reward.points) {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.points - user.points} more points to claim this reward.`,
        variant: "destructive",
      });
      return;
    }

    setCart([...cart, rewardId]);
    toast({
      title: "Added to Cart",
      description: `${reward.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (rewardId: string) => {
    setCart(cart.filter(id => id !== rewardId));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Rewards Marketplace</h1>
          <p className="text-muted-foreground">
            Redeem your points for exciting rewards
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Cart ({cart.length})
          </Button>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {user?.points || 0} Points Available
          </Badge>
        </div>
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
          <Button variant="outline">Filter</Button>
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

            <div className="p-6 mt-auto border-t">
              {cart.includes(reward.id) ? (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => removeFromCart(reward.id)}
                >
                  Remove from Cart
                </Button>
              ) : (
                <Button 
                  className="w-full"
                  onClick={() => addToCart(reward.id)}
                  disabled={user?.points ? user.points < reward.points : true}
                >
                  {user?.points && user.points >= reward.points 
                    ? "Add to Cart" 
                    : `Need ${reward.points - (user?.points || 0)} more points`
                  }
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}