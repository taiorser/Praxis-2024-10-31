"use client";

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function NotificationPreferences() {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    email: {
      achievements: true,
      teamUpdates: true,
      rewards: true,
      newsletter: false,
    },
    push: {
      achievements: true,
      teamUpdates: false,
      rewards: true,
      challenges: true,
    },
    inApp: {
      achievements: true,
      teamUpdates: true,
      rewards: true,
      challenges: true,
      mentions: true,
    },
  });

  const handleToggle = (category: keyof typeof preferences, setting: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting],
      },
    }));
  };

  const handleSave = () => {
    toast({
      title: "Preferences updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {Object.entries(preferences.email).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={`email-${key}`} className="flex-1">
                <span className="font-medium capitalize">{key}</span>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for {key.toLowerCase()}
                </p>
              </Label>
              <Switch
                id={`email-${key}`}
                checked={value}
                onCheckedChange={() => handleToggle('email', key)}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
        <div className="space-y-4">
          {Object.entries(preferences.push).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={`push-${key}`} className="flex-1">
                <span className="font-medium capitalize">{key}</span>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications for {key.toLowerCase()}
                </p>
              </Label>
              <Switch
                id={`push-${key}`}
                checked={value}
                onCheckedChange={() => handleToggle('push', key)}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">In-App Notifications</h3>
        <div className="space-y-4">
          {Object.entries(preferences.inApp).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={`inApp-${key}`} className="flex-1">
                <span className="font-medium capitalize">{key}</span>
                <p className="text-sm text-muted-foreground">
                  Show in-app notifications for {key.toLowerCase()}
                </p>
              </Label>
              <Switch
                id={`inApp-${key}`}
                checked={value}
                onCheckedChange={() => handleToggle('inApp', key)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </Card>
  );
}