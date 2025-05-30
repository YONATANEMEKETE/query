'use client';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps {
  data: Record<string, any>[];
  className?: string;
}

export default function DataTable({ data, className }: DataTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No data available
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  const formatCellValue = (
    value: any,
    columnIndex: number,
    columnKey: string
  ) => {
    // Handle status column with badges
    if (columnKey.toLowerCase() === 'status') {
      return (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      );
    }

    // Handle role column with badges
    if (columnKey.toLowerCase() === 'role') {
      const variant =
        value === 'Admin'
          ? 'destructive'
          : value === 'Moderator'
          ? 'secondary'
          : 'outline';
      return <Badge variant={variant}>{value}</Badge>;
    }

    return value;
  };

  return (
    <div className={`rounded-md border ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column} className="font-medium">
                {column.charAt(0).toUpperCase() +
                  column.slice(1).replace(/([A-Z])/g, ' $1')}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column, columnIndex) => (
                <TableCell key={column}>
                  {formatCellValue(row[column], columnIndex, column)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
