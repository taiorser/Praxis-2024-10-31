"use client";

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface ExportOptionsProps {
  selectedFormat: 'csv' | 'excel' | 'pdf';
  setSelectedFormat: (format: 'csv' | 'excel' | 'pdf') => void;
  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;
  selectedMetrics: string[];
  setSelectedMetrics: (metrics: string[]) => void;
}

const metrics = [
  { id: 'points', label: 'Points Awarded' },
  { id: 'users', label: 'Active Users' },
  { id: 'rewards', label: 'Rewards Claimed' },
  { id: 'engagement', label: 'Engagement Rate' },
  { id: 'achievements', label: 'Achievements Unlocked' },
  { id: 'teams', label: 'Team Performance' },
];

export function ExportOptions({
  selectedFormat,
  setSelectedFormat,
  dateRange,
  setDateRange,
  selectedMetrics,
  setSelectedMetrics,
}: ExportOptionsProps) {
  const [startDate, endDate] = dateRange;

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Export Options</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <RadioGroup
              value={selectedFormat}
              onValueChange={(value: 'csv' | 'excel' | 'pdf') => setSelectedFormat(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv">CSV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel">Excel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf">PDF</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    endDate ? (
                      <>
                        {format(startDate, "LLL dd, y")} -{" "}
                        {format(endDate, "LLL dd, y")}
                      </>
                    ) : (
                      format(startDate, "LLL dd, y")
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={startDate ?? undefined}
                  selected={{
                    from: startDate ?? undefined,
                    to: endDate ?? undefined,
                  }}
                  onSelect={(range) => {
                    setDateRange([range?.from ?? null, range?.to ?? null]);
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Select Metrics</Label>
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <div key={metric.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={metric.id}
                    checked={selectedMetrics.includes(metric.id)}
                    onCheckedChange={(checked) => {
                      setSelectedMetrics(
                        checked
                          ? [...selectedMetrics, metric.id]
                          : selectedMetrics.filter((id) => id !== metric.id)
                      );
                    }}
                  />
                  <Label htmlFor={metric.id}>{metric.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}