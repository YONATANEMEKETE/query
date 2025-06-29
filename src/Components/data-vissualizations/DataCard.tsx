'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardsProps {
  data: Record<string, string | number>;
  className?: string;
}

export default function StatsCards({ data, className }: StatsCardsProps) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No stats available
      </div>
    );
  }

  const formatLabel = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const getTrendIcon = (value: string) => {
    if (typeof value === 'string' && value.includes('%')) {
      if (value.startsWith('+')) {
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      } else if (value.startsWith('-')) {
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      }
    }
    return null;
  };

  const getValueColor = (value: string) => {
    if (typeof value === 'string' && value.includes('%')) {
      if (value.startsWith('+')) {
        return 'text-green-600';
      } else if (value.startsWith('-')) {
        return 'text-red-600';
      }
    }
    return '';
  };

  return (
    <div className={`flex gap-4 items-center flex-wrap ${className}`}>
      {Object.entries(data).map(([key, value]) => (
        <Card
          key={key}
          className="hover:shadow-md transition-shadow shrink-0 w-[160px]"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div
                  className={`text-2xl font-bold ${getValueColor(
                    value.toString()
                  )}`}
                >
                  {value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formatLabel(key)}
                </div>
              </div>
              {getTrendIcon(value.toString())}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
