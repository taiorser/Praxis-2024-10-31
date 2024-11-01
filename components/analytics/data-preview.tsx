"use client";

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataPreviewProps {
  selectedMetrics: string[];
  dateRange: [Date | null, Date | null];
}

export function DataPreview({ selectedMetrics, dateRange }: DataPreviewProps) {
  // Sample data - in a real app, this would be fetched based on selected metrics and date range
  const previewData = [
    {
      date: '2024-03-15',
      points: 1250,
      users: 892,
      rewards: 45,
      engagement: '85%',
      achievements: 156,
      teams: 12,
    },
    {
      date: '2024-03-16',
      points: 1420,
      users: 905,
      rewards: 52,
      engagement: '87%',
      achievements: 178,
      teams: 12,
    },
    {
      date: '2024-03-17',
      points: 1380,
      users: 898,
      rewards: 48,
      engagement: '86%',
      achievements: 165,
      teams: 12,
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Data Preview</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              {selectedMetrics.map((metric) => (
                <TableHead key={metric} className="capitalize">
                  {metric}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                {selectedMetrics.map((metric) => (
                  <TableCell key={metric}>
                    {row[metric as keyof typeof row]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}