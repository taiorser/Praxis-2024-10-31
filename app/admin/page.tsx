"use client";

import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";

export default function AdminPage() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Icons.team,
    },
    {
      title: "Active Users",
      value: "892",
      change: "+5%",
      icon: Icons.user,
    },
    {
      title: "Points Awarded",
      value: "45.2K",
      change: "+18%",
      icon: Icons.medal,
    },
    {
      title: "Rewards Claimed",
      value: "328",
      change: "+24%",
      icon: Icons.gift,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Overview</h1>
        <p className="text-muted-foreground">
          Monitor and manage your organization&apos;s engagement metrics
        </p>
      </div>

      {/* Rest of your component remains the same */}
    </div>
  );
}