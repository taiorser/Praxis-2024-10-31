"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageUpload } from '@/components/profile/image-upload';
import { ProfileForm } from '@/components/profile/profile-form';
import { NotificationPreferences } from '@/components/profile/notification-preferences';
import { useToast } from '@/components/ui/use-toast';
import { User, Mail, Bell, Shield, Trophy } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileUpdate = async (data: any) => {
    // In a real app, this would update the backend
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Overview Card */}
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <ImageUpload
              currentImage={user?.image}
              onImageUpdate={(image) => {
                toast({
                  title: "Profile picture updated",
                  description: "Your profile picture has been updated successfully.",
                });
              }}
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">{user?.name}</h2>
              <p className="text-muted-foreground mb-4">{user?.email}</p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span>{user?.points || 0} points</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{user?.role.toLowerCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileForm
              user={user}
              onSubmit={handleProfileUpdate}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationPreferences />
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>
              <Button>Update Password</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}