"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Track engagement metrics and platform usage
          </p>
        </div>
        <div className="flex gap-4">
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Points Awarded",
            value: "124.5K",
            change: "+12.5%",
            icon: Icons.medal,
          },
          {
            title: "Active Users",
            value: "892",
            change: "+5.2%",
            icon: Icons.user,
          },
          {
            title: "Rewards Claimed",
            value: "328",
            change: "+18.3%",
            icon: Icons.gift,
          },
          {
            title: "Engagement Rate",
            value: "85%",
            change: "+3.1%",
            icon: Icons.target,
          },
        ].map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Top Departments</h2>
          <div className="space-y-4">
            {[
              { name: "Marketing", points: "32,450", engagement: "92%" },
              { name: "Sales", points: "28,900", engagement: "88%" },
              { name: "Development", points: "25,400", engagement: "85%" },
              { name: "Support", points: "21,200", engagement: "82%" },
            ].map((dept, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-muted-foreground">
                    #{index + 1}
                  </span>
                  <span>{dept.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>{dept.points} pts</span>
                  <Badge variant="secondary">{dept.engagement}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              "Sarah earned Team Player badge",
              "John redeemed $50 gift card",
              "Marketing team completed challenge",
              "New reward added: Extra PTO Day",
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <span>{activity}</span>
                <span className="text-sm text-muted-foreground">2h ago</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}