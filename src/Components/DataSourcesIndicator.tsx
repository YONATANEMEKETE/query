'use client';

import { LucideDatabase, LucideTable } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/Components/ui/popover';
import { Button } from '@/components/ui/button';

interface Table {
  name: string;
  selected: boolean;
}

interface Database {
  name: string;
  selected: boolean;
  expanded: boolean;
  tables: Table[];
}

interface DataSourcesIndicatorProps {
  databases: Database[];
  onOpenDataSources: () => void;
}

export default function DataSourcesIndicator({
  databases,
  onOpenDataSources,
}: DataSourcesIndicatorProps) {
  const selectedDatabases = databases.filter((db) => db.selected);
  const selectedTables = databases.reduce((acc, db) => {
    const tables = db.tables.filter((table) => table.selected);
    return [
      ...acc,
      ...tables.map((table) => ({ ...table, database: db.name })),
    ];
  }, [] as Array<{ name: string; selected: boolean; database: string }>);

  if (selectedDatabases.length === 0 && selectedTables.length === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
        <LucideDatabase className="h-4 w-4 text-amber-600" />
        <span className="text-sm text-amber-800">No data sources selected</span>
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenDataSources}
          className="ml-auto h-6 text-xs border-amber-300 text-amber-700 hover:bg-amber-100"
        >
          Select Sources
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
      <LucideDatabase className="h-4 w-4 text-green-600" />
      <span className="text-sm text-green-800">
        Query has access to {selectedDatabases.length} database(s) and{' '}
        {selectedTables.length} table(s)
      </span>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-6 text-xs border-green-300 text-green-700 hover:bg-green-100 cursor-pointer"
          >
            View Details
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-white border-gray-200" align="end">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Active Data Sources</h4>

            {selectedDatabases.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Databases:
                </h5>
                <div className="flex flex-wrap gap-1">
                  {selectedDatabases.map((db) => (
                    <Badge
                      key={db.name}
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      <LucideDatabase className="h-3 w-3 mr-1" />
                      {db.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedTables.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Tables:
                </h5>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {selectedTables.map((table) => (
                    <div
                      key={`${table.database}.${table.name}`}
                      className="flex items-center gap-2 text-sm"
                    >
                      <LucideTable className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-600">{table.database}.</span>
                      <span className="text-gray-900">{table.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onOpenDataSources}
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Modify Selection
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
