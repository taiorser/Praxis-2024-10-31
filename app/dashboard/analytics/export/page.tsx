"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Download, Calendar, FileSpreadsheet, FileText } from 'lucide-react';

export default function AnalyticsExportPage() {
  const { toast } = useToast();
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleExport = async () => {
    toast({
      title: "Export Started",
      description: "Your export is being processed and will be ready shortly.",
    });
    
    // Simulate export delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your export has been completed successfully.",
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Export</h1>
          <p className="text-muted-foreground">
            Export analytics data in multiple formats
          </p>
        </div>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Export Templates</h2>
        <div className="grid gap-4">
          {[
            {
              title: "Monthly Overview",
              description: "Export key metrics for the current month",
              icon: Calendar,
            },
            {
              title: "Full Data Export",
              description: "Export all available data and metrics",
              icon: FileSpreadsheet,
            },
            {
              title: "Custom Report",
              description: "Export data based on saved preferences",
              icon: FileText,
            },
          ].map((template, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex items-center justify-start h-auto p-4"
              onClick={() => {
                toast({
                  title: `${template.title} Selected`,
                  description: "Template settings have been applied.",
                });
              }}
            >
              <template.icon className="h-5 w-5 mr-3 text-primary" />
              <div className="text-left">
                <div className="font-medium">{template.title}</div>
                <div className="text-sm text-muted-foreground">
                  {template.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}