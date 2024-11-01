"use client";

import { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, Shield, Bell, Palette, Upload, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-store";

export default function SettingsPage() {
  const { toast } = useToast();
  const { user, company, updateCompanyBranding } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [branding, setBranding] = useState(company?.branding || {
    siteName: '',
    colors: {
      primary: '#000000',
      background: '#ffffff',
      text: '#000000'
    }
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(company?.branding.logo || null);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogoPreview(base64String);
        setBranding(prev => ({
          ...prev,
          logo: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrandingChange = (field: string, value: string) => {
    setBranding(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorChange = (colorType: 'primary' | 'background' | 'text', value: string) => {
    setBranding(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value
      }
    }));
  };

  const handleSave = () => {
    if (user?.role !== 'ADMIN') {
      toast({
        title: "Permission Denied",
        description: "Only administrators can update company settings.",
        variant: "destructive"
      });
      return;
    }

    updateCompanyBranding(branding);
    toast({
      title: "Settings saved",
      description: "Your company branding has been updated successfully.",
    });
  };

  if (!user || !company) return null;

  return (
    <div className="py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization&apos;s preferences and configurations
        </p>
      </div>

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList>
          <TabsTrigger value="organization">
            <Building className="h-4 w-4 mr-2" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input 
                  id="orgName" 
                  value={company.name}
                  disabled={user.role !== 'ADMIN'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Input 
                  id="domain" 
                  value={company.domain}
                  disabled={user.role !== 'ADMIN'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <Select defaultValue="UTC">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="CST">Central Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Directory</Label>
                  <p className="text-sm text-muted-foreground">
                    Make organization visible in public directory
                  </p>
                </div>
                <Switch disabled={user.role !== 'ADMIN'} />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Company Logo</Label>
                <div className="flex items-center gap-4">
                  {logoPreview && (
                    <div className="w-40 h-40 relative rounded-lg overflow-hidden border">
                      <img
                        src={logoPreview}
                        alt="Company logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoChange}
                      disabled={user.role !== 'ADMIN'}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={user.role !== 'ADMIN'}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                    {logoPreview && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setLogoPreview(null);
                          setBranding(prev => ({ ...prev, logo: undefined }));
                        }}
                        disabled={user.role !== 'ADMIN'}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Remove Logo
                      </Button>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Recommended size: 200x200px. Max file size: 2MB.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={branding.siteName}
                  onChange={(e) => handleBrandingChange('siteName', e.target.value)}
                  placeholder="Enter site name"
                  disabled={user.role !== 'ADMIN'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id="primaryColor"
                      value={branding.colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="w-12 h-12 p-1 rounded-lg"
                      disabled={user.role !== 'ADMIN'}
                    />
                    <Input
                      type="text"
                      value={branding.colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="flex-1"
                      placeholder="#000000"
                      disabled={user.role !== 'ADMIN'}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id="backgroundColor"
                      value={branding.colors.background}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      className="w-12 h-12 p-1 rounded-lg"
                      disabled={user.role !== 'ADMIN'}
                    />
                    <Input
                      type="text"
                      value={branding.colors.background}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      className="flex-1"
                      placeholder="#ffffff"
                      disabled={user.role !== 'ADMIN'}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textColor">Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      id="textColor"
                      value={branding.colors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="w-12 h-12 p-1 rounded-lg"
                      disabled={user.role !== 'ADMIN'}
                    />
                    <Input
                      type="text"
                      value={branding.colors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="flex-1"
                      placeholder="#000000"
                      disabled={user.role !== 'ADMIN'}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleSave}
                  disabled={user.role !== 'ADMIN'}
                >
                  Save Branding Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Other tabs remain the same */}
        <TabsContent value="security">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all admin accounts
                  </p>
                </div>
                <Switch disabled={user.role !== 'ADMIN'} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Single Sign-On</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable SSO with Google Workspace
                  </p>
                </div>
                <Switch disabled={user.role !== 'ADMIN'} />
              </div>

              <div className="space-y-2">
                <Label>Password Requirements</Label>
                <Select defaultValue="strong" disabled={user.role !== 'ADMIN'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select requirements" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                    <SelectItem value="complex">Complex (14+ chars, symbols required)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for important updates
                  </p>
                </div>
                <Switch disabled={user.role !== 'ADMIN'} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Achievement Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify users when they earn achievements
                  </p>
                </div>
                <Switch disabled={user.role !== 'ADMIN'} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digests</Label>
                  <p className="text-sm text-muted-foreground">
                    Send weekly performance summaries
                  </p>
                </div>
                <Switch disabled={user.role !== 'ADMIN'} />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={user.role !== 'ADMIN'}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}