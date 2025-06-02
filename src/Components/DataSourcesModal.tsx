'use client';

import { useState } from 'react';
import {
  DatabaseIcon,
  TableIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CheckIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface DataSourceTable {
  name: string;
  selected: boolean;
}

interface DataSourceDatabase {
  name: string;
  selected: boolean;
  expanded: boolean;
  tables: DataSourceTable[];
}

interface DataSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (databases: DataSourceDatabase[]) => void;
  initialDatabases: DataSourceDatabase[];
}

export default function DataSourcesModal({
  isOpen,
  onClose,
  onSave,
  initialDatabases,
}: DataSourcesModalProps) {
  const [databases, setDatabases] =
    useState<DataSourceDatabase[]>(initialDatabases);

  const toggleDatabase = (dbIndex: number) => {
    setDatabases((prev) =>
      prev.map((db, index) =>
        index === dbIndex
          ? {
              ...db,
              selected: !db.selected,
              tables: db.tables.map((table) => ({
                ...table,
                selected: !db.selected,
              })),
            }
          : db
      )
    );
  };

  const toggleTable = (dbIndex: number, tableIndex: number) => {
    setDatabases((prev) =>
      prev.map((db, index) => {
        if (index === dbIndex) {
          const newTables = db.tables.map((table, tIndex) =>
            tIndex === tableIndex
              ? { ...table, selected: !table.selected }
              : table
          );
          const allTablesSelected = newTables.every((table) => table.selected);
          const noTablesSelected = newTables.every((table) => !table.selected);

          return {
            ...db,
            tables: newTables,
            selected: allTablesSelected
              ? true
              : noTablesSelected
              ? false
              : db.selected,
          };
        }
        return db;
      })
    );
  };

  const toggleDatabaseExpansion = (dbIndex: number) => {
    setDatabases((prev) =>
      prev.map((db, index) =>
        index === dbIndex ? { ...db, expanded: !db.expanded } : db
      )
    );
  };

  const handleSave = () => {
    onSave(databases);
    onClose();
  };

  const getSelectedCount = () => {
    const selectedDbs = databases.filter((db) => db.selected).length;
    const selectedTables = databases.reduce(
      (count, db) => count + db.tables.filter((table) => table.selected).length,
      0
    );
    return { databases: selectedDbs, tables: selectedTables };
  };

  const counts = getSelectedCount();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white border-gray-200 max-h-[80vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <DatabaseIcon className="h-5 w-5 text-green-600" />
            Select Data Sources
          </DialogTitle>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {counts.databases} databases
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {counts.tables} tables
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-2 py-4">
            {databases.map((database, dbIndex) => (
              <div
                key={database.name}
                className="border border-gray-200 rounded-lg p-3"
              >
                {/* Database Header */}
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleDatabaseExpansion(dbIndex)}
                    className="h-6 w-6 p-0 hover:bg-gray-100"
                  >
                    {database.expanded ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronRightIcon className="h-4 w-4" />
                    )}
                  </Button>
                  <Checkbox
                    checked={database.selected}
                    onCheckedChange={() => toggleDatabase(dbIndex)}
                    className="border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <DatabaseIcon className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-gray-900">
                    {database.name}
                  </span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {database.tables.filter((t) => t.selected).length}/
                    {database.tables.length}
                  </Badge>
                </div>

                {/* Tables List */}
                {database.expanded && (
                  <div className="ml-8 space-y-1">
                    {database.tables.map((table, tableIndex) => (
                      <div
                        key={table.name}
                        className="flex items-center gap-2 py-1"
                      >
                        <Checkbox
                          checked={table.selected}
                          onCheckedChange={() =>
                            toggleTable(dbIndex, tableIndex)
                          }
                          className="border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                        <TableIcon className="h-3 w-3 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {table.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-[#19874d] hover:bg-[#19874d]/80 cursor-pointer"
          >
            <CheckIcon className="h-4 w-4 mr-1" />
            Apply Selection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
