"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileSpreadsheet, FilePdf, FileText } from 'lucide-react';

const exportHistory = [
  {
    id: 1,
    name: 'Monthly Overview - March 2024',
    date: '2024-03-17',
    format: 'excel',
    status: 'completed',
  },
  {
    id: 2,
    name: 'Q1 Performance Report',
    date: '2024-03-15',
    format: 'pdf',
    status: 'completed',
  },
  {
    id: 3,
    name: 'Team Analytics Export',
    date: '2024-03-14',
    format: 'csv',
    status: 'completed',
  },
];

const formatIcons = {
  excel: FileSpreadsheet,
  pdf: FilePdf,
  csv: FileText,
};

export function ExportHistory() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Exports</h2>
      <div className="space-y-4">
        {exportHistory.map((export_) => {
          const Icon = formatIcons[export_.format as keyof typeof formatIcons];
          
          return (
            <div
              key={export_.id}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{export_.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {export_.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="capitalize">
                  {export_.format}
                </Badge>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}